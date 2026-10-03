import AVFoundation
import Cocoa
import CoreAudio
import IOKit
import ServiceManagement
import os

// MARK: - Core Audio aygıtları

struct AudioDevice {
    let id: AudioDeviceID
    let uid: String
    let name: String
    let inputs: Int
    let outputs: Int
    let isUSB: Bool
}

enum CoreAudioDevices {
    static func all() -> [AudioDevice] {
        var addr = address(kAudioHardwarePropertyDevices)
        var size: UInt32 = 0
        guard AudioObjectGetPropertyDataSize(AudioObjectID(kAudioObjectSystemObject), &addr, 0, nil, &size) == noErr else { return [] }
        var ids = [AudioDeviceID](repeating: 0, count: Int(size) / MemoryLayout<AudioDeviceID>.size)
        guard AudioObjectGetPropertyData(AudioObjectID(kAudioObjectSystemObject), &addr, 0, nil, &size, &ids) == noErr else { return [] }
        return ids.compactMap { id in
            guard let name = string(id, kAudioObjectPropertyName),
                  let uid = string(id, kAudioDevicePropertyDeviceUID) else { return nil }
            return AudioDevice(id: id, uid: uid, name: name,
                               inputs: channels(id, kAudioObjectPropertyScopeInput),
                               outputs: channels(id, kAudioObjectPropertyScopeOutput),
                               isUSB: transportType(id) == kAudioDeviceTransportTypeUSB)
        }
    }

    static func defaultOutput() -> AudioDeviceID? {
        var addr = address(kAudioHardwarePropertyDefaultOutputDevice)
        var id = AudioDeviceID(0)
        var size = UInt32(MemoryLayout<AudioDeviceID>.size)
        let status = AudioObjectGetPropertyData(AudioObjectID(kAudioObjectSystemObject), &addr, 0, nil, &size, &id)
        return status == noErr && id != 0 ? id : nil
    }

    /// Aygıt takılıp çıkarıldığında veya varsayılan çıkış değiştiğinde çağrılır.
    static func onChange(_ block: @escaping () -> Void) {
        for selector in [kAudioHardwarePropertyDevices, kAudioHardwarePropertyDefaultOutputDevice] {
            var addr = address(selector)
            AudioObjectAddPropertyListenerBlock(AudioObjectID(kAudioObjectSystemObject), &addr, .main) { _, _ in block() }
        }
    }

    private static func address(_ selector: AudioObjectPropertySelector,
                                scope: AudioObjectPropertyScope = kAudioObjectPropertyScopeGlobal) -> AudioObjectPropertyAddress {
        AudioObjectPropertyAddress(mSelector: selector, mScope: scope, mElement: kAudioObjectPropertyElementMain)
    }

    private static func string(_ id: AudioObjectID, _ selector: AudioObjectPropertySelector) -> String? {
        var addr = address(selector)
        var value: Unmanaged<CFString>?
        var size = UInt32(MemoryLayout<Unmanaged<CFString>?>.size)
        guard AudioObjectGetPropertyData(id, &addr, 0, nil, &size, &value) == noErr, let value else { return nil }
        return value.takeRetainedValue() as String
    }

    private static func transportType(_ id: AudioObjectID) -> UInt32 {
        var addr = address(kAudioDevicePropertyTransportType)
        var value: UInt32 = 0
        var size = UInt32(MemoryLayout<UInt32>.size)
        return AudioObjectGetPropertyData(id, &addr, 0, nil, &size, &value) == noErr ? value : 0
    }

    private static func channels(_ id: AudioObjectID, _ scope: AudioObjectPropertyScope) -> Int {
        var addr = address(kAudioDevicePropertyStreamConfiguration, scope: scope)
        var size: UInt32 = 0
        guard AudioObjectGetPropertyDataSize(id, &addr, 0, nil, &size) == noErr, size > 0 else { return 0 }
        let raw = UnsafeMutableRawPointer.allocate(byteCount: Int(size), alignment: 16)
        defer { raw.deallocate() }
        guard AudioObjectGetPropertyData(id, &addr, 0, nil, &size, raw) == noErr else { return 0 }
        let list = UnsafeMutableAudioBufferListPointer(raw.assumingMemoryBound(to: AudioBufferList.self))
        return list.reduce(0) { $0 + Int($1.mNumberChannels) }
    }
}

// MARK: - USB'deki iPhone

enum USBDevices {
    /// USB'ye takılı bir iPhone veya iPad var mı?
    static func appleMobileConnected() -> Bool {
        var iterator: io_iterator_t = 0
        guard IOServiceGetMatchingServices(kIOMainPortDefault, IOServiceMatching("IOUSBHostDevice"), &iterator) == KERN_SUCCESS else {
            return false
        }
        defer { IOObjectRelease(iterator) }
        while case let service = IOIteratorNext(iterator), service != 0 {
            defer { IOObjectRelease(service) }
            let vendor = IORegistryEntryCreateCFProperty(service, "idVendor" as CFString, kCFAllocatorDefault, 0)?
                .takeRetainedValue() as? Int
            let name = IORegistryEntryCreateCFProperty(service, "USB Product Name" as CFString, kCFAllocatorDefault, 0)?
                .takeRetainedValue() as? String
            if vendor == 0x05AC, let name, name.hasPrefix("iPhone") || name.hasPrefix("iPad") { return true }
        }
        return false
    }
}

// MARK: - Audio MIDI Ayarları

/// iPhone'un ses aygıtı, Audio MIDI Ayarları'nda iPhone'un yanındaki "Etkinleştir"e basılınca ortaya çıkar.
enum AudioMIDISetup {
    static let bundleID = "com.apple.audio.AudioMIDISetup"

    static func open() {
        guard let url = NSWorkspace.shared.urlForApplication(withBundleIdentifier: bundleID) else { return }
        NSWorkspace.shared.openApplication(at: url, configuration: NSWorkspace.OpenConfiguration())
    }

    /// Kapatmak aygıtı yeniden gizleyebilir; uygulamayı yalnızca gizle.
    static func hide() {
        NSRunningApplication.runningApplications(withBundleIdentifier: bundleID).first?.hide()
    }

    /// Ana penceresinin çerçevesi (Cocoa koordinatlarında). CGWindowList izin gerektirmez.
    static func windowFrame() -> NSRect? {
        guard let pid = NSRunningApplication.runningApplications(withBundleIdentifier: bundleID).first?.processIdentifier,
              let info = CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements], kCGNullWindowID)
                as? [[String: Any]],
              let primary = NSScreen.screens.first else { return nil }
        let rects = info.compactMap { window -> CGRect? in
            guard window[kCGWindowOwnerPID as String] as? pid_t == pid,
                  window[kCGWindowLayer as String] as? Int == 0,
                  let bounds = window[kCGWindowBounds as String] as? NSDictionary,
                  let rect = CGRect(dictionaryRepresentation: bounds), rect.width > 200 else { return nil }
            return rect
        }
        guard let rect = rects.max(by: { $0.width * $0.height < $1.width * $1.height }) else { return nil }
        // CG: sol üst köken; Cocoa: sol alt köken.
        return NSRect(x: rect.minX, y: primary.frame.maxY - rect.maxY, width: rect.width, height: rect.height)
    }
}

// MARK: - Giriş ve çıkış motorları arasındaki tampon

final class RingBuffer {
    private let channels: [UnsafeMutablePointer<Float>]
    private let capacity: Int
    private let sampleRate: Double
    private let lock = OSAllocatedUnfairLock()
    private var readIndex = 0
    private var available = 0
    private var chunk = 0
    private var primed = false

    init(channelCount: Int, sampleRate: Double) {
        self.sampleRate = sampleRate
        capacity = Int(sampleRate) // 1 saniye
        channels = (0..<channelCount).map { _ in
            let p = UnsafeMutablePointer<Float>.allocate(capacity: Int(sampleRate))
            p.initialize(repeating: 0, count: Int(sampleRate))
            return p
        }
    }

    deinit { channels.forEach { $0.deallocate() } }

    func write(_ buffer: AVAudioPCMBuffer) {
        guard let src = buffer.floatChannelData else { return }
        let n = min(Int(buffer.frameLength), capacity)
        let srcChannels = Int(buffer.format.channelCount)
        lock.withLock {
            chunk = n
            var w = (readIndex + available) % capacity
            for i in 0..<n {
                for c in channels.indices {
                    channels[c][w] = src[min(c, srcChannels - 1)][i]
                }
                w = (w + 1) % capacity
            }
            available += n
            // Gecikme birikirse eski örnekleri at.
            let maxFill = max(Int(sampleRate * 0.15), chunk * 3)
            if available > maxFill {
                let keep = max(Int(sampleRate * 0.05), chunk + chunk / 2)
                readIndex = (readIndex + available - keep) % capacity
                available = keep
            }
        }
    }

    func read(into list: UnsafeMutableAudioBufferListPointer, frames: Int) {
        lock.withLock {
            if !primed && available >= chunk + Int(sampleRate * 0.01) { primed = true }
            let n = primed ? min(frames, available) : 0
            for (c, ab) in list.enumerated() {
                guard let dst = ab.mData?.assumingMemoryBound(to: Float.self) else { continue }
                let src = channels[min(c, channels.count - 1)]
                var r = readIndex
                for i in 0..<n { dst[i] = src[r]; r = (r + 1) % capacity }
                for i in n..<frames { dst[i] = 0 }
            }
            readIndex = (readIndex + n) % capacity
            available -= n
            if n < frames { primed = false } // boşaldı, yeniden doldur
        }
    }
}

// MARK: - Ses yönlendirici

struct RouterError: LocalizedError {
    let errorDescription: String?
}

final class AudioRouter {
    private var inputEngine: AVAudioEngine?
    private var outputEngine: AVAudioEngine?
    private var observers: [NSObjectProtocol] = []
    private(set) var inputID: AudioDeviceID?
    private(set) var outputID: AudioDeviceID?
    var onConfigurationChange: (() -> Void)?

    var isRunning: Bool { inputEngine != nil }

    func start(input: AudioDeviceID, output: AudioDeviceID) throws {
        stop()
        let inE = AVAudioEngine()
        let outE = AVAudioEngine()
        let ring: RingBuffer
        do {
            let inNode = inE.inputNode
            try setDevice(inNode.audioUnit, input, "Couldn't select the input device")
            // outputFormat aygıt değişince eski aygıtın formatında kalabiliyor; donanım formatını kullan.
            let format = inNode.inputFormat(forBus: 0)
            guard format.sampleRate > 0, format.channelCount > 0 else {
                throw RouterError(errorDescription: "Couldn't read the iPhone audio format")
            }
            ring = RingBuffer(channelCount: Int(format.channelCount), sampleRate: format.sampleRate)
            inNode.installTap(onBus: 0, bufferSize: 512, format: format) { buffer, _ in ring.write(buffer) }

            try setDevice(outE.outputNode.audioUnit, output, "Couldn't select the output device")
            let sourceFormat = AVAudioFormat(standardFormatWithSampleRate: format.sampleRate,
                                             channels: format.channelCount)!
            let source = AVAudioSourceNode(format: sourceFormat) { _, _, frameCount, list in
                ring.read(into: UnsafeMutableAudioBufferListPointer(list), frames: Int(frameCount))
                return noErr
            }
            outE.attach(source)
            outE.connect(source, to: outE.mainMixerNode, format: sourceFormat)

            outE.prepare()
            inE.prepare()
            try outE.start()
            try inE.start()
        } catch {
            inE.inputNode.removeTap(onBus: 0)
            inE.stop()
            outE.stop()
            throw error
        }

        inputEngine = inE
        outputEngine = outE
        inputID = input
        outputID = output
        observers = [inE, outE].map { engine in
            NotificationCenter.default.addObserver(forName: .AVAudioEngineConfigurationChange,
                                                   object: engine, queue: .main) { [weak self] _ in
                self?.stop()
                self?.onConfigurationChange?()
            }
        }
    }

    func stop() {
        observers.forEach(NotificationCenter.default.removeObserver)
        observers = []
        inputEngine?.inputNode.removeTap(onBus: 0)
        inputEngine?.stop()
        outputEngine?.stop()
        inputEngine = nil
        outputEngine = nil
        inputID = nil
        outputID = nil
    }

    private func setDevice(_ unit: AudioUnit?, _ id: AudioDeviceID, _ message: String) throws {
        guard let unit else { throw RouterError(errorDescription: message) }
        var device = id
        let status = AudioUnitSetProperty(unit, kAudioOutputUnitProperty_CurrentDevice, kAudioUnitScope_Global, 0,
                                          &device, UInt32(MemoryLayout<AudioDeviceID>.size))
        if status != noErr { throw RouterError(errorDescription: "\(message) (\(status))") }
    }
}

// MARK: - Menü çubuğu

final class AppDelegate: NSObject, NSApplicationDelegate, NSMenuDelegate {
    private let statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
    private let router = AudioRouter()
    private let defaults = UserDefaults.standard
    private var lastError: String?
    private var micDenied = false
    private let hint = EnableHint()
    /// Bu takılışta Audio MIDI Ayarları zaten açıldı mı? iPhone çıkarılınca sıfırlanır.
    private var promptedForEnable = false

    private var enabled: Bool {
        get { defaults.object(forKey: "enabled") as? Bool ?? true }
        set { defaults.set(newValue, forKey: "enabled") }
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        let menu = NSMenu()
        menu.delegate = self
        statusItem.menu = menu
        router.onConfigurationChange = { [weak self] in
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { self?.sync() }
        }
        CoreAudioDevices.onChange { [weak self] in
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { self?.sync() }
        }
        // iPhone takılınca ses aygıtı hemen görünmeyebilir; USB'yi ara sıra kontrol et.
        Timer.scheduledTimer(withTimeInterval: 2, repeats: true) { [weak self] _ in
            guard let self, !router.isRunning else { return }
            sync()
        }
        sync()
    }

    func applicationWillTerminate(_ notification: Notification) {
        router.stop()
    }

    // MARK: Durum

    private func resolveInput(_ devices: [AudioDevice]) -> AudioDevice? {
        // Continuity mikrofonu da iPhone adını taşıyabilir; yalnızca USB ses aygıtını al.
        let usb = devices.filter { $0.isUSB && $0.inputs > 0 }
        return usb.first { $0.name.localizedCaseInsensitiveContains("iPhone") }
            ?? usb.first { $0.name.localizedCaseInsensitiveContains("iPad") }
    }

    private func resolveOutput(_ devices: [AudioDevice]) -> AudioDevice? {
        let id = CoreAudioDevices.defaultOutput()
        return devices.first { $0.id == id && $0.outputs > 0 }
    }

    private func sync() {
        defer { updateIcon() }
        guard enabled else {
            router.stop()
            return
        }
        let devices = CoreAudioDevices.all()
        guard let input = resolveInput(devices) else {
            router.stop()
            promptEnableIfNeeded()
            return
        }
        if hint.isShown {
            hint.hide()
            AudioMIDISetup.hide()
        }
        guard let output = resolveOutput(devices) else {
            router.stop()
            return
        }
        if router.isRunning && router.inputID == input.id && router.outputID == output.id { return }

        switch AVCaptureDevice.authorizationStatus(for: .audio) {
        case .authorized:
            micDenied = false
        case .notDetermined:
            AVCaptureDevice.requestAccess(for: .audio) { _ in DispatchQueue.main.async { self.sync() } }
            return
        default:
            micDenied = true
            router.stop()
            return
        }

        do {
            try router.start(input: input.id, output: output.id)
            lastError = nil
        } catch {
            lastError = error.localizedDescription
        }
    }

    /// iPhone takılı ama sesi kapalıysa Audio MIDI Ayarları'nı açar ve ne yapılacağını gösterir (her takılışta bir kez).
    private func promptEnableIfNeeded() {
        guard USBDevices.appleMobileConnected() else {
            promptedForEnable = false
            hint.hide()
            return
        }
        guard !promptedForEnable else { return }
        promptedForEnable = true
        AudioMIDISetup.open()
        hint.show()
    }

    private func updateIcon() {
        let symbol: String
        let tip: String
        if !enabled {
            symbol = "iphone.slash"; tip = "iPhone audio off"
        } else if router.isRunning {
            symbol = "iphone.radiowaves.left.and.right"; tip = "Playing iPhone audio"
        } else {
            symbol = "iphone"; tip = "Waiting for iPhone"
        }
        let image = NSImage(systemSymbolName: symbol, accessibilityDescription: tip)
        image?.isTemplate = true
        statusItem.button?.image = image
        statusItem.button?.appearsDisabled = enabled && !router.isRunning
        statusItem.button?.toolTip = tip
    }

    // MARK: Menü

    func menuNeedsUpdate(_ menu: NSMenu) {
        menu.removeAllItems()
        let devices = CoreAudioDevices.all()
        let input = resolveInput(devices)
        let output = resolveOutput(devices)
        let iPhoneOnUSB = USBDevices.appleMobileConnected()

        let status: String
        if !enabled {
            status = "Off"
        } else if micDenied {
            status = "Microphone access needed"
        } else if let lastError, !router.isRunning {
            status = "Error: \(lastError)"
        } else if router.isRunning, let input, let output {
            status = "\(input.name) → \(output.name)"
        } else if iPhoneOnUSB {
            status = "iPhone audio is not enabled"
        } else {
            status = "iPhone not connected"
        }
        addInfo(status, to: menu)
        menu.addItem(.separator())

        let toggle = item("Play iPhone Audio", #selector(toggleEnabled))
        toggle.state = enabled ? .on : .off
        menu.addItem(toggle)

        if micDenied {
            menu.addItem(item("Allow Microphone Access…", #selector(openMicSettings)))
        }
        if enabled && !router.isRunning && iPhoneOnUSB {
            menu.addItem(item("Enable iPhone Audio…", #selector(openAudioMIDISetup)))
        }
        menu.addItem(.separator())

        let login = item("Open at Login", #selector(toggleLoginItem))
        login.state = SMAppService.mainApp.status == .enabled ? .on : .off
        menu.addItem(login)
        menu.addItem(item("Quit", #selector(quit), key: "q"))
    }

    private func addInfo(_ title: String, to menu: NSMenu) {
        let info = NSMenuItem(title: title, action: nil, keyEquivalent: "")
        info.isEnabled = false
        menu.addItem(info)
    }

    private func item(_ title: String, _ action: Selector, key: String = "") -> NSMenuItem {
        let i = NSMenuItem(title: title, action: action, keyEquivalent: key)
        i.target = self
        return i
    }

    @objc private func toggleEnabled() {
        enabled.toggle()
        sync()
    }

    @objc private func openAudioMIDISetup() {
        AudioMIDISetup.open()
        hint.show()
    }

    @objc private func toggleLoginItem() {
        let service = SMAppService.mainApp
        do {
            if service.status == .enabled { try service.unregister() } else { try service.register() }
        } catch {
            NSAlert(error: error).runModal()
        }
    }

    @objc private func openMicSettings() {
        NSWorkspace.shared.open(URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone")!)
    }

    @objc private func quit() {
        NSApp.terminate(nil)
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.accessory)
app.run()
