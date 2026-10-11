import { useState } from 'react';
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Camera,
  Check,
  ChevronDown,
  Heart,
  Luggage,
  Menu,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCOZvTVqUepLHRZEDe41U6HqiEwpMaHCvYgFZXx0k8i0tLNwUWDUnCz6sgVD6p1BTQSX8qfUXvJy6l8qSA9snW9wj_gQ96YLgKXDH8Y_mjpIA5z0JOuWJw_FlXOUSK-_tcq_KrUO6S0-4_7mccXUdEqTxK2ZRsYAgPfs9au4-yRatO3QHKEZE_W3UcaZL_cuoS3fh1SQqHLJlXaEjOSSA3111sEA6xJs-jW5ivYegwc-sJtAFaxV7Z3iA';

const services = [
  { icon: Camera, title: 'Abadikan momen', text: 'Bantu mengambil foto dan video yang natural sepanjang hari.' },
  { icon: Luggage, title: 'Jaga barang bawaan', text: 'Biar tanganmu bebas memeluk orang-orang tersayang.' },
  { icon: ShieldCheck, title: 'Siaga kebutuhan kecil', text: 'Dari touch-up sampai perlengkapan darurat, kami siap.' },
  { icon: CalendarCheck, title: 'Dampingi hari H', text: 'Bantu mengatur detail agar jadwal wisudamu tetap lancar.' },
  { icon: Users, title: 'Jadi teman tambahan', text: 'Pendamping yang hangat, sigap, dan mengerti suasana.' },
];

const packages = [
  { name: 'Sweet Assist', description: 'Bantuan dasar untuk melancarkan harimu.', features: ['Pendampingan 3 jam', 'Bantu dokumentasi HP', 'Bantu barang bawaan'], featured: false },
  { name: 'Special Assist', description: 'Paket lengkap yang paling disukai wisudawan.', features: ['Pendampingan 5 jam', 'Dokumentasi momen penting', 'Bantu barang dan kebutuhan kecil', 'Koordinasi rundown'], featured: true },
  { name: 'Full Assist', description: 'Pelayanan maksimal dari awal hingga akhir acara.', features: ['Pendampingan 8 jam', 'Semua layanan Special Assist', 'Bantuan persiapan sebelum acara', 'Pendampingan keluarga'], featured: false },
];

const faqs = [
  ['Apakah asisten akan mengambil foto menggunakan HP saya?', 'Ya. Asisten kami siap membantu mendokumentasikan dengan perangkatmu agar momen penting tetap tersimpan dengan gaya yang kamu suka.'],
  ['Bisa request untuk membawakan buket bunga?', 'Tentu. Membantu membawa buket, hadiah, dan barang personal adalah bagian dari layanan kami.'],
  ['Bagaimana jika acara molor?', 'Kami fleksibel dan akan berkoordinasi denganmu terkait penambahan waktu agar tetap terasa nyaman.'],
  ['Apakah bisa request pendamping perempuan?', 'Bisa. Sampaikan preferensimu saat konsultasi dan kami akan mencocokkan pendamping yang sesuai.'],
  ['Apakah melayani keluarga atau teman juga?', 'Bisa. Paket Full Assist cocok untuk kamu yang ingin keluarga ikut merasa lebih tenang.'],
];

const steps = [
  ['01', 'Pilih paket', 'Tentukan pendampingan yang paling pas untuk kebutuhanmu.'],
  ['02', 'Konsultasi', 'Ceritakan detail hari spesialmu kepada tim kami.'],
  ['03', 'Nikmati hari H', 'Kami hadir, kamu tinggal merayakan pencapaianmu.'],
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const closeMobile = () => setMobileOpen(false);

  // Scroll-triggered reveal refs
  const heroCopyRef = useReveal<HTMLDivElement>({ rootMargin: '0px 0px -5% 0px' });
  const heroVisualRef = useReveal<HTMLDivElement>({ rootMargin: '0px 0px -5% 0px' });
  const introRef = useReveal<HTMLDivElement>();
  const servicesHeadingRef = useReveal<HTMLDivElement>();
  const serviceCardRefs = [useReveal<HTMLElement>(), useReveal<HTMLElement>(), useReveal<HTMLElement>(), useReveal<HTMLElement>(), useReveal<HTMLElement>()];
  const packagesHeadingRef = useReveal<HTMLDivElement>();
  const packageCardRefs = [useReveal<HTMLElement>(), useReveal<HTMLElement>(), useReveal<HTMLElement>()];
  const packagesFootnoteRef = useReveal<HTMLParagraphElement>();
  const stepsHeadingRef = useReveal<HTMLDivElement>();
  const stepRefs = [useReveal<HTMLDivElement>(), useReveal<HTMLDivElement>(), useReveal<HTMLDivElement>()];
  const locationArtRef = useReveal<HTMLDivElement>();
  const locationCopyRef = useReveal<HTMLDivElement>();
  const faqHeadingRef = useReveal<HTMLDivElement>();
  const faqItemRefs = [useReveal<HTMLDivElement>(), useReveal<HTMLDivElement>(), useReveal<HTMLDivElement>(), useReveal<HTMLDivElement>(), useReveal<HTMLDivElement>()];
  const finalCtaRef = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMobile}>
          <img className="brand-logo" src="/Salinan_dari_Teks_paragraf_Anda_(5).png" alt="GradsmateAssist" />
        </a>
        <nav className={mobileOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navigasi utama">
          <a href="#home" onClick={closeMobile}>Beranda</a>
          <a href="#packages" onClick={closeMobile}>Paket</a>
          <a href="#how-it-works" onClick={closeMobile}>Cara Kerja</a>
          <a href="#why-us" onClick={closeMobile}>Mengapa Kami</a>
          <a href="#faq" onClick={closeMobile}>Tanya Jawab</a>
          <a className="mobile-cta" href="#packages" onClick={closeMobile}>Pesan sekarang <ArrowRight size={16} /></a>
        </nav>
        <a className="button button-small top-cta" href="#packages">Pesan sekarang <ArrowRight size={16} /></a>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Buka menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section className="hero section-padding" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-grid content-width">
            <div className="hero-copy reveal from-left" ref={heroCopyRef}>
              <div className="eyebrow">Teman wisuda, siap bantu di hari istimewa</div>
              <h1>Kamu wisuda.<br /><em>Kami yang bantu.</em></h1>
              <p className="hero-lead">Pendamping pribadi hari wisudamu. Kami mengurus detailnya sehingga kamu bisa menikmati momen tanpa ribet.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#packages">Lihat paket <ArrowRight size={18} /></a>
                <a className="button button-ghost" href="#how-it-works">Cara kerja</a>
              </div>
              <div className="trust-line"><span className="avatar-stack"><i /><i /><i /></span><span>Dipercaya wisudawan di Solo Raya & Jogja</span></div>
            </div>
            <div className="hero-visual reveal from-right reveal-delay" ref={heroVisualRef}>
              <div className="image-frame"><img src={heroImage} alt="Momen wisuda yang hangat dan berkesan" /><div className="image-badge"><Heart size={16} fill="currentColor" /><span>Make it memorable</span></div></div>
              <div className="floating-note note-one"><span className="note-icon"><Camera size={17} /></span><span><strong>Momennya aman</strong><small>Kamu tinggal menikmati</small></span></div>
              <div className="floating-note note-two"><Award size={18} /><span>Hari spesialmu,<br /><strong>dibantu sepenuh hati.</strong></span></div>
            </div>
          </div>
          <div className="scroll-cue"><span /> Scroll untuk melihat layanan</div>
        </section>

        <section className="intro section-padding section-light">
          <div className="narrow-content reveal" ref={introRef}><p className="section-kicker">A little help, a lot of memories</p><h2>Wisuda sekali,<br /><span>kenangannya selamanya.</span></h2><p>Jadikan momen wisudamu lebih tenang dan fokus merayakan kebahagiaan bersama orang tersayang. Kami bantu sisanya.</p></div>
        </section>

        <section className="services section-padding" id="why-us">
          <div className="content-width">
            <div className="section-heading reveal" ref={servicesHeadingRef}><div><p className="section-kicker">Kami ada untukmu</p><h2>Detail kecil yang<br /><span>membuat beda.</span></h2></div><p>Karena hari istimewa seharusnya diisi dengan senyum, bukan rasa khawatir.</p></div>
            <div className="service-grid">
              {services.map(({ icon: Icon, title, text }, index) => (
                <article className={`service-card reveal scale-in reveal-delay-${Math.min(index + 1, 5)}`} ref={serviceCardRefs[index]} key={title}>
                  <div className="service-icon"><Icon size={22} /></div>
                  <span className="service-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="packages section-padding section-light" id="packages">
          <div className="content-width">
            <div className="center-heading reveal" ref={packagesHeadingRef}><p className="section-kicker">Temukan yang cocok</p><h2>Pilih paket wisudamu.</h2><p>Semua dirancang agar kamu bisa hadir sepenuhnya di momen yang paling berarti.</p></div>
            <div className="package-grid">
              {packages.map((item, index) => (
                <article className={`package-card ${item.featured ? 'featured' : ''} reveal reveal-delay-${index + 1}`} ref={packageCardRefs[index]} key={item.name}>
                  {item.featured && <div className="popular-label">Paling populer</div>}
                  <p className="package-label">0{index + 1} / package</p>
                  <h3>{item.name}</h3>
                  <p className="package-description">{item.description}</p>
                  <div className="package-divider" />
                  <ul>{item.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
                  <button className={`button ${item.featured ? 'button-primary' : 'button-outline'}`} onClick={() => setSelectedPackage(item.name)}>Pilih paket <ArrowRight size={17} /></button>
                </article>
              ))}
            </div>
            <p className="package-footnote reveal" ref={packagesFootnoteRef}>Butuh sesuatu yang lebih personal? <a href="#booking">Konsultasikan kebutuhanmu <ArrowRight size={14} /></a></p>
          </div>
        </section>

        <section className="steps section-padding" id="how-it-works">
          <div className="content-width">
            <div className="center-heading reveal" ref={stepsHeadingRef}><p className="section-kicker">Semudah itu</p><h2>Siap menikmati hari H?</h2><p>Tiga langkah sederhana untuk membuat hari wisudamu terasa lebih ringan.</p></div>
            <div className="steps-grid">
              {steps.map(([number, title, text], index) => (
                <div className={`step reveal reveal-delay-${index + 1}`} ref={stepRefs[index]} key={number}>
                  <div className="step-top"><span>{number}</span>{index < 2 && <div className="step-line" />}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="location section-padding section-light">
          <div className="content-width location-grid">
            <div className="location-art reveal from-left" ref={locationArtRef}>
              <div className="location-stamp"><MapPin size={20} /><span>Made with care</span></div>
              <div className="location-script">your<br /><strong>special day</strong></div>
              <Heart className="location-heart" size={42} fill="currentColor" />
            </div>
            <div className="location-copy reveal from-right reveal-delay" ref={locationCopyRef}>
              <p className="section-kicker">Hadir di hari wisudamu</p>
              <h2>Berangkat dari hati,<br /><span>hadir di dekatmu.</span></h2>
              <p>Kami melayani pendampingan wisuda di Solo Raya, Yogyakarta, dan sekitarnya.</p>
              <div className="location-list"><span><Check size={16} /> Solo Raya</span><span><Check size={16} /> Yogyakarta & sekitarnya</span><span><Check size={16} /> Bisa konsultasi area lain</span></div>
            </div>
          </div>
        </section>

        <section className="faq section-padding" id="faq">
          <div className="narrow-content">
            <div className="center-heading reveal" ref={faqHeadingRef}><p className="section-kicker">Punya pertanyaan?</p><h2>Kami jawab dengan senang hati.</h2></div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div className={`faq-item reveal reveal-delay-${Math.min(index + 1, 5)} ${openFaq === index ? 'open' : ''}`} ref={faqItemRefs[index]} key={question}>
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><ChevronDown size={19} /></button>
                  {openFaq === index && <p>{answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta section-padding" id="booking">
          <div className="final-cta-inner reveal" ref={finalCtaRef}>
            <div className="eyebrow"><Heart size={15} fill="currentColor" /> Your day, your story</div>
            <h2>Satu hari.<br /><em>Satu pencapaian.<br />Banyak kenangan.</em></h2>
            <p>Siap menikmati wisudamu tanpa beban?</p>
            <a className="button button-light" href="#packages">Booking GradsmateAssist <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="content-width footer-inner"><a className="brand" href="#home"><img className="brand-logo footer-logo" src="/Salinan_dari_Teks_paragraf_Anda_(5).png" alt="GradsmateAssist" /></a><div className="footer-links"><a href="#home">Beranda</a><a href="#packages">Paket</a><a href="#how-it-works">Cara kerja</a><a href="#faq">Tanya jawab</a></div><p>© 2026 GradsmateAssist. Dibuat untuk momen yang berarti.</p></div></footer>

      {selectedPackage && <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="booking-modal"><button className="modal-close" onClick={() => setSelectedPackage(null)} aria-label="Tutup"><X size={20} /></button><div className="modal-icon"><Heart size={22} fill="currentColor" /></div><p className="section-kicker">Pilihan yang manis</p><h2>{selectedPackage}</h2><p>Kami siap membantu membuat hari wisudamu terasa lebih ringan. Hubungi kami untuk cek ketersediaan dan detail paket.</p><a className="button button-primary" href="https://wa.me/6280000000000" target="_blank" rel="noreferrer">Chat untuk booking <MessageCircle size={18} /></a></div></div>}
    </div>
  );
}

export default App;
