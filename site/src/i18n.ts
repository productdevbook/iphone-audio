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
  nav: { overview: 'Overview', how: 'How it works', pricing: 'Pricing', faq: 'FAQ', download: 'Download' },
  hero: {
    eyebrow: 'Free for Mac',
    title: ['Your iPhone.', 'Your Mac’s headphones.'],
    lead: 'Plug in a cable and hear everything your iPhone plays — music, videos, games — right through the headphones already on your Mac.',
    cta: 'Download free',
    support: 'Support the project',
    github: 'View on GitHub',
    requirements: 'macOS 13 or later · Apple silicon',
    version: 'Version',
  },
  menu: {
    eyebrow: 'Menu bar',
    title: 'Lives quietly in your menu bar.',
    lead: 'One click turns it on or off. The menu always tells you what is playing, and where.',
    status: 'iPhone → External Headphones',
    note1: 'No microphone is used. The orange mic icon',
    note2: 'appears because macOS treats iPhone audio as input.',
    play: 'Play iPhone Audio',
    login: 'Open at Login',
    quit: 'Quit',
  },
  how: {
    eyebrow: 'How it works',
    title: 'Set up once. Then just plug in.',
    steps: [
      { title: 'Connect', text: 'Connect your iPhone to your Mac with a USB cable.' },
      { title: 'Open', text: 'Open iPhone Audio. An iPhone icon appears in the menu bar.' },
      {
        title: 'Enable',
        text: 'The first time, Audio MIDI Setup opens. Click Enable under your iPhone — the app points you to the button.',
      },
      { title: 'Listen', text: 'Play something on your iPhone. You hear it on your Mac.' },
    ],
  },
  features: {
    eyebrow: 'Details',
    title: 'Small app. Thought through.',
    items: [
      { icon: 'cable', title: 'Wired, not wireless', text: 'Sound travels over the cable. No Bluetooth pairing, nothing to install on the iPhone.' },
      { icon: 'headphones', title: 'Follows your output', text: 'Switch headphones or speakers on your Mac and the sound follows along.' },
      { icon: 'power', title: 'Open at Login', text: 'Turn it on once and it is ready every time your Mac starts.' },
      { icon: 'shield', title: 'Signed and notarized', text: 'Built with a Developer ID and checked by Apple, so it opens without warnings.' },
      { icon: 'wifi', title: 'Works offline', text: 'The app makes no network connections. Your audio never leaves your desk.' },
      { icon: 'code', title: 'Free and open source', text: 'MIT licensed. Read every line of the code on GitHub.' },
    ],
  },
  mic: {
    eyebrow: 'About the orange dot',
    title: 'No microphone. Promise.',
    text: 'macOS shows the orange microphone indicator while the app runs. The app uses no microphone: macOS counts your iPhone’s sound as an input, and it shows this icon for every input. That is also why the app asks for microphone access.',
    tip: 'Keep Mic Mode on Standard. Voice Isolation makes music sound bad.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions and answers.',
    items: [
      { q: 'Which Macs does it run on?', a: 'Macs with Apple silicon (M1 or later) running macOS 13 Ventura or newer.' },
      { q: 'Do I need an app on my iPhone?', a: 'No. Your iPhone already sends audio over USB. The Mac app only needs to pick it up.' },
      { q: 'Why does it ask for microphone access?', a: 'macOS treats the iPhone’s sound as an audio input, and every input needs this permission. No microphone is used.' },
      { q: 'What is the Accessibility permission for?', a: 'It is optional. The app uses it only to point at the Enable button in Audio MIDI Setup during the first setup.' },
      { q: 'Is it really free?', a: 'Yes. It is open source under the MIT license, with no ads, accounts or tracking.' },
      { q: 'What do I get if I pay?', a: 'The same app as the free download. Paying is a way to say thanks and fund future updates — nothing is held back from free users.' },
    ],
  },
  cta: {
    title: 'Hear your iPhone on your Mac.',
    text: 'Free and open source. Pay what you want if you’d like to support it.',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Free. Or pay what you want.',
    lead: 'Both options give you the very same app — same code, same signature, notarized by Apple. Nothing is locked. Paying simply supports the work.',
    free: { name: 'Open source', price: 'Free', text: 'Download the signed app from GitHub, or build it yourself from the source.', cta: 'Download free', points: ['Signed and notarized app', 'Full source code, MIT license', 'All future updates'] },
    paid: { name: 'Supporter', price: '$4.99', from: 'suggested · from $2.99', text: 'Get the same app straight from this site and help keep it maintained for new macOS releases.', cta: 'Buy and download', points: ['The exact same app', 'Download right after checkout', 'Link kept in your Polar account', 'Funds fixes and new features'] },
    note: 'Payments are handled securely by Polar.',
  },
  thanks: {
    title: 'Thank you for your support.',
    text: 'Your purchase helps keep iPhone Audio maintained. Your download is ready.',
    cta: 'Download iPhone Audio',
    later: 'The link is also in the email from Polar and in your Polar account.',
    back: 'Back to home',
  },
  footer: {
    made: 'Made by',
    license: 'MIT License',
    releases: 'Releases',
    language: 'Language',
  },
}

export type Dict = typeof en

const tr: Dict = {
  meta: {
    title: 'iPhone Audio — iPhone’unuzu Mac’inizde dinleyin',
    description:
      'iPhone’unuzun sesini USB kablosuyla Mac’inizin kulaklığında çalan ücretsiz menü çubuğu uygulaması. Apple tarafından imzalı ve onaylı.',
  },
  nav: { overview: 'Genel bakış', how: 'Nasıl çalışır', pricing: 'Fiyat', faq: 'SSS', download: 'İndir' },
  hero: {
    eyebrow: 'Mac için ücretsiz',
    title: ['iPhone’unuz.', 'Mac’inizin kulaklığında.'],
    lead: 'Kabloyu takın; iPhone’unuzda çalan her şeyi — müzik, video, oyun — Mac’inize bağlı kulaklıktan dinleyin.',
    cta: 'Ücretsiz indir',
    support: 'Projeyi destekle',
    github: 'GitHub’da gör',
    requirements: 'macOS 13 veya üstü · Apple silicon',
    version: 'Sürüm',
  },
  menu: {
    eyebrow: 'Menü çubuğu',
    title: 'Menü çubuğunda sessizce durur.',
    lead: 'Tek tıkla açılır, tek tıkla kapanır. Menü, neyin nerede çaldığını her zaman gösterir.',
    status: 'iPhone → Harici Kulaklık',
    note1: 'No microphone is used. The orange mic icon',
    note2: 'appears because macOS treats iPhone audio as input.',
    play: 'Play iPhone Audio',
    login: 'Open at Login',
    quit: 'Quit',
  },
  how: {
    eyebrow: 'Nasıl çalışır',
    title: 'Bir kez kurun. Sonra sadece takın.',
    steps: [
      { title: 'Bağlayın', text: 'iPhone’unuzu USB kablosuyla Mac’inize bağlayın.' },
      { title: 'Açın', text: 'iPhone Audio’yu açın. Menü çubuğunda bir iPhone simgesi belirir.' },
      {
        title: 'Etkinleştirin',
        text: 'İlk seferde Audio MIDI Ayarları açılır. iPhone’unuzun altındaki Etkinleştir düğmesine tıklayın — uygulama düğmeyi size gösterir.',
      },
      { title: 'Dinleyin', text: 'iPhone’unuzda bir şey çalın. Sesi Mac’inizde duyarsınız.' },
    ],
  },
  features: {
    eyebrow: 'Ayrıntılar',
    title: 'Küçük uygulama. İnce düşünülmüş.',
    items: [
      { icon: 'cable', title: 'Kablolu, kablosuz değil', text: 'Ses kablodan gelir. Bluetooth eşleştirmesi yok, iPhone’a bir şey kurulmaz.' },
      { icon: 'headphones', title: 'Çıkışınızı takip eder', text: 'Mac’te kulaklığı ya da hoparlörü değiştirin, ses de onu takip eder.' },
      { icon: 'power', title: 'Girişte aç', text: 'Bir kez açın, Mac her başladığında hazır olsun.' },
      { icon: 'shield', title: 'İmzalı ve onaylı', text: 'Developer ID ile imzalanır ve Apple tarafından denetlenir; uyarı vermeden açılır.' },
      { icon: 'wifi', title: 'İnternetsiz çalışır', text: 'Uygulama hiçbir ağ bağlantısı kurmaz. Sesiniz masanızdan çıkmaz.' },
      { icon: 'code', title: 'Ücretsiz ve açık kaynak', text: 'MIT lisanslı. Kodun her satırını GitHub’da okuyabilirsiniz.' },
    ],
  },
  mic: {
    eyebrow: 'Turuncu nokta hakkında',
    title: 'Mikrofon yok. Söz.',
    text: 'Uygulama çalışırken macOS turuncu mikrofon göstergesini gösterir. Uygulama hiçbir mikrofonu kullanmaz: macOS iPhone’unuzun sesini bir giriş sayar ve her giriş için bu simgeyi gösterir. Uygulamanın mikrofon izni istemesinin nedeni de budur.',
    tip: 'Mikrofon Modu’nu Standart’ta bırakın. Ses Yalıtımı müziğin sesini bozar.',
  },
  faq: {
    eyebrow: 'SSS',
    title: 'Sorular ve cevaplar.',
    items: [
      { q: 'Hangi Mac’lerde çalışır?', a: 'macOS 13 Ventura veya üstü yüklü, Apple silicon (M1 ve sonrası) Mac’lerde.' },
      { q: 'iPhone’a uygulama kurmam gerekir mi?', a: 'Hayır. iPhone sesi zaten USB üzerinden gönderir. Mac uygulaması yalnızca onu alır.' },
      { q: 'Neden mikrofon izni istiyor?', a: 'macOS iPhone’un sesini bir ses girişi sayar ve her giriş bu izni ister. Hiçbir mikrofon kullanılmaz.' },
      { q: 'Erişilebilirlik izni ne için?', a: 'İsteğe bağlıdır. Uygulama onu yalnızca ilk kurulumda Audio MIDI Ayarları’ndaki Etkinleştir düğmesini göstermek için kullanır.' },
      { q: 'Gerçekten ücretsiz mi?', a: 'Evet. MIT lisanslı açık kaynaktır; reklam, hesap ya da izleme yoktur.' },
      { q: 'Ödersem ne alırım?', a: 'Ücretsiz indirmeyle aynı uygulamayı. Ödeme teşekkür etmenin ve gelecekteki güncellemeleri desteklemenin bir yolu — ücretsiz kullanıcılardan hiçbir şey esirgenmez.' },
    ],
  },
  cta: {
    title: 'iPhone’unuzu Mac’inizde dinleyin.',
    text: 'Ücretsiz ve açık kaynak. Desteklemek isterseniz istediğiniz kadar ödeyin.',
  },
  pricing: {
    eyebrow: 'Fiyat',
    title: 'Ücretsiz. Ya da istediğiniz kadar ödeyin.',
    lead: 'İki seçenek de birebir aynı uygulamayı verir — aynı kod, aynı imza, Apple onaylı. Hiçbir şey kilitli değil. Ödeme yalnızca emeği destekler.',
    free: { name: 'Açık kaynak', price: 'Ücretsiz', text: 'İmzalı uygulamayı GitHub’dan indirin ya da kaynaktan kendiniz derleyin.', cta: 'Ücretsiz indir', points: ['İmzalı ve onaylı uygulama', 'Tüm kaynak kod, MIT lisansı', 'Gelecekteki tüm güncellemeler'] },
    paid: { name: 'Destekçi', price: '4,99 $', from: 'önerilen · en az 2,99 $', text: 'Aynı uygulamayı doğrudan bu siteden alın, yeni macOS sürümlerinde güncel kalmasına yardım edin.', cta: 'Satın al ve indir', points: ['Birebir aynı uygulama', 'Ödemeden hemen sonra indirme', 'Bağlantı Polar hesabınızda kalır', 'Düzeltmelere ve yeni özelliklere katkı'] },
    note: 'Ödemeler Polar üzerinden güvenle alınır.',
  },
  thanks: {
    title: 'Desteğiniz için teşekkürler.',
    text: 'Satın alımınız iPhone Audio’nun bakımına destek oluyor. İndirmeniz hazır.',
    cta: 'iPhone Audio’yu indir',
    later: 'Bağlantı Polar’dan gelen e-postada ve Polar hesabınızda da var.',
    back: 'Ana sayfaya dön',
  },
  footer: {
    made: 'Yapan',
    license: 'MIT Lisansı',
    releases: 'Sürümler',
    language: 'Dil',
  },
}

const de: Dict = {
  meta: {
    title: 'iPhone Audio — Dein iPhone auf deinem Mac hören',
    description:
      'Eine kostenlose Menüleisten-App, die den Ton deines iPhone über ein USB-Kabel auf den Kopfhörern deines Mac abspielt. Von Apple signiert und notarisiert.',
  },
  nav: { overview: 'Überblick', how: 'So geht’s', pricing: 'Preis', faq: 'FAQ', download: 'Laden' },
  hero: {
    eyebrow: 'Kostenlos für Mac',
    title: ['Dein iPhone.', 'Auf den Kopfhörern deines Mac.'],
    lead: 'Kabel anschließen und alles hören, was dein iPhone abspielt — Musik, Videos, Spiele — direkt über die Kopfhörer an deinem Mac.',
    cta: 'Kostenlos laden',
    support: 'Projekt unterstützen',
    github: 'Auf GitHub ansehen',
    requirements: 'macOS 13 oder neuer · Apple Chip',
    version: 'Version',
  },
  menu: {
    eyebrow: 'Menüleiste',
    title: 'Wohnt leise in deiner Menüleiste.',
    lead: 'Ein Klick schaltet es ein oder aus. Das Menü zeigt dir immer, was wo spielt.',
    status: 'iPhone → Externe Kopfhörer',
    note1: 'No microphone is used. The orange mic icon',
    note2: 'appears because macOS treats iPhone audio as input.',
    play: 'Play iPhone Audio',
    login: 'Open at Login',
    quit: 'Quit',
  },
  how: {
    eyebrow: 'So geht’s',
    title: 'Einmal einrichten. Dann nur noch anstecken.',
    steps: [
      { title: 'Verbinden', text: 'Verbinde dein iPhone per USB-Kabel mit deinem Mac.' },
      { title: 'Öffnen', text: 'Öffne iPhone Audio. In der Menüleiste erscheint ein iPhone-Symbol.' },
      {
        title: 'Aktivieren',
        text: 'Beim ersten Mal öffnet sich Audio-MIDI-Setup. Klicke unter deinem iPhone auf Aktivieren — die App zeigt dir die Taste.',
      },
      { title: 'Hören', text: 'Spiele etwas auf deinem iPhone ab. Du hörst es auf deinem Mac.' },
    ],
  },
  features: {
    eyebrow: 'Details',
    title: 'Kleine App. Durchdacht.',
    items: [
      { icon: 'cable', title: 'Kabel statt Funk', text: 'Der Ton kommt über das Kabel. Kein Bluetooth-Koppeln, nichts auf dem iPhone zu installieren.' },
      { icon: 'headphones', title: 'Folgt deiner Ausgabe', text: 'Wechsle am Mac Kopfhörer oder Lautsprecher, und der Ton folgt.' },
      { icon: 'power', title: 'Beim Anmelden öffnen', text: 'Einmal einschalten, und es ist bei jedem Start deines Mac bereit.' },
      { icon: 'shield', title: 'Signiert und notarisiert', text: 'Mit Developer ID signiert und von Apple geprüft, öffnet sich ohne Warnungen.' },
      { icon: 'wifi', title: 'Funktioniert offline', text: 'Die App baut keine Netzwerkverbindungen auf. Dein Ton verlässt nie deinen Schreibtisch.' },
      { icon: 'code', title: 'Kostenlos und Open Source', text: 'MIT-Lizenz. Lies jede Zeile Code auf GitHub.' },
    ],
  },
  mic: {
    eyebrow: 'Über den orangen Punkt',
    title: 'Kein Mikrofon. Versprochen.',
    text: 'macOS zeigt die orange Mikrofonanzeige, solange die App läuft. Die App nutzt kein Mikrofon: macOS zählt den Ton deines iPhone als Eingang und zeigt dieses Symbol für jeden Eingang. Deshalb fragt die App auch nach Mikrofonzugriff.',
    tip: 'Lass den Mikrofonmodus auf Standard. Sprachisolierung lässt Musik schlecht klingen.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Fragen und Antworten.',
    items: [
      { q: 'Auf welchen Macs läuft es?', a: 'Auf Macs mit Apple Chip (M1 oder neuer) ab macOS 13 Ventura.' },
      { q: 'Brauche ich eine App auf dem iPhone?', a: 'Nein. Dein iPhone sendet den Ton bereits über USB. Die Mac-App nimmt ihn nur auf.' },
      { q: 'Warum fragt sie nach Mikrofonzugriff?', a: 'macOS behandelt den Ton des iPhone als Audioeingang, und jeder Eingang braucht diese Erlaubnis. Es wird kein Mikrofon benutzt.' },
      { q: 'Wofür ist die Bedienungshilfen-Erlaubnis?', a: 'Sie ist optional. Die App zeigt damit beim ersten Einrichten nur auf die Taste Aktivieren in Audio-MIDI-Setup.' },
      { q: 'Ist es wirklich kostenlos?', a: 'Ja. Open Source unter MIT-Lizenz, ohne Werbung, Konten oder Tracking.' },
      { q: 'Was bekomme ich, wenn ich zahle?', a: 'Dieselbe App wie beim kostenlosen Download. Bezahlen ist ein Dankeschön und finanziert künftige Updates — Gratis-Nutzern wird nichts vorenthalten.' },
    ],
  },
  cta: {
    title: 'Hör dein iPhone auf deinem Mac.',
    text: 'Kostenlos und Open Source. Zahl, was du willst, wenn du unterstützen möchtest.',
  },
  pricing: {
    eyebrow: 'Preis',
    title: 'Kostenlos. Oder zahl, was du willst.',
    lead: 'Beide Wege geben dir genau dieselbe App — gleicher Code, gleiche Signatur, von Apple notarisiert. Nichts ist gesperrt. Bezahlen unterstützt einfach die Arbeit.',
    free: { name: 'Open Source', price: 'Kostenlos', text: 'Lade die signierte App von GitHub oder baue sie selbst aus dem Quellcode.', cta: 'Kostenlos laden', points: ['Signierte und notarisierte App', 'Voller Quellcode, MIT-Lizenz', 'Alle zukünftigen Updates'] },
    paid: { name: 'Unterstützer', price: '4,99 $', from: 'empfohlen · ab 2,99 $', text: 'Hol dir dieselbe App direkt hier und hilf, sie für neue macOS-Versionen aktuell zu halten.', cta: 'Kaufen und laden', points: ['Genau dieselbe App', 'Download direkt nach dem Kauf', 'Link bleibt in deinem Polar-Konto', 'Finanziert Fixes und neue Funktionen'] },
    note: 'Zahlungen werden sicher über Polar abgewickelt.',
  },
  thanks: {
    title: 'Danke für deine Unterstützung.',
    text: 'Dein Kauf hilft, iPhone Audio zu pflegen. Dein Download ist bereit.',
    cta: 'iPhone Audio laden',
    later: 'Der Link steht auch in der E-Mail von Polar und in deinem Polar-Konto.',
    back: 'Zur Startseite',
  },
  footer: {
    made: 'Gemacht von',
    license: 'MIT-Lizenz',
    releases: 'Versionen',
    language: 'Sprache',
  },
}

export const dicts: Record<Locale, Dict> = { en, tr, de }
