import { type ReactNode, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  CircleHelp,
  Globe2,
  Heart,
  Image,
  Library,
  Menu,
  MessageCircle,
  Mic2,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Youtube,
} from 'lucide-react';

type IconType = typeof Sparkles;

const features: { icon: IconType; title: string; text: string; accent: string }[] = [
  { icon: BookOpen, title: 'Bible', text: 'KJV + Amharic Bible reading that works offline.', accent: '#eab308' },
  { icon: Library, title: 'Books Library', text: 'Free Christian books to read and keep close.', accent: '#a78bfa' },
  { icon: Youtube, title: 'Courses', text: 'Learn and grow in faith at your own pace.', accent: '#818cf8' },
  { icon: CircleHelp, title: 'Quiz', text: 'Test your Bible knowledge with friendly questions.', accent: '#f59e0b' },
  { icon: MessageCircle, title: 'Chat', text: 'Connect with believers around the world.', accent: '#c084fc' },
  { icon: Image, title: 'Flyers', text: 'Share gospel images that encourage and inspire.', accent: '#60a5fa' },
];

const slides = [
  { label: 'Home screen', title: 'Begin again.', verse: '“The Lord is near to all who call on him.”', reference: 'Psalm 145:18', kind: 'home' },
  { label: 'Bible reading', title: 'Your word is a lamp.', verse: '“Your word is a lamp to my feet and a light to my path.”', reference: 'Psalm 119:105', kind: 'bible' },
  { label: 'Community chat', title: 'You are not alone.', verse: 'Share, listen, and pray with believers worldwide.', reference: 'Grace Community', kind: 'community' },
  { label: 'Books library', title: 'Read something true.', verse: 'Free Christian books for the questions you are carrying.', reference: 'Grace Books', kind: 'books' },
  { label: 'Radio playing', title: 'A quiet voice nearby.', verse: 'Reflections, worship, and conversations for the road.', reference: 'Grace Radio', kind: 'radio' },
];

const faqs = [
  ['Is Grace free?', 'Yes, 100% free forever.'],
  ['Works offline?', 'Yes, Bible + books + notes.'],
  ['Which languages?', 'English + Amharic.'],
  ['How to get APK?', 'Download from our site.'],
  ['Is my data safe?', 'Yes, your data is encrypted.'],
  ['How to contact?', 'graceapp@proton.me'],
];

type Stats = { users: number; books: number; courses: number };
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const fallbackStats: Stats = { users: 128, books: 460, courses: 24 };

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useCount(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 1300, 1);
      setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);
  return value;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" data-testid="link-logo">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${light ? 'bg-[#eab308] text-[#24143d]' : 'bg-[#eab308] text-[#24143d]'}`}>
        <Sparkles size={19} strokeWidth={2.2} />
      </span>
      <span className={`text-[21px] font-semibold tracking-[-.04em] ${light ? 'text-[#fffaf0]' : 'text-[#fffaf0]'}`}>grace</span>
    </a>
  );
}

function ButtonLink({ children, href = '#download', variant = 'gold', onClick }: { children: ReactNode; href?: string; variant?: 'gold' | 'outline' | 'quiet'; onClick?: () => void }) {
  const styles = {
    gold: 'bg-[#eab308] text-[#25133e] shadow-[0_12px_32px_rgba(234,179,8,.18)] hover:bg-[#f5c72b]',
    outline: 'border border-[#806ca1]/70 text-[#fffaf0] hover:border-[#eab308] hover:text-[#eab308]',
    quiet: 'text-[#d6cce6] hover:text-[#eab308]',
  };
  return <a href={href} onClick={onClick} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300 ${styles[variant]}`} data-testid={`link-${href.replace('#', '')}`}>{children}</a>;
}

function PhoneMockup({ slide, onPrev, onNext }: { slide: number; onPrev: () => void; onNext: () => void }) {
  const item = slides[slide];
  return (
    <div className="relative mx-auto w-[min(72vw,300px)] sm:w-[320px]">
      <div className="absolute -inset-10 rounded-full bg-[#7c3aed]/20 blur-3xl" aria-hidden="true" />
      <div className="phone-shell phone-float relative rounded-[38px] p-2.5">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0d0918]" />
        <div className="app-screen min-h-[560px] overflow-hidden rounded-[29px] text-[#fffaf0] sm:min-h-[600px]">
          <div className="flex items-center justify-between px-5 pb-3 pt-8 text-[10px] text-[#cabedf]"><span>9:41</span><span>● ● ▰</span></div>
          <div className="px-5">
            <div className="mb-7 flex items-center justify-between"><span className="text-[12px] text-[#cabedf]">Good morning, Mara</span><span className="grid h-8 w-8 place-items-center rounded-full bg-[#eab308] text-[11px] font-bold text-[#28133f]">M</span></div>
            {item.kind === 'home' && <div className="rounded-[23px] bg-gradient-to-br from-[#7541be] to-[#42236d] p-5 shadow-xl"><div className="mb-12 flex items-center justify-between"><span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[.18em] text-[#ecdcff]">Daily reading</span><Heart size={15} className="text-[#eab308]" /></div><p className="serif text-[28px] leading-[.95]">Begin<br />again.</p><p className="mt-3 text-[11px] text-[#dccaf1]">Psalm 145:18</p></div>}
             {item.kind === 'bible' && <div className="rounded-[23px] bg-[#f4ead7] p-5 text-[#29153e] shadow-xl"><div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#856b42]">Psalm 119</span><span className="rounded-full bg-[#eab308] px-2 py-1 text-[8px] font-bold">KJV</span></div><p className="serif mt-10 text-[25px] leading-[1.02]">Thy word is<br /><i>a lamp unto</i><br />my feet.</p><p className="mt-8 text-[10px] leading-4 text-[#75665a]">Your word is a lamp to my feet, and a light to my path.</p><div className="mt-5 h-1 rounded-full bg-[#d8c7ae]"><div className="h-full w-[42%] rounded-full bg-[#7a49b2]" /></div></div>}
             {item.kind === 'community' && <div className="rounded-[23px] border border-[#a78bfa]/30 bg-[#241741] p-4 shadow-xl"><div className="mb-5 flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#a78bfa]">Community chat</span><span className="h-2 w-2 rounded-full bg-[#75d69b]" /></div><div className="space-y-3 text-[10px]"><div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-[#3b2858] p-3 text-[#e4d9ef]">Praying for everyone taking exams this week.</div><div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-[#eab308] p-3 text-[#2b173e]">Amen. Thank you for sharing.</div><div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-[#3b2858] p-3 text-[#e4d9ef]">God is good, even in the waiting.</div></div><div className="mt-7 rounded-full border border-[#806ca1]/40 px-3 py-2 text-[9px] text-[#a99bbd]">Write a message...</div></div>}
             {item.kind === 'books' && <div className="rounded-[23px] bg-[#d9c6ed] p-5 text-[#29153e] shadow-xl"><div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.18em]">Books library</span><Library size={16} /></div><div className="mt-8 grid grid-cols-2 gap-3"><div className="grid h-28 place-items-center bg-[#eab308] p-3 text-center"><span className="serif text-[18px] leading-[.9]">Grace<br /><i>for today</i></span></div><div className="grid h-28 place-items-center bg-[#7046ad] p-3 text-center text-[#fffaf0]"><span className="serif text-[18px] leading-[.9]">The<br /><i>quiet</i><br />place</span></div></div><p className="mt-5 text-[10px] text-[#6f5878]">Browse 460+ free books</p></div>}
             {item.kind === 'radio' && <div className="rounded-[23px] bg-gradient-to-br from-[#eab308] to-[#c77726] p-5 text-[#29153e] shadow-xl"><div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.18em]">Grace Radio</span><Mic2 size={17} /></div><div className="flex h-48 items-center justify-center"><div className="grid h-28 w-28 place-items-center rounded-full border border-[#29153e]/30"><div className="grid h-20 w-20 place-items-center rounded-full bg-[#29153e] text-[#eab308]"><Play size={24} fill="currentColor" /></div></div></div><p className="serif text-[23px] leading-none">A softer way to listen.</p><div className="mt-4 h-1 rounded-full bg-[#29153e]/20"><div className="h-full w-[58%] rounded-full bg-[#29153e]" /></div></div>}
            <div className="mt-6 flex items-center justify-between text-center text-[10px] text-[#a99bbd]"><span><span className="mx-auto mb-1 block h-1 w-1 rounded-full bg-[#eab308]" />Home</span><span><BookOpen className="mx-auto mb-1" size={14} />Read</span><span><Users className="mx-auto mb-1" size={14} />Community</span><span><Sparkles className="mx-auto mb-1" size={14} />More</span></div>
          </div>
        </div>
      </div>
      <button onClick={onPrev} aria-label="Previous app screen" className="absolute -left-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#a78bfa]/30 bg-[#2a1947] text-[#fffaf0] transition hover:border-[#eab308]" data-testid="button-previous-screen"><ChevronLeft size={18} /></button>
      <button onClick={onNext} aria-label="Next app screen" className="absolute -right-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#a78bfa]/30 bg-[#2a1947] text-[#fffaf0] transition hover:border-[#eab308]" data-testid="button-next-screen"><ChevronRight size={18} /></button>
    </div>
  );
}

function Modal({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#0d0819]/80 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Grace app demo" onClick={onClose}>
    <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#806ca1]/40 bg-[#211438] p-6 shadow-2xl sm:p-10" onClick={(event) => event.stopPropagation()}>
      <button onClick={onClose} aria-label="Close demo" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-[#f5edff] hover:bg-white/20" data-testid="button-close-demo"><X size={18} /></button>
      <div className="grid gap-8 sm:grid-cols-[.8fr_1.2fr] sm:items-center"><div className="grid h-48 place-items-center rounded-2xl bg-gradient-to-br from-[#6841a1] to-[#25163f]"><CirclePlay size={62} strokeWidth={1} className="text-[#eab308]" /></div><div><p className="mono text-[10px] uppercase tracking-[.2em] text-[#eab308]">A tiny tour</p><h2 className="serif mt-2 text-4xl text-[#fffaf0]">A softer way<br />to show up.</h2><p className="mt-4 text-sm leading-6 text-[#c8b9d9]">Grace gives you a few good minutes for what matters: a reading, a question, a breath. No noise. No pressure. Just a place to return to.</p><ButtonLink onClick={onClose}>Get the app <ArrowRight size={15} /></ButtonLink></div></div>
    </div>
  </div>;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const [modal, setModal] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const statsRef = useReveal();
  const [statsVisible, setStatsVisible] = useState(false);
  const [liveStats, setLiveStats] = useState<Stats>(fallbackStats);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installHint, setInstallHint] = useState(false);
  const people = useCount(liveStats.users, statsVisible);
  const books = useCount(liveStats.books, statsVisible);
  const courses = useCount(liveStats.courses, statsVisible);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 5400);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'));
    if (!nodes.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const endpoint = import.meta.env.VITE_SUPABASE_STATS_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (endpoint) {
      fetch(endpoint, { headers: key ? { apikey: key, Authorization: `Bearer ${key}` } : undefined })
        .then((response) => response.ok ? response.json() : null)
        .then((payload: Stats | Stats[] | null) => {
          const record = Array.isArray(payload) ? payload[0] : payload;
          if (record && typeof record.users === 'number' && typeof record.books === 'number' && typeof record.courses === 'number') {
            setLiveStats(record);
          }
        })
        .catch(() => undefined);
    }
  }, []);
  useEffect(() => {
    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);
  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsVisible(true); }, { threshold: .3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [statsRef]);

  const next = () => setSlide((current) => (current + 1) % slides.length);
  const prev = () => setSlide((current) => (current - 1 + slides.length) % slides.length);
  const closeMobile = () => setMobileOpen(false);
  const handleInstall = async () => {
    if (!installPrompt) {
      setInstallHint(true);
      return;
    }
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <div id="top" className="grain min-h-[100dvh] bg-[#17102b] text-[#fffaf0]">
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Logo light />
          <nav className="hidden items-center gap-8 text-sm text-[#d3c8e1] md:flex" aria-label="Main navigation">
            <a href="#why" className="transition hover:text-[#eab308]" data-testid="link-why">Why Grace</a>
            <a href="#app" className="transition hover:text-[#eab308]" data-testid="link-app">Inside the app</a>
            <a href="#stories" className="transition hover:text-[#eab308]" data-testid="link-stories">Stories</a>
            <a href="#faq" className="transition hover:text-[#eab308]" data-testid="link-faq">FAQ</a>
          </nav>
          <div className="hidden md:block"><ButtonLink>Download Grace <ArrowRight size={15} /></ButtonLink></div>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#fffaf0] md:hidden" data-testid="button-mobile-menu">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {mobileOpen && <nav className="mx-4 rounded-2xl border border-[#806ca1]/30 bg-[#211438]/95 p-3 shadow-2xl backdrop-blur-lg md:hidden" aria-label="Mobile navigation"><a onClick={closeMobile} href="#why" className="block rounded-xl px-4 py-3 text-sm text-[#e8def1] hover:bg-white/10" data-testid="mobile-link-why">Why Grace</a><a onClick={closeMobile} href="#app" className="block rounded-xl px-4 py-3 text-sm text-[#e8def1] hover:bg-white/10" data-testid="mobile-link-app">Inside the app</a><a onClick={closeMobile} href="#stories" className="block rounded-xl px-4 py-3 text-sm text-[#e8def1] hover:bg-white/10" data-testid="mobile-link-stories">Stories</a><a onClick={closeMobile} href="#faq" className="block rounded-xl px-4 py-3 text-sm text-[#e8def1] hover:bg-white/10" data-testid="mobile-link-faq">FAQ</a></nav>}
      </header>

      <main>
        <section className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_73%_38%,rgba(109,62,174,.42),transparent_33%),linear-gradient(120deg,#17102b_0%,#21123b_58%,#2a1745_100%)] pt-36 sm:min-h-[820px] sm:pt-44">
          <div className="glow-orb absolute -right-20 top-40 h-72 w-72 rounded-full bg-[#9333ea]/15" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
            <div className="relative z-10 max-w-2xl">
              <p className="reveal is-visible mono delay-1 text-[10px] uppercase tracking-[.27em] text-[#eab308] sm:text-xs">A daily rhythm for your faith</p>
              <h1 className="reveal is-visible delay-2 serif mt-5 text-[clamp(3.25rem,9vw,7.9rem)] leading-[.84] tracking-[-.055em] text-[#fffaf0]">Walk Closer<br /><i className="text-[#d6c2ed]">With God</i><br />Every Day.</h1>
              <p className="reveal is-visible delay-3 mt-8 max-w-md text-base leading-7 text-[#c4b6d4] sm:text-lg">Daily Bible verses, free Christian books, courses, quizzes, and a global faith community.</p>
              <div className="reveal is-visible delay-3 mt-8 flex flex-wrap items-center gap-3"><ButtonLink>Get Started Free <ArrowRight size={16} /></ButtonLink><button onClick={() => setModal(true)} className="inline-flex min-h-11 items-center gap-2 px-3 text-sm font-semibold text-[#e6d9f2] transition hover:text-[#eab308]" data-testid="button-open-demo"><span className="grid h-8 w-8 place-items-center rounded-full border border-[#a78bfa]/60"><Play size={12} fill="currentColor" /></span> Watch Demo</button></div>
              <div className="mt-12 flex items-center gap-3"><div className="flex -space-x-2">{['L','A','J','S'].map((letter, index) => <span key={letter} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#21123b] bg-[#8063ae] text-[10px] font-bold text-[#fffaf0]" style={{ backgroundColor: ['#cf9b72','#7260b1','#b86f9d','#eab308'][index] }}>{letter}</span>)}</div><p className="text-xs text-[#aa9cbd]"><strong className="font-semibold text-[#f1e8f7]">128,000+ people</strong> are making room for grace.</p></div>
            </div>
             <div className="reveal is-visible delay-2 relative z-10 pb-10 pt-3"><PhoneMockup slide={slide} onPrev={prev} onNext={next} /><div className="mt-7 flex items-center justify-center gap-2">{slides.map((item, index) => <button key={item.kind} onClick={() => setSlide(index)} aria-label={`Show ${item.label} preview`} className={`h-1 rounded-full transition-all ${slide === index ? 'w-8 bg-[#eab308]' : 'w-2 bg-[#725d8e]'}`} data-testid={`button-screen-${index}`} />)}</div></div>
          </div>
          <a href="#why" aria-label="Scroll to learn more" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#a798b9] sm:flex" data-testid="link-scroll-more"><ArrowDown size={14} className="text-[#eab308]" /> take a look</a>
        </section>

        <section id="why" className="scroll-mt-8 bg-[#f7f1e7] py-24 text-[#241437] sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="reveal grid gap-8 md:grid-cols-[.72fr_1.28fr] md:items-end"><div><p className="mono text-[10px] uppercase tracking-[.24em] text-[#7f5e9d]">Not another app to keep up with</p><h2 className="serif mt-4 text-5xl leading-[.94] tracking-[-.04em] sm:text-7xl">Come as<br /><i>you are.</i></h2></div><p className="max-w-lg pb-1 text-base leading-7 text-[#685a70]">Grace is made for the in-between moments: your first coffee, the train home, a question you cannot shake. It is a little more space for what matters.</p></div>
            <div className="mt-16 grid gap-4 md:grid-cols-3">{features.map(({ icon: FeatureIcon, title, text, accent }, index) => <article key={title} className={`reveal delay-${index + 1} rounded-[23px] border border-[#e4d9cd] bg-[#fbf7f0] p-7 shadow-[0_14px_35px_rgba(70,36,82,.06)]`} data-testid={`card-feature-${index}`}><span className="mb-16 grid h-12 w-12 place-items-center rounded-2xl" style={{ color: accent, backgroundColor: `${accent}18` }}><FeatureIcon size={22} /></span><p className="mono text-[10px] uppercase tracking-[.2em] text-[#9d8aa2]">0{index + 1}</p><h3 className="serif mt-2 text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#716278]">{text}</p></article>)}</div>
          </div>
        </section>

        <section id="app" className="scroll-mt-8 overflow-hidden bg-[#211438] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="reveal grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="mono text-[10px] uppercase tracking-[.24em] text-[#eab308]">A little more than reading</p><h2 className="serif mt-4 text-5xl leading-[.94] tracking-[-.04em] sm:text-7xl">Good things<br /><i>to return to.</i></h2></div><p className="max-w-md text-base leading-7 text-[#c4b6d4]">Follow a thread of curiosity or simply tap into the daily reading. Your library grows with you — not the other way around.</p></div>
            <div className="mt-16 grid gap-4 md:grid-cols-[1.3fr_.7fr]"><div className="reveal relative min-h-[440px] overflow-hidden rounded-[26px] bg-gradient-to-br from-[#7046ad] via-[#462568] to-[#27153f] p-8 sm:p-12"><div className="absolute -right-16 -top-12 h-72 w-72 rounded-full border border-[#eab308]/30" /><div className="absolute -right-4 -top-1 h-72 w-72 rounded-full border border-[#eab308]/20" /><div className="relative z-10 max-w-sm"><span className="rounded-full bg-[#eab308] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#2b173e]">Curated for your week</span><h3 className="serif mt-16 text-5xl leading-[.9] text-[#fffaf0]">Stories that<br /><i>stay with you.</i></h3><p className="mt-5 max-w-xs text-sm leading-6 text-[#d6c6e5]">Explore ideas on prayer, purpose, doubt, relationships, and the life you are actually living.</p><ButtonLink variant="outline" href="#download">Explore the library <ArrowRight size={15} /></ButtonLink></div><div className="absolute bottom-8 right-8 hidden w-48 rotate-[-7deg] rounded-sm bg-[#f2e8d7] p-5 text-[#2b173e] shadow-2xl sm:block"><p className="serif text-2xl leading-none">The art<br /><i>of paying</i><br />attention</p><p className="mt-8 text-[9px] uppercase tracking-[.15em]">Grace Books</p></div></div><div className="reveal delay-1 grid gap-4"><div className="rounded-[26px] border border-[#806ca1]/30 bg-[#2a1947] p-7"><Mic2 className="text-[#eab308]" size={23} /><h3 className="serif mt-12 text-3xl">Listen on the go.</h3><p className="mt-3 text-sm leading-6 text-[#bfaecc]">Reflections and conversations for your walk, commute, or quiet night in.</p></div><div className="rounded-[26px] bg-[#eab308] p-7 text-[#2b173e]"><Sparkles size={23} /><h3 className="serif mt-12 text-3xl">Find your people.</h3><p className="mt-3 text-sm leading-6 text-[#674d69]">A global community that leaves room for nuance, kindness, and growth.</p></div></div></div>
          </div>
        </section>

        <section ref={statsRef} className="border-y border-[#e1d6c9] bg-[#f7f1e7] py-16 text-[#241437]"><div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-[#d9ccbe] px-5 text-center sm:px-8 lg:px-12"><div><p className="serif text-4xl sm:text-6xl">{people.toLocaleString()}k<span className="text-[#9a6be0]">+</span></p><p className="mono mt-2 text-[9px] uppercase tracking-[.14em] text-[#8e7a90] sm:text-[10px]">people finding rhythm</p></div><div><p className="serif text-4xl sm:text-6xl">{books}<span className="text-[#9a6be0]">+</span></p><p className="mono mt-2 text-[9px] uppercase tracking-[.14em] text-[#8e7a90] sm:text-[10px]">free books</p></div><div><p className="serif text-4xl sm:text-6xl">{courses}</p><p className="mono mt-2 text-[9px] uppercase tracking-[.14em] text-[#8e7a90] sm:text-[10px]">courses to explore</p></div></div></section>

        <section id="stories" className="scroll-mt-8 bg-[#f7f1e7] px-5 py-24 text-[#241437] sm:px-8 sm:py-32 lg:px-12"><div className="mx-auto max-w-7xl"><div className="reveal text-center"><p className="mono text-[10px] uppercase tracking-[.24em] text-[#7f5e9d]">From the Grace community</p><h2 className="serif mt-4 text-5xl tracking-[-.04em] sm:text-7xl">Small moments.<br /><i>Real change.</i></h2></div><div className="mt-14 grid gap-4 md:grid-cols-3"><blockquote className="reveal rounded-[25px] bg-[#e9ddf2] p-8"><Quote className="text-[#7a49b2]" size={26} /><p className="serif mt-8 text-3xl leading-[1.05]">“Grace Book transformed my daily devotional time.”</p><footer className="mt-8 text-sm font-semibold">Sarah M.</footer></blockquote><blockquote className="reveal delay-1 rounded-[25px] bg-[#241437] p-8 text-[#fffaf0]"><Quote className="text-[#eab308]" size={26} /><p className="serif mt-8 text-3xl leading-[1.05]">“The free courses are incredibly well-made.”</p><footer className="mt-8 text-sm font-semibold text-[#eab308]">David K.</footer></blockquote><blockquote className="reveal delay-2 rounded-[25px] bg-[#d9c6ed] p-8 text-[#241437]"><Quote className="text-[#7a49b2]" size={26} /><p className="serif mt-8 text-3xl leading-[1.05]">“The community connects me with believers worldwide.”</p><footer className="mt-8 text-sm font-semibold">Grace L.</footer></blockquote></div></div></section>

        <section className="overflow-hidden bg-[#eab308] py-5 text-[#26143c]"><div className="marquee flex w-max items-center gap-8 whitespace-nowrap"><span className="mono text-[10px] uppercase tracking-[.2em]">Read • Learn • Wonder • Belong</span><Sparkles size={14} /><span className="mono text-[10px] uppercase tracking-[.2em]">Read • Learn • Wonder • Belong</span><Sparkles size={14} /><span className="mono text-[10px] uppercase tracking-[.2em]">Read • Learn • Wonder • Belong</span><Sparkles size={14} /><span className="mono text-[10px] uppercase tracking-[.2em]">Read • Learn • Wonder • Belong</span><Sparkles size={14} /><span className="mono text-[10px] uppercase tracking-[.2em]">Read • Learn • Wonder • Belong</span><Sparkles size={14} /></div></section>

         <section id="faq" className="scroll-mt-8 bg-[#211438] py-24 sm:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-12"><div className="reveal"><p className="mono text-[10px] uppercase tracking-[.24em] text-[#eab308]">Good questions</p><h2 className="serif mt-4 text-5xl leading-[.94] sm:text-7xl">No fine<br /><i>print.</i></h2><p className="mt-6 max-w-xs text-sm leading-6 text-[#bfaecc]">Everything you need to know before you begin.</p><a href="mailto:graceapp@proton.me" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#eab308] hover:underline" data-testid="link-email"><MessageCircle size={16} /> graceapp@proton.me</a></div><div className="reveal delay-1 divide-y divide-[#806ca1]/30">{faqs.map(([question, answer], index) => <div key={question}><button onClick={() => setFaq(faq === index ? null : index)} aria-expanded={faq === index} className="flex w-full items-center justify-between gap-4 py-6 text-left text-base font-semibold text-[#fffaf0]" data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={19} className={`shrink-0 text-[#eab308] transition-transform ${faq === index ? 'rotate-180' : ''}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${faq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><p className="max-w-xl pb-6 pr-10 text-sm leading-6 text-[#bfaecc]">{answer}</p></div></div></div>)}</div></div></section>

         <section id="download" className="scroll-mt-8 relative overflow-hidden bg-[radial-gradient(circle_at_80%_40%,rgba(147,51,234,.4),transparent_30%),#17102b] px-5 py-28 text-center sm:px-8 sm:py-36"><div className="glow-orb absolute -left-24 top-16 h-80 w-80 rounded-full bg-[#4f46e5]/15" aria-hidden="true" /><div className="reveal relative mx-auto max-w-4xl"><ShieldCheck className="mx-auto text-[#eab308]" size={26} /><h2 className="serif mt-5 text-6xl leading-[.88] tracking-[-.05em] sm:text-8xl">Get Grace<br /><i>on your phone.</i></h2><p className="mx-auto mt-7 max-w-md text-base leading-7 text-[#c4b6d4]">Start your daily walk with God in a few quiet minutes.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="https://t.me/graceapp7" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#eab308] px-5 text-sm font-semibold text-[#25133e] shadow-[0_12px_32px_rgba(234,179,8,.18)]" data-testid="link-download-apk">Download APK <ArrowRight size={15} /></a><button onClick={handleInstall} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#806ca1]/70 px-5 text-sm font-semibold text-[#fffaf0] hover:border-[#eab308] hover:text-[#eab308]" data-testid="button-install-pwa">Install PWA <ArrowRight size={15} /></button></div>{installHint && <p className="mx-auto mt-4 max-w-sm text-xs text-[#c4b6d4]" data-testid="text-install-hint">Use your browser menu and choose “Install Grace” to add Grace to your home screen.</p>}<div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-5 rounded-2xl border border-[#806ca1]/30 bg-white/5 p-4 text-left"><div className="grid h-24 w-24 place-items-center rounded-lg bg-[#fffaf0] p-2" aria-label="QR code for downloading Grace" data-testid="img-download-qr"><svg viewBox="0 0 21 21" className="h-full w-full text-[#17102b]" role="img"><path fill="currentColor" d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0zM2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2zM9 0h2v2H9zM8 4h2v3H8zM10 8h3v2h-3zM14 9h2v3h-2zM17 8h4v2h-4zM8 12h2v2H8zM11 13h3v4h-3zM15 15h2v2h-2zM18 12h3v3h-3zM8 18h3v3H8zM13 19h2v2h-2z" /></svg></div><p className="text-xs leading-5 text-[#c4b6d4]">Scan to download Grace and get the latest APK.<span className="mt-1 block font-semibold text-[#eab308]">Coming soon on Play Store</span></p></div><p className="mono mt-5 text-[9px] uppercase tracking-[.16em] text-[#8f7da3]">Free forever · No account required to explore</p></div></section>
      </main>

      <footer className="border-t border-[#806ca1]/25 bg-[#17102b] px-5 pb-8 pt-14 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><div className="grid gap-12 md:grid-cols-[1.25fr_.7fr_.8fr_1fr]"><div><Logo light /><p className="mt-5 max-w-xs text-sm leading-6 text-[#9f90b1]">A welcoming daily rhythm for your faith, wherever you are.</p><div className="mt-5 grid gap-2 text-sm text-[#bfaecc]"><a href="mailto:graceapp@proton.me" className="hover:text-[#fffaf0]" data-testid="footer-link-contact">graceapp@proton.me</a><a href="https://t.me/graceapp7" target="_blank" rel="noreferrer" className="hover:text-[#fffaf0]" data-testid="footer-link-telegram">t.me/graceapp7</a><a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#fffaf0]" data-testid="footer-link-tiktok">TikTok</a></div></div><div><p className="mono text-[10px] uppercase tracking-[.2em] text-[#eab308]">Explore</p><div className="mt-5 grid gap-3 text-sm text-[#bfaecc]"><a href="#app" className="hover:text-[#fffaf0]" data-testid="footer-link-bible">Bible</a><a href="#app" className="hover:text-[#fffaf0]" data-testid="footer-link-books">Books</a><a href="#app" className="hover:text-[#fffaf0]" data-testid="footer-link-courses">Courses</a><a href="#app" className="hover:text-[#fffaf0]" data-testid="footer-link-quiz">Quiz</a><a href="#stories" className="hover:text-[#fffaf0]" data-testid="footer-link-chat">Chat</a></div></div><div><p className="mono text-[10px] uppercase tracking-[.2em] text-[#eab308]">Support</p><div className="mt-5 grid gap-3 text-sm text-[#bfaecc]"><a href="tel:+251911573334" className="hover:text-[#fffaf0]" data-testid="footer-link-donate">Donate: Telebirr 251911573334</a><a href="#faq" className="hover:text-[#fffaf0]" data-testid="footer-link-faq">Help & FAQ</a><a href="#top" className="hover:text-[#fffaf0]" data-testid="footer-link-privacy">Privacy</a><a href="#top" className="hover:text-[#fffaf0]" data-testid="footer-link-terms">Terms</a></div></div><div><p className="mono text-[10px] uppercase tracking-[.2em] text-[#eab308]">Stay close</p><p className="mt-5 text-sm leading-6 text-[#bfaecc]">A thoughtful note, now and then.</p>{newsletterSent ? <p className="mt-4 flex items-center gap-2 text-sm text-[#eab308]" data-testid="status-newsletter"><Check size={16} /> You’re on the list.</p> : <form className="mt-4 flex border-b border-[#806ca1]/50 pb-2" onSubmit={(event) => { event.preventDefault(); setNewsletterSent(true); }}><label htmlFor="footer-email" className="sr-only">Your email</label><input id="footer-email" required type="email" placeholder="your@email.com" className="min-w-0 flex-1 bg-transparent text-sm text-[#fffaf0] outline-none placeholder:text-[#786989]" data-testid="input-footer-email" /><button aria-label="Subscribe to Grace notes" className="text-[#eab308] hover:text-[#fffaf0]" data-testid="button-subscribe"><ArrowRight size={18} /></button></form>}</div></div><div className="mt-14 flex flex-col justify-between gap-3 border-t border-[#806ca1]/20 pt-6 text-[11px] text-[#786989] sm:flex-row"><span>© 2026 Grace. Developed by <a href="https://addispower.pages.dev" target="_blank" rel="noreferrer" className="text-[#bfaecc] hover:text-[#eab308]">Addis Power</a>.</span><div className="flex gap-5"><a href="#top" className="hover:text-[#bfaecc]" data-testid="footer-link-footer-privacy">Privacy</a><a href="#top" className="hover:text-[#bfaecc]" data-testid="footer-link-footer-terms">Terms</a><span>Available worldwide</span></div></div></div></footer>
      {modal && <Modal onClose={() => setModal(false)} />}
    </div>
  );
}

export default App;