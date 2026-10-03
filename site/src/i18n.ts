export const locales = ['en', 'tr', 'de'] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  de: 'Deutsch',
}

export function localePath(locale: Locale, hash = '') {
  return (locale === 'en' ? '/' : `/${locale}/`) + hash
}

const en = {
  meta: {
    title: 'iPhone Audio — Hear your iPhone on your Mac',
    description:
      'A free menu bar app that plays your iPhone’s sound through your Mac’s headphones over a USB cable. Signed and notarized by Apple.',
  },
  nav: { overview: 'Overview', setup: 'Setup', pricing: 'Pricing', faq: 'FAQ', download: 'Download' },
  hero: {
    name: 'iPhone Audio',
    title: 'Hear it on your Mac.',
    cta: 'Download free',
    support: 'Support the project',
    meta: 'macOS 13 or later. Mac with Apple silicon.',
    version: 'Version',
  },
  menu: {
    status: 'iPhone → MacBook Pro Speakers',
    note1: 'No microphone is used. The orange mic icon',
    note2: 'appears because macOS treats iPhone audio as input.',
    play: 'Play iPhone Audio',
    login: 'Open at Login',
    quit: 'Quit',
  },
  intro:
    'Your iPhone is in your hand. Your headphones are on your Mac. <strong>Plug in one cable</strong> and everything the iPhone plays — <strong>music, videos, games</strong> — comes out of the Mac. No Bluetooth pairing. <strong>Nothing to install on the phone.</strong>',
  specs: {
    title: 'Small app.<br />Big difference.',
    items: [
      { big: '1', unit: 'cable', text: 'That is the whole setup. USB in, sound out.' },
      { big: '0', unit: 'apps on iPhone', text: 'Your iPhone already sends audio over USB. The Mac just listens.' },
      { big: '0', unit: 'network requests', text: 'No accounts, no analytics. Your sound never leaves your desk.' },
      { big: '1', unit: 'click', text: 'Turn it on or off from the menu bar. Or let it open at login.' },
    ],
    follow: { title: 'Follows your headphones.', text: 'Switch from AirPods to speakers on your Mac. The sound follows on its own.' },
    trust: { title: 'Signed. Notarized. Open.', text: 'Built with a Developer ID and checked by Apple. Every line of code is on GitHub.' },
  },
  setup: {
    title: 'Set up in a minute.',
    steps: [
      { title: 'Connect.', text: 'Plug your iPhone into your Mac with a USB cable.' },
      { title: 'Open.', text: 'Open iPhone Audio. It appears in the menu bar.' },
      { title: 'Enable.', text: 'The first time, click Enable under your iPhone in Audio MIDI Setup. The app shows you where.' },
      { title: 'Listen.', text: 'Play anything on your iPhone. Hear it on your Mac.' },
    ],
  },
  mic: {
    title: 'That orange dot is not a microphone.',
    text: 'macOS counts your iPhone’s sound as an input, and it shows the orange indicator for every input. iPhone Audio uses no microphone. That is also the only reason it asks for microphone access.',
    tip: 'Tip: keep Mic Mode on Standard. Voice Isolation makes music sound flat.',
  },
  pricing: {
    title: 'Free for everyone.<br />Support if you like.',
    lead: 'Both give you the very same app. Same code, same signature, notarized by Apple. Nothing is held back.',
    free: { name: 'Open Source', price: 'Free', cta: 'Download', points: ['Signed and notarized app', 'Full source code, MIT license', 'Every future update'] },
    paid: { name: 'Supporter', price: '$4.99', from: 'Suggested. Pay what you want from $2.99.', cta: 'Buy', points: ['The exact same app', 'Download right after checkout', 'Link kept in your Polar account', 'Funds fixes and new macOS support'] },
    note: 'Payments are handled by Polar.',
  },
  faq: {
    title: 'Questions? Answers.',
    items: [
      { q: 'Which Macs does it run on?', a: 'Macs with Apple silicon (M1 or later) running macOS 13 Ventura or newer.' },
      { q: 'Do I need an app on my iPhone?', a: 'No. Your iPhone already sends audio over USB. The Mac app only needs to pick it up.' },
      { q: 'Why does it ask for microphone access?', a: 'macOS treats the iPhone’s sound as an audio input, and every input needs this permission. No microphone is used.' },
      { q: 'What is the Accessibility permission for?', a: 'It is optional. The app uses it only to point at the Enable button in Audio MIDI Setup during the first setup.' },
      { q: 'Is it really free?', a: 'Yes. Open source under the MIT license, with no ads, accounts or tracking.' },
      { q: 'What do I get if I pay?', a: 'The same app as the free download. Paying is a way to say thanks and fund future updates. Nothing is held back from free users.' },
    ],
  },
  cta: { title: 'Hear your iPhone on your Mac.', text: 'Free and open source.' },
  thanks: {
    title: 'Thank you.',
    text: 'Your support helps keep iPhone Audio going. Your download is ready.',
    cta: 'Download iPhone Audio',
    later: 'The link is also in the email from Polar and in your Polar account.',
    back: 'Back to iPhone Audio',
  },
  footer: {
    made: 'Made by',
    license: 'MIT License',
    releases: 'Releases',
    language: 'Language',
    note: 'iPhone and Mac are trademarks of Apple Inc. iPhone Audio is an independent project and is not affiliated with Apple.',
  },
}

export type Dict = typeof en

const tr: Dict = {
  meta: {
    title: 'iPhone Audio — iPhone’unuzu Mac’inizde dinleyin',
    description:
      'iPhone’unuzun sesini USB kablosuyla Mac’inizin kulaklığında çalan ücretsiz menü çubuğu uygulaması. Apple tarafından imzalı ve onaylı.',
  },
  nav: { overview: 'Genel Bakış', setup: 'Kurulum', pricing: 'Fiyat', faq: 'SSS', download: 'İndir' },
  hero: {
    name: 'iPhone Audio',
    title: 'Mac’inizde dinleyin.',
    cta: 'Ücretsiz indir',
    support: 'Projeyi destekle',
    meta: 'macOS 13 veya üstü. Apple silicon’lı Mac.',
    version: 'Sürüm',
  },
  menu: {
    status: 'iPhone → MacBook Pro Hoparlörleri',
    note1: 'No microphone is used. The orange mic icon',
    note2: 'appears because macOS treats iPhone audio as input.',
    play: 'Play iPhone Audio',
    login: 'Open at Login',
    quit: 'Quit',
  },
  intro:
    'iPhone elinizde. Kulaklık Mac’inizde. <strong>Tek bir kablo takın</strong>; iPhone’da çalan her şey — <strong>müzik, video, oyun</strong> — Mac’ten gelsin. Bluetooth eşleştirmesi yok. <strong>Telefona hiçbir şey kurulmaz.</strong>',
  specs: {
    title: 'Küçük uygulama.<br />Büyük fark.',
    items: [
      { big: '1', unit: 'kablo', text: 'Kurulumun tamamı bu. USB girer, ses çıkar.' },
      { big: '0', unit: 'iPhone uygulaması', text: 'iPhone sesi zaten USB’den gönderir. Mac sadece dinler.' },
      { big: '0', unit: 'ağ isteği', text: 'Hesap yok, analitik yok. Sesiniz masanızdan çıkmaz.' },
      { big: '1', unit: 'tık', text: 'Menü çubuğundan açın, kapatın. İsterseniz girişte kendisi açılsın.' },
    ],
    follow: { title: 'Kulaklığınızı takip eder.', text: 'Mac’te AirPods’tan hoparlöre geçin. Ses kendiliğinden peşinden gelir.' },
    trust: { title: 'İmzalı. Onaylı. Açık.', text: 'Developer ID ile imzalanır, Apple tarafından denetlenir. Kodun her satırı GitHub’da.' },
  },
  setup: {
    title: 'Bir dakikada kurulur.',
    steps: [
      { title: 'Bağlayın.', text: 'iPhone’unuzu USB kablosuyla Mac’e takın.' },
      { title: 'Açın.', text: 'iPhone Audio’yu açın. Menü çubuğunda belirir.' },
      { title: 'Etkinleştirin.', text: 'İlk seferde Audio MIDI Ayarları’nda iPhone’unuzun altındaki Etkinleştir’e tıklayın. Uygulama yerini gösterir.' },
      { title: 'Dinleyin.', text: 'iPhone’da ne çalarsanız Mac’te duyun.' },
    ],
  },
  mic: {
    title: 'O turuncu nokta mikrofon değil.',
    text: 'macOS iPhone’unuzun sesini bir giriş sayar ve her giriş için turuncu göstergeyi yakar. iPhone Audio hiçbir mikrofonu kullanmaz. Mikrofon izni istemesinin tek nedeni de budur.',
    tip: 'İpucu: Mikrofon Modu’nu Standart’ta bırakın. Ses Yalıtımı müziği düzleştirir.',
  },
  pricing: {
    title: 'Herkese ücretsiz.<br />İsteyen destekler.',
    lead: 'İkisi de birebir aynı uygulamayı verir. Aynı kod, aynı imza, Apple onaylı. Hiçbir şey esirgenmez.',
    free: { name: 'Açık Kaynak', price: 'Ücretsiz', cta: 'İndir', points: ['İmzalı ve onaylı uygulama', 'Tüm kaynak kod, MIT lisansı', 'Gelecekteki tüm güncellemeler'] },
    paid: { name: 'Destekçi', price: '4,99 $', from: 'Önerilen. 2,99 $’dan başlayarak istediğiniz kadar.', cta: 'Satın al', points: ['Birebir aynı uygulama', 'Ödemeden hemen sonra indirme', 'Bağlantı Polar hesabınızda kalır', 'Düzeltmelere ve yeni macOS desteğine katkı'] },
    note: 'Ödemeler Polar üzerinden alınır.',
  },
  faq: {
    title: 'Sorular? Cevaplar.',
    items: [
      { q: 'Hangi Mac’lerde çalışır?', a: 'macOS 13 Ventura veya üstü yüklü, Apple silicon (M1 ve sonrası) Mac’lerde.' },
      { q: 'iPhone’a uygulama kurmam gerekir mi?', a: 'Hayır. iPhone sesi zaten USB üzerinden gönderir. Mac uygulaması yalnızca onu alır.' },
      { q: 'Neden mikrofon izni istiyor?', a: 'macOS iPhone’un sesini bir ses girişi sayar ve her giriş bu izni ister. Hiçbir mikrofon kullanılmaz.' },
      { q: 'Erişilebilirlik izni ne için?', a: 'İsteğe bağlıdır. Uygulama onu yalnızca ilk kurulumda Audio MIDI Ayarları’ndaki Etkinleştir düğmesini göstermek için kullanır.' },
      { q: 'Gerçekten ücretsiz mi?', a: 'Evet. MIT lisanslı açık kaynaktır; reklam, hesap ya da izleme yoktur.' },
      { q: 'Ödersem ne alırım?', a: 'Ücretsiz indirmeyle aynı uygulamayı. Ödeme teşekkür etmenin ve gelecekteki güncellemeleri desteklemenin bir yolu. Ücretsiz kullanıcılardan hiçbir şey esirgenmez.' },
    ],
  },
  cta: { title: 'iPhone’unuzu Mac’inizde dinleyin.', text: 'Ücretsiz ve açık kaynak.' },
  thanks: {
    title: 'Teşekkürler.',
    text: 'Desteğiniz iPhone Audio’nun devam etmesine yardım ediyor. İndirmeniz hazır.',
    cta: 'iPhone Audio’yu indir',
    later: 'Bağlantı Polar’dan gelen e-postada ve Polar hesabınızda da var.',
    back: 'iPhone Audio’ya dön',
  },
  footer: {
    made: 'Yapan',
    license: 'MIT Lisansı',
    releases: 'Sürümler',
    language: 'Dil',
    note: 'iPhone ve Mac, Apple Inc.’in ticari markalarıdır. iPhone Audio bağımsız bir projedir ve Apple ile bağlantılı değildir.',
  },
}

const de: Dict = {
  meta: {
    title: 'iPhone Audio — Dein iPhone auf deinem Mac hören',
    description:
      'Eine kostenlose Menüleisten-App, die den Ton deines iPhone über ein USB-Kabel auf den Kopfhörern deines Mac abspielt. Von Apple signiert und notarisiert.',
  },
  nav: { overview: 'Überblick', setup: 'Einrichtung', pricing: 'Preis', faq: 'FAQ', download: 'Laden' },
  hero: {
    name: 'iPhone Audio',
    title: 'Hör es auf deinem Mac.',
    cta: 'Kostenlos laden',
    support: 'Projekt unterstützen',
    meta: 'macOS 13 oder neuer. Mac mit Apple Chip.',
    version: 'Version',
  },
  menu: {
    status: 'iPhone → MacBook Pro Lautsprecher',
    note1: 'No microphone is used. The orange mic icon',
    note2: 'appears because macOS treats iPhone audio as input.',
    play: 'Play iPhone Audio',
    login: 'Open at Login',
    quit: 'Quit',
  },
  intro:
    'Dein iPhone ist in deiner Hand. Deine Kopfhörer hängen am Mac. <strong>Ein Kabel anstecken</strong>, und alles, was das iPhone spielt — <strong>Musik, Videos, Spiele</strong> — kommt aus dem Mac. Kein Bluetooth-Koppeln. <strong>Nichts auf dem iPhone zu installieren.</strong>',
  specs: {
    title: 'Kleine App.<br />Großer Unterschied.',
    items: [
      { big: '1', unit: 'Kabel', text: 'Das ist die ganze Einrichtung. USB rein, Ton raus.' },
      { big: '0', unit: 'Apps auf dem iPhone', text: 'Dein iPhone sendet Ton schon über USB. Der Mac hört nur zu.' },
      { big: '0', unit: 'Netzwerkanfragen', text: 'Keine Konten, keine Analyse. Dein Ton bleibt auf deinem Schreibtisch.' },
      { big: '1', unit: 'Klick', text: 'Ein- und ausschalten in der Menüleiste. Oder beim Anmelden öffnen lassen.' },
    ],
    follow: { title: 'Folgt deinen Kopfhörern.', text: 'Wechsle am Mac von AirPods zu Lautsprechern. Der Ton folgt von selbst.' },
    trust: { title: 'Signiert. Notarisiert. Offen.', text: 'Mit Developer ID signiert und von Apple geprüft. Jede Zeile Code liegt auf GitHub.' },
  },
  setup: {
    title: 'In einer Minute eingerichtet.',
    steps: [
      { title: 'Verbinden.', text: 'Steck dein iPhone per USB-Kabel an deinen Mac.' },
      { title: 'Öffnen.', text: 'Öffne iPhone Audio. Es erscheint in der Menüleiste.' },
      { title: 'Aktivieren.', text: 'Beim ersten Mal in Audio-MIDI-Setup unter deinem iPhone auf Aktivieren klicken. Die App zeigt dir, wo.' },
      { title: 'Hören.', text: 'Spiel etwas auf dem iPhone ab. Hör es auf dem Mac.' },
    ],
  },
  mic: {
    title: 'Der orange Punkt ist kein Mikrofon.',
    text: 'macOS zählt den Ton deines iPhone als Eingang und zeigt für jeden Eingang die orange Anzeige. iPhone Audio nutzt kein Mikrofon. Nur deshalb fragt es nach Mikrofonzugriff.',
    tip: 'Tipp: Lass den Mikrofonmodus auf Standard. Sprachisolierung lässt Musik flach klingen.',
  },
  pricing: {
    title: 'Kostenlos für alle.<br />Unterstützen, wer mag.',
    lead: 'Beide geben dir genau dieselbe App. Gleicher Code, gleiche Signatur, von Apple notarisiert. Nichts wird zurückgehalten.',
    free: { name: 'Open Source', price: 'Kostenlos', cta: 'Laden', points: ['Signierte und notarisierte App', 'Voller Quellcode, MIT-Lizenz', 'Alle künftigen Updates'] },
    paid: { name: 'Unterstützer', price: '4,99 $', from: 'Empfohlen. Zahl, was du willst, ab 2,99 $.', cta: 'Kaufen', points: ['Genau dieselbe App', 'Download direkt nach dem Kauf', 'Link bleibt in deinem Polar-Konto', 'Finanziert Fixes und neue macOS-Versionen'] },
    note: 'Zahlungen laufen über Polar.',
  },
  faq: {
    title: 'Fragen? Antworten.',
    items: [
      { q: 'Auf welchen Macs läuft es?', a: 'Auf Macs mit Apple Chip (M1 oder neuer) ab macOS 13 Ventura.' },
      { q: 'Brauche ich eine App auf dem iPhone?', a: 'Nein. Dein iPhone sendet den Ton bereits über USB. Die Mac-App nimmt ihn nur auf.' },
      { q: 'Warum fragt sie nach Mikrofonzugriff?', a: 'macOS behandelt den Ton des iPhone als Audioeingang, und jeder Eingang braucht diese Erlaubnis. Es wird kein Mikrofon benutzt.' },
      { q: 'Wofür ist die Bedienungshilfen-Erlaubnis?', a: 'Sie ist optional. Die App zeigt damit beim ersten Einrichten nur auf die Taste Aktivieren in Audio-MIDI-Setup.' },
      { q: 'Ist es wirklich kostenlos?', a: 'Ja. Open Source unter MIT-Lizenz, ohne Werbung, Konten oder Tracking.' },
      { q: 'Was bekomme ich, wenn ich zahle?', a: 'Dieselbe App wie beim kostenlosen Download. Bezahlen ist ein Dankeschön und finanziert künftige Updates. Gratis-Nutzern wird nichts vorenthalten.' },
    ],
  },
  cta: { title: 'Hör dein iPhone auf deinem Mac.', text: 'Kostenlos und Open Source.' },
  thanks: {
    title: 'Danke.',
    text: 'Deine Unterstützung hält iPhone Audio am Laufen. Dein Download ist bereit.',
    cta: 'iPhone Audio laden',
    later: 'Der Link steht auch in der E-Mail von Polar und in deinem Polar-Konto.',
    back: 'Zurück zu iPhone Audio',
  },
  footer: {
    made: 'Gemacht von',
    license: 'MIT-Lizenz',
    releases: 'Versionen',
    language: 'Sprache',
    note: 'iPhone und Mac sind Marken der Apple Inc. iPhone Audio ist ein unabhängiges Projekt und steht in keiner Verbindung zu Apple.',
  },
}

export const dicts: Record<Locale, Dict> = { en, tr, de }
