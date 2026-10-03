import ApplicationServices
import Cocoa
import SwiftUI

// MARK: - Audio MIDI Setup'taki "Enable" düğmesini bulma

/// Erişilebilirlik izniyle Audio MIDI Setup'ın içindeki "Enable" düğmesinin ekrandaki yerini bulur.
enum EnableButtonLocator {
    private static let titles: Set<String> = ["enable", "etkinleştir"]

    static var isTrusted: Bool { AXIsProcessTrusted() }

    static func requestTrust() {
        let key = kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String
        _ = AXIsProcessTrustedWithOptions([key: true] as CFDictionary)
    }

    /// Düğmenin çerçevesi (Cocoa koordinatlarında) veya nil.
    static func frame() -> NSRect? {
        guard isTrusted,
              let pid = NSRunningApplication.runningApplications(withBundleIdentifier: AudioMIDISetup.bundleID).first?.processIdentifier,
              let windows = attribute(AXUIElementCreateApplication(pid), kAXWindowsAttribute) as? [AXUIElement],
              let primary = NSScreen.screens.first else { return nil }
        for window in windows {
            guard let button = find(in: window, depth: 0) else { continue }
            var origin = CGPoint.zero
            var size = CGSize.zero
            guard let position = attribute(button, kAXPositionAttribute), let extent = attribute(button, kAXSizeAttribute),
                  AXValueGetValue(position as! AXValue, .cgPoint, &origin),
                  AXValueGetValue(extent as! AXValue, .cgSize, &size), size.width > 0 else { continue }
            // AX: sol üst köken; Cocoa: sol alt köken.
            return NSRect(x: origin.x, y: primary.frame.maxY - origin.y - size.height, width: size.width, height: size.height)
        }
        return nil
    }

    private static func find(in element: AXUIElement, depth: Int) -> AXUIElement? {
        guard depth < 14, let children = attribute(element, kAXChildrenAttribute) as? [AXUIElement] else { return nil }
        for child in children {
            if attribute(child, kAXRoleAttribute) as? String == kAXButtonRole as String,
               let title = attribute(child, kAXTitleAttribute) as? String, titles.contains(title.lowercased()) {
                return child
            }
            if let found = find(in: child, depth: depth + 1) { return found }
        }
        return nil
    }

    private static func attribute(_ element: AXUIElement, _ name: String) -> AnyObject? {
        var value: AnyObject?
        return AXUIElementCopyAttributeValue(element, name as CFString, &value) == .success ? value : nil
    }
}

// MARK: - Yol gösterici

/// iPhone sesi kapalıyken: Audio MIDI Setup'ın yanına resimli bir panel koyar; Erişilebilirlik izni
/// varsa "Enable" düğmesini halka ve okla doğrudan işaretler.
final class EnableHint {
    private var panel: NSPanel?
    private var pointer: NSWindow?
    private var timer: Timer?
    private let model = HintModel()
    private let panelSize = NSSize(width: 300, height: 320)
    private let pointerSize = NSSize(width: 230, height: 64)

    var isShown: Bool { panel != nil }

    func show() {
        guard panel == nil else { return }
        let panel = NSPanel(contentRect: NSRect(origin: .zero, size: panelSize),
                            styleMask: [.titled, .closable, .nonactivatingPanel, .utilityWindow],
                            backing: .buffered, defer: false)
        panel.title = "iPhone Audio"
        panel.level = .floating
        panel.isReleasedWhenClosed = false
        panel.hidesOnDeactivate = false
        panel.contentView = hosting(HintPanelView(model: model, requestTrust: EnableButtonLocator.requestTrust), size: panelSize)
        self.panel = panel

        let pointer = NSWindow(contentRect: NSRect(origin: .zero, size: pointerSize), styleMask: .borderless,
                               backing: .buffered, defer: false)
        pointer.level = .statusBar
        pointer.isOpaque = false
        pointer.backgroundColor = .clear
        pointer.hasShadow = false
        pointer.ignoresMouseEvents = true
        pointer.contentView = hosting(PointerView(), size: pointerSize)
        self.pointer = pointer

        panel.orderFrontRegardless()
        timer = Timer.scheduledTimer(withTimeInterval: 0.3, repeats: true) { [weak self] _ in self?.update() }
        update()
    }

    func hide() {
        timer?.invalidate()
        timer = nil
        panel?.close()
        pointer?.orderOut(nil)
        panel = nil
        pointer = nil
    }

    private func update() {
        guard let panel, let pointer else { return }
        if !panel.isVisible { hide(); return } // kullanıcı kapattı
        model.trusted = EnableButtonLocator.isTrusted
        placePanel(panel)

        if let button = EnableButtonLocator.frame() {
            // Halka düğmeyi çevreler, ok ve yazı sağında durur.
            let ringWidth = button.width + 16
            pointer.setFrame(NSRect(x: button.minX - 8, y: button.midY - pointerSize.height / 2,
                                    width: ringWidth + 150, height: pointerSize.height), display: true)
            let ring = CGSize(width: ringWidth, height: button.height + 12)
            if let host = pointer.contentView as? NSHostingView<PointerView>, host.rootView.ring != ring {
                host.rootView = PointerView(ring: ring)
            }
            pointer.orderFrontRegardless()
            model.pointing = true
        } else {
            pointer.orderOut(nil)
            model.pointing = false
        }
    }

    /// Paneli Audio MIDI Setup penceresinin sağına (sığmazsa soluna) yerleştirir.
    private func placePanel(_ panel: NSPanel) {
        let size = panel.frame.size
        guard let target = AudioMIDISetup.windowFrame(),
              let screen = NSScreen.screens.first(where: { $0.frame.intersects(target) }) else {
            if let screen = NSScreen.main {
                panel.setFrameOrigin(NSPoint(x: screen.visibleFrame.midX - size.width / 2, y: screen.visibleFrame.maxY - size.height - 40))
            }
            return
        }
        let visible = screen.visibleFrame
        var x = target.maxX + 12
        if x + size.width > visible.maxX { x = target.minX - size.width - 12 }
        x = min(max(x, visible.minX), visible.maxX - size.width)
        let y = min(max(target.maxY - size.height, visible.minY), visible.maxY - size.height)
        panel.setFrameOrigin(NSPoint(x: x, y: y))
    }

    private func hosting<V: View>(_ view: V, size: NSSize) -> NSHostingView<V> {
        let host = NSHostingView(rootView: view)
        host.sizingOptions = []
        host.frame = NSRect(origin: .zero, size: size)
        return host
    }
}

final class HintModel: ObservableObject {
    @Published var trusted = false
    @Published var pointing = false
}

// MARK: - Görünümler

struct HintPanelView: View {
    @ObservedObject var model: HintModel
    let requestTrust: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Turn on iPhone audio").font(.headline)
            Illustration()
            Text(model.pointing
                 ? "Click the highlighted **Enable** button."
                 : "In Audio MIDI Setup, find your iPhone in the list on the left and click **Enable** under it.")
                .font(.callout)
                .fixedSize(horizontal: false, vertical: true)
            if !model.trusted {
                Button("Point It Out for Me", action: requestTrust)
                Text("Needs Accessibility access so the button can be found on screen.")
                    .font(.caption).foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            Spacer(minLength: 0)
            Text("This closes on its own once audio is on.")
                .font(.caption).foregroundStyle(.secondary)
        }
        .padding(16)
        .frame(width: 300, height: 320, alignment: .topLeading)
    }
}

/// Audio MIDI Setup'taki iPhone satırının basit bir çizimi; "Enable" düğmesi vurgulu.
struct Illustration: View {
    @State private var pulse = false

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            row(icon: "headphones", name: "EarPods", detail: "0 in / 2 out", dimmed: true)
            Divider().opacity(0.4)
            HStack(alignment: .top, spacing: 10) {
                Image(systemName: "iphone").font(.system(size: 22)).frame(width: 26)
                VStack(alignment: .leading, spacing: 4) {
                    Text("Your iPhone").font(.system(size: 12, weight: .semibold))
                    ZStack {
                        Capsule().stroke(Color.accentColor, lineWidth: 3)
                            .frame(width: 70, height: 28)
                            .scaleEffect(pulse ? 1.12 : 0.95)
                            .opacity(pulse ? 0.2 : 1)
                        Text("Enable").font(.system(size: 11, weight: .medium))
                            .padding(.horizontal, 10).padding(.vertical, 3)
                            .background(Capsule().fill(Color.primary.opacity(0.12)))
                    }
                }
                Image(systemName: "cursorarrow").font(.system(size: 18))
                    .offset(x: -24, y: 26)
                Spacer()
            }
            .padding(8)
            .background(RoundedRectangle(cornerRadius: 6).fill(Color.accentColor.opacity(0.12)))
        }
        .padding(8)
        .background(RoundedRectangle(cornerRadius: 10).fill(Color.primary.opacity(0.05)))
        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.primary.opacity(0.1)))
        .onAppear { withAnimation(.easeOut(duration: 1).repeatForever(autoreverses: false)) { pulse = true } }
    }

    private func row(icon: String, name: String, detail: String, dimmed: Bool) -> some View {
        HStack(spacing: 10) {
            Image(systemName: icon).font(.system(size: 16)).frame(width: 26)
            VStack(alignment: .leading, spacing: 1) {
                Text(name).font(.system(size: 12))
                Text(detail).font(.system(size: 10)).foregroundStyle(.secondary)
            }
            Spacer()
        }
        .padding(8)
        .opacity(dimmed ? 0.5 : 1)
    }
}

/// Gerçek "Enable" düğmesinin üstüne konan halka + ok + yazı.
struct PointerView: View {
    var ring = CGSize(width: 70, height: 30)
    @State private var bounce = false

    var body: some View {
        HStack(spacing: 4) {
            RoundedRectangle(cornerRadius: ring.height / 2)
                .stroke(Color.accentColor, lineWidth: 3)
                .frame(width: ring.width, height: ring.height)
                .shadow(color: Color.accentColor.opacity(0.8), radius: bounce ? 8 : 2)
            Image(systemName: "arrowshape.left.fill")
                .font(.system(size: 24))
                .foregroundStyle(Color.accentColor)
                .offset(x: bounce ? 0 : 8)
            Text("Click Enable")
                .font(.system(size: 12, weight: .semibold))
                .foregroundStyle(.white)
                .padding(.horizontal, 8).padding(.vertical, 4)
                .background(Capsule().fill(Color.accentColor))
            Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .onAppear { withAnimation(.easeInOut(duration: 0.6).repeatForever()) { bounce = true } }
    }
}
