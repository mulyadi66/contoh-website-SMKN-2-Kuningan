import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  Briefcase,
  TrendingUp,
  Hotel,
  Utensils,
  Compass,
  Laptop,
  Flame,
  BookOpen,
  Award,
  Heart,
  MapPin,
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Send,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  School,
  ExternalLink,
  ChevronDown,
  Info,
  Building2,
  ThumbsUp,
  Check,
  Search,
  Code,
  Network,
} from 'lucide-react';

import {
  SCHOOL_PROFILE,
  VISI_MISI,
  MAJORS,
  FACILITIES,
  GALLERY_ITEMS,
  TESTIMONIALS,
  Major,
  GalleryItem
} from './data';

// Dynamic icon helper to render Lucide icons by name
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Calculator': return <Calculator className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Hotel': return <Hotel className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Laptop': return <Laptop className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Award': return <Award className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'School': return <School className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Network': return <Network className={className} />;
    default: return <Info className={className} />;
  }
};

export default function App() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  // Interactive Content States
  const [visionTab, setVisionTab] = useState<'visi-misi' | 'tujuan'>('visi-misi');
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [galleryCategory, setGalleryCategory] = useState<string>('Semua');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    majorId: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedMessages, setSubmittedMessages] = useState<any[]>([]);

  // Track page scroll to apply styling to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Basic scroll spy for active section
      const sections = ['beranda', 'tentang', 'visi-misi', 'program', 'fasilitas', 'galeri', 'testimoni', 'kontak'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load sent messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('smkn2_messages');
    if (saved) {
      try {
        setSubmittedMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const newMessage = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newMessage, ...submittedMessages];
      setSubmittedMessages(updated);
      localStorage.setItem('smkn2_messages', JSON.stringify(updated));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        majorId: '',
        message: ''
      });

      // Hide success notification after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  const deleteMessage = (id: string) => {
    const updated = submittedMessages.filter(msg => msg.id !== id);
    setSubmittedMessages(updated);
    localStorage.setItem('smkn2_messages', JSON.stringify(updated));
  };

  // Filtered items
  const filteredMajors = MAJORS.filter(major =>
    major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    major.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    major.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGallery = galleryCategory === 'Semua'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === galleryCategory.toLowerCase());

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'visi-misi', label: 'Visi & Misi' },
    { id: 'program', label: 'Program Keahlian' },
    { id: 'fasilitas', label: 'Fasilitas' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'kontak', label: 'Kontak' }
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* HEADER / NAVIGATION */}
      <header
        id="app_header"
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-slate-100'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo & School Name */}
          <button
            id="nav_logo_btn"
            onClick={() => scrollToSection('beranda')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            {/* Elegant Modern Logo Placeholder */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <School className="h-6 w-6 text-white" />
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan-400 animate-pulse border-2 border-white" />
            </div>
            <div>
              <h1 className={`font-display font-extrabold tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                SMK Negeri 2
              </h1>
              <p className={`font-sans text-xs font-semibold tracking-wider uppercase transition-colors ${isScrolled ? 'text-blue-600' : 'text-blue-200'}`}>
                Kuningan
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop_nav" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav_link_${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 focus:outline-none ${
                  activeSection === link.id
                    ? isScrolled
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'bg-white/20 text-white font-semibold'
                    : isScrolled
                    ? 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Button & Hamburger */}
          <div className="flex items-center gap-3">
            <button
              id="cta_nav_btn"
              onClick={() => scrollToSection('kontak')}
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 hover:shadow-cyan-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile_menu_toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl lg:hidden transition-colors ${
                isScrolled
                  ? 'text-slate-800 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile_drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    id={`mobile_link_${link.id}`}
                    onClick={() => scrollToSection(link.id)}
                    className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      activeSection === link.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </button>
                ))}
                <button
                  id="mobile_cta_nav_btn"
                  onClick={() => scrollToSection('kontak')}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3.5 text-center text-base font-bold text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-800 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Kirim Pesan / Hubungi Kami</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* BERANDA / HERO SECTION */}
      <section
        id="beranda"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 pt-20"
      >
        {/* Background Image with Rich Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/school_red_campus_hero_1784429551034.jpg"
            alt="SMK Negeri 2 Kuningan Campus"
            className="h-full w-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-blue-950/40" />
          
          {/* Ambient Lighting Accents */}
          <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Accreditation & Badge Highlight */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider text-cyan-300 backdrop-blur-md uppercase mb-8 border border-white/10">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Terakreditasi A (Sangat Baik)</span>
            </div>

            {/* School Name and Tagline */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Selamat Datang di
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                {SCHOOL_PROFILE.name}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl font-normal leading-relaxed">
              &ldquo;{SCHOOL_PROFILE.tagline}&rdquo;
            </p>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
              <button
                id="hero_btn_kenali"
                onClick={() => scrollToSection('tentang')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-blue-900 shadow-xl hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Kenali Kami</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              
              <button
                id="hero_btn_program"
                onClick={() => scrollToSection('program')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-8 py-4 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Program Keahlian</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Statistics Panel overlapping Hero */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 px-4 max-w-6xl mx-auto hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-lg border border-white/40">
            {SCHOOL_PROFILE.stats.map((stat, idx) => (
              <div key={idx} className="text-center p-2 border-r last:border-0 border-slate-200/50">
                <span className="block font-display text-3xl lg:text-4xl font-black text-blue-700 tracking-tight">
                  {stat.value}
                </span>
                <span className="block mt-1.5 text-xs lg:text-sm font-bold tracking-wider text-slate-500 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE STATS (Visible only on small screens) */}
      <section className="bg-white py-12 px-4 md:hidden border-b border-slate-100 shadow-inner">
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          {SCHOOL_PROFILE.stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-5 text-center shadow-sm border border-slate-100">
              <span className="block font-display text-3xl font-black text-blue-700 tracking-tight">
                {stat.value}
              </span>
              <span className="block mt-1 text-xs font-bold tracking-wider text-slate-500 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TENTANG SEKOLAH SECTION */}
      <section id="tentang" className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200">
                <img
                  src="/src/assets/images/school_red_campus_hero_1784429551034.jpg"
                  alt="Siswa SMK Negeri 2 Kuningan Praktikum"
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Decorative overlay tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl text-white flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Laptop className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-cyan-300">Sarana Praktik Mandiri</span>
                    <span className="block text-sm font-semibold mt-0.5 text-slate-100">Standar Industri & DUDIKA</span>
                  </div>
                </div>
              </div>
              
              {/* Back decorative glowing shapes */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-2xl -z-0 rotate-12" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-100 rounded-full -z-0 blur-xl" />
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm tracking-wider uppercase">
                <Building2 className="h-5 w-5" />
                <span>Kenali Lebih Dekat</span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Mempersiapkan Generasi Unggul Siap Kerja & Mandiri
              </h2>
              
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {SCHOOL_PROFILE.aboutShort}
              </p>

              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/60 text-slate-700 text-sm sm:text-base leading-relaxed italic relative">
                <span className="absolute -top-3 left-4 bg-blue-600 text-white rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wide">
                  Sambutan Kepala Sekolah
                </span>
                <p className="mt-1.5">
                  &ldquo;Selamat datang di platform informasi digital resmi SMK Negeri 2 Kuningan. Kami bertekad mewujudkan sekolah yang tidak hanya unggul di bidang akademis dan kompetensi keahlian kejuruan, namun juga kokoh dalam pembentukan karakter luhur dan berwawasan pelestarian lingkungan hidup.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    LS
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Drs. H. Luqman, M.Pd.</span>
                    <span className="block text-[10px] text-slate-500 font-medium">Kepala Sekolah SMK Negeri 2 Kuningan</span>
                  </div>
                </div>
              </div>

              {/* Collapsible expansion */}
              <details className="group border border-slate-100 rounded-xl bg-slate-50 overflow-hidden transition-all duration-300">
                <summary className="flex items-center justify-between p-4 font-semibold text-slate-800 cursor-pointer hover:bg-slate-100 list-none">
                  <span className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span>Baca Selengkapnya Tentang Sejarah & Komitmen</span>
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-4 pt-0 border-t border-slate-100 text-slate-600 text-sm leading-relaxed space-y-3">
                  <p className="mt-3">{SCHOOL_PROFILE.aboutLong}</p>
                  <p>Kurikulum kami disesuaikan erat dengan kebutuhan industri modern, memungkinkan lulusan kami mendapatkan jaminan kualitas keahlian dan siap berkontribusi secara nyata di pasar global maupun nasional.</p>
                </div>
              </details>

            </div>

          </div>

        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section id="visi-misi" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
        {/* Visual elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl -z-0" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase">
              Landasan & Arah
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Visi, Misi, dan Tujuan Sekolah
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Prinsip-prinsip utama yang menjadi panduan kami dalam menyelenggarakan proses pendidikan berkualitas tinggi bagi setiap peserta didik.
            </p>

            {/* Toggle tabs for interactions */}
            <div className="mt-8 inline-flex p-1 bg-slate-200/70 rounded-full border border-slate-200">
              <button
                id="tab_visi"
                onClick={() => setVisionTab('visi-misi')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                  visionTab === 'visi-misi'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Visi & Misi
              </button>
              <button
                id="tab_tujuan"
                onClick={() => setVisionTab('tujuan')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                  visionTab === 'tujuan'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tujuan Strategis
              </button>
            </div>
          </div>

          {/* Tab Content 1: Visi & Misi */}
          <AnimatePresence mode="wait">
            {visionTab === 'visi-misi' ? (
              <motion.div
                key="visi-misi-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Vision Box */}
                <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md text-cyan-300">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-black tracking-tight text-white uppercase">
                      Visi Sekolah
                    </h3>
                    <p className="mt-6 text-lg sm:text-xl font-medium leading-relaxed text-blue-50 italic">
                      &ldquo;{VISI_MISI.visi}&rdquo;
                    </p>
                  </div>
                  <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-300 uppercase tracking-widest">
                    <span>SMK Bisa! SMK Hebat!</span>
                    <span>SMKN 2 Kuningan</span>
                  </div>
                </div>

                {/* Mission Box */}
                <div className="lg:col-span-7 rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-slate-200/60 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-blue-600" />
                      <span>Misi Sekolah</span>
                    </h3>
                    <div className="mt-6 space-y-4">
                      {VISI_MISI.misi.map((misiStr, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                            {idx + 1}
                          </span>
                          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                            {misiStr}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Tab Content 2: Tujuan Strategis */
              <motion.div
                key="tujuan-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto rounded-3xl bg-white p-8 sm:p-12 shadow-xl border border-slate-200/60"
              >
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-700">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-slate-900 uppercase tracking-tight">
                      Tujuan Strategis Pendidikan
                    </h3>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-0.5">SMK Negeri 2 Kuningan</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {VISI_MISI.tujuan.map((tujuanStr, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 transition-all border border-slate-100 flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">
                        {idx + 1}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {tujuanStr}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* PROGRAM KEAHLIAN (MAJORS) SECTION */}
      <section id="program" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold tracking-wider text-cyan-800 uppercase">
                Pendidikan Kejuruan
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Program Keahlian Terakreditasi
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Pilihlah keahlian masa depanmu. Kami menyelenggarakan 6 program keahlian unggulan dengan penyerapan lulusan yang luar biasa di berbagai industri.
              </p>
            </div>

            {/* Interactive Search Bar for Majors */}
            <div className="relative w-full md:max-w-xs">
              <input
                id="search_majors_input"
                type="text"
                placeholder="Cari program keahlian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              {searchQuery && (
                <button
                  id="clear_search_btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Batal
                </button>
              )}
            </div>
          </div>

          {/* Majors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMajors.length > 0 ? (
              filteredMajors.map((major) => (
                <motion.div
                  key={major.id}
                  layoutId={`major_card_${major.id}`}
                  className="group flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 shadow-md hover:shadow-xl border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Icon & Shortname Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconComponent name={major.iconName} className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                        {major.shortName}
                      </span>
                    </div>

                    {/* Major Name */}
                    <h3 className="mt-6 font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {major.name}
                    </h3>

                    {/* Short description */}
                    <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {major.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      {major.skills.length} Materi Utama
                    </span>
                    <button
                      id={`btn_detail_${major.id}`}
                      onClick={() => setSelectedMajor(major)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors focus:outline-none cursor-pointer"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Info className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                <p className="font-bold text-slate-600">Tidak menemukan program keahlian &ldquo;{searchQuery}&rdquo;</p>
                <button
                  id="reset_search_btn"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 inline-flex items-center text-sm font-bold text-blue-600 hover:underline"
                >
                  Tampilkan semua program keahlian
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* DETAIL MAJOR DIALOG MODAL (INTERACTIVE DRAWER) */}
      <AnimatePresence>
        {selectedMajor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Overlay */}
            <motion.div
              id="modal_backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMajor(null)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              id="major_detail_modal"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl z-10"
            >
              
              {/* Top Banner Gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white relative">
                <button
                  id="close_major_modal"
                  onClick={() => setSelectedMajor(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md text-white">
                    <IconComponent name={selectedMajor.iconName} className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="inline-block bg-white/20 text-white text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded uppercase">
                      Jurusan {selectedMajor.shortName}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold mt-1 tracking-tight">
                      {selectedMajor.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deskripsi Program</h4>
                  <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {selectedMajor.description}
                  </p>
                </div>

                {/* Skills taught */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 mb-3">
                      <Check className="h-4 w-4" />
                      <span>Kompetensi Keahlian</span>
                    </h5>
                    <ul className="space-y-2">
                      {selectedMajor.skills.map((skill, index) => (
                        <li key={index} className="flex gap-2 text-xs font-semibold text-slate-600">
                          <ChevronRight className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Career Prospects */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 mb-3">
                      <Briefcase className="h-4 w-4" />
                      <span>Prospek Karir Alumni</span>
                    </h5>
                    <ul className="space-y-2">
                      {selectedMajor.prospects.map((prospect, index) => (
                        <li key={index} className="flex gap-2 text-xs font-semibold text-slate-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{prospect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  id="close_major_modal_footer_btn"
                  onClick={() => setSelectedMajor(null)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-xl transition-all cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  id="major_modal_cta_btn"
                  onClick={() => {
                    setSelectedMajor(null);
                    scrollToSection('kontak');
                  }}
                  className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Daftar / Konsultasi</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FASILITAS SEKOLAH SECTION */}
      <section id="fasilitas" className="py-24 sm:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold tracking-wider text-indigo-700 uppercase">
              Sarana Prasarana
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Fasilitas Pendukung Belajar Terbaik
            </h2>
            <p className="mt-4 text-base text-slate-600">
              SMK Negeri 2 Kuningan menyediakan infrastruktur yang representatif dan berstandar industri guna menjamin kenyamanan dan kesuksesan proses praktik siswa.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/50 hover:border-blue-200 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <IconComponent name={facility.iconName} className="h-6 w-6" />
                </div>
                
                <h3 className="mt-6 font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {facility.name}
                </h3>
                
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* GALERI FOTO SECTION */}
      <section id="galeri" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase">
              Dokumentasi Kegiatan
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Galeri Foto Sekolah
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Uraian visual mengenai kesibukan belajar, praktik kejuruan, momentum berharga, serta pencapaian prestasi siswa-siswi kami.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-xl mx-auto">
            {['Semua', 'Praktik', 'Kegiatan', 'Prestasi', 'Sarana'].map((cat) => (
              <button
                key={cat}
                id={`filter_cat_${cat.toLowerCase()}`}
                onClick={() => setGalleryCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                  galleryCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md cursor-pointer border border-slate-100"
                onClick={() => setLightboxImage(item)}
              >
                {/* 4:3 Image container */}
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Cover Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-white font-display font-bold text-base mt-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-200 text-xs mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Fallback Static Title for mobile/non-hover screens */}
                <div className="p-4 bg-white border-t border-slate-100 group-hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                      {item.category}
                    </span>
                    <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm mt-1 truncate">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL FOR GALERI */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            
            <button
              id="close_lightbox"
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close Gallery Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              id="gallery_lightbox_box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col"
            >
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="w-full max-h-[70vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />

              {/* Bottom bar of lightbox */}
              <div className="bg-slate-950 p-6 text-white border-t border-slate-800">
                <span className="inline-block bg-blue-600 text-white text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-md uppercase mb-2">
                  Kategori: {lightboxImage.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white">
                  {lightboxImage.title}
                </h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                  {lightboxImage.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TESTIMONI ALUMNI SECTION */}
      <section id="testimoni" className="py-24 sm:py-32 bg-slate-50 overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold tracking-wider text-cyan-700 uppercase">
              Kisah Sukses Alumni
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Apa Kata Alumni Kami?
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Pengalaman nyata lulusan SMK Negeri 2 Kuningan dalam menembus dunia kerja, mengembangkan bisnis, dan merajut cita-cita gemilang mereka.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/50 shadow-md relative"
              >
                {/* Quotation icon */}
                <div className="absolute top-6 right-6 text-slate-100">
                  <MessageSquare className="h-12 w-12 stroke-2 opacity-15" />
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic relative z-10 font-normal">
                  &ldquo;{test.text}&rdquo;
                </p>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                  <img
                    src={test.avatarUrl}
                    alt={test.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-blue-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{test.name}</h4>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">{test.role}</p>
                    <span className="inline-block bg-slate-100 text-slate-500 font-bold text-[9px] px-1.5 py-0.5 rounded-md uppercase mt-1">
                      {test.gradYear}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* KONTAK SECTION & FUNCTIONAL INTERACTION */}
      <section id="kontak" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Contact Information & Map (Left Column) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase">
                  Hubungi Kami
                </span>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Hubungi SMK Negeri 2 Kuningan
                </h2>
                <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
                  Kami selalu terbuka untuk menjalin kerjasama, menampung pertanyaan pendaftaran siswa baru (PPDB), ataupun saran dan pengaduan dari masyarakat umum.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                
                {/* Address Card */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Sekolah</h4>
                    <p className="mt-1 text-sm font-semibold text-slate-700 leading-relaxed">
                      {SCHOOL_PROFILE.contact.address}
                    </p>
                  </div>
                </div>

                {/* Telephone Card */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telepon & Fax</h4>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {SCHOOL_PROFILE.contact.phone}
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Resmi</h4>
                    <a
                      id="contact_email_link"
                      href={`mailto:${SCHOOL_PROFILE.contact.email}`}
                      className="mt-1 text-sm font-semibold text-blue-600 hover:underline block"
                    >
                      {SCHOOL_PROFILE.contact.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jam Pelayanan</h4>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {SCHOOL_PROFILE.contact.workingHours}
                    </p>
                  </div>
                </div>

              </div>

              {/* Embedded Google Maps Location */}
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 aspect-[16/9] w-full">
                <iframe
                  id="google_map_frame"
                  title="Peta Lokasi SMK Negeri 2 Kuningan"
                  src={SCHOOL_PROFILE.contact.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </div>

            {/* Interactive Contact Form (Right Column) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-slate-50 p-6 sm:p-8 border border-slate-100 shadow-lg">
                <h3 className="font-display text-2xl font-bold text-slate-900 tracking-tight mb-2">
                  Formulir Kontak & Aspirasi
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-6">Silakan lengkapi formulir di bawah ini untuk mengirimkan aspirasi, pesan, atau pertanyaan kepada humas sekolah.</p>

                {/* Success Alert toast inside form */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      id="contact_success_alert"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm flex gap-3 items-start"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold">Pesan Terkirim Sukses!</span>
                        <span className="block text-xs text-green-700 mt-0.5">Pesan Anda telah kami rekam di penyimpanan lokal simulasi. Terima kasih atas partisipasi Anda!</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form id="contact_school_form" onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name input */}
                    <div>
                      <label htmlFor="form_name" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        required
                        placeholder="Nama Anda"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* Email input */}
                    <div>
                      <label htmlFor="form_email" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        Alamat Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        required
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Subject input */}
                    <div>
                      <label htmlFor="form_subject" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        Subjek Pesan <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form_subject"
                        type="text"
                        name="subject"
                        required
                        placeholder="Contoh: Pertanyaan PPDB"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* Major dropdown query */}
                    <div>
                      <label htmlFor="form_majorId" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        Hubungkan dengan Program Keahlian <span className="text-slate-400">(Opsional)</span>
                      </label>
                      <select
                        id="form_majorId"
                        name="majorId"
                        value={formData.majorId}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                      >
                        <option value="">-- Pilih Program Keahlian --</option>
                        {MAJORS.map(major => (
                          <option key={major.id} value={major.shortName}>
                            {major.name} ({major.shortName})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label htmlFor="form_message" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Isi Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="form_message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tuliskan pesan Anda secara jelas dan lengkap..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit_message_btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-75 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Kirim Pesan Aspirasi</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Simulated Inbox list for active student interaction, demonstrating local state persistence */}
                {submittedMessages.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-display font-bold text-sm text-slate-700 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span>Simulasi Kotak Aspirasi Masuk ({submittedMessages.length})</span>
                      </h4>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded uppercase">
                        Disimpan di LocalStorage
                      </span>
                    </div>

                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                      {submittedMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">{msg.name}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{msg.date}</span>
                              {msg.majorId && (
                                <span className="text-[9px] bg-slate-100 text-slate-600 font-extrabold px-1.5 py-0.5 rounded-sm">
                                  {msg.majorId}
                                </span>
                              )}
                            </div>
                            <span className="block font-bold text-xs text-blue-600 mt-1">{msg.subject}</span>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              &ldquo;{msg.message}&rdquo;
                            </p>
                          </div>
                          
                          <button
                            id={`delete_msg_${msg.id}`}
                            onClick={() => deleteMessage(msg.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer shrink-0"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="app_footer" className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-slate-900">
            
            {/* Column 1: School Identity */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md">
                  <School className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-white text-lg tracking-tight">
                    SMK Negeri 2 Kuningan
                  </h3>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    School Profile Website
                  </span>
                </div>
              </div>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Menyelenggarakan pendidikan vokasi unggul dan berkarakter, menghasilkan lulusan siap kerja di era teknologi modern dengan berwawasan pelestarian alam sekitar.
              </p>

              {/* Social Handles */}
              <div className="flex items-center gap-3 pt-2">
                {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                  <span
                    key={social}
                    className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-blue-400 cursor-pointer transition-all"
                  >
                    {social[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Tautan Cepat</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {navLinks.slice(0, 5).map((link) => (
                  <li key={link.id}>
                    <button
                      id={`footer_link_${link.id}`}
                      onClick={() => scrollToSection(link.id)}
                      className="text-slate-400 hover:text-white transition-colors focus:outline-none"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Secondary Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Lainnya</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {navLinks.slice(5).map((link) => (
                  <li key={link.id}>
                    <button
                      id={`footer_link_${link.id}`}
                      onClick={() => scrollToSection(link.id)}
                      className="text-slate-400 hover:text-white transition-colors focus:outline-none"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <a href="#beranda" className="text-slate-400 hover:text-white transition-colors">
                    Sistem PPDB Online
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Footer Panel */}
            <div className="lg:col-span-4 space-y-4 text-xs sm:text-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Kontak Utama</h4>
              <ul className="space-y-2.5">
                <li className="flex gap-2.5 items-start">
                  <MapPin className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-slate-400 leading-relaxed">
                    {SCHOOL_PROFILE.contact.address}
                  </span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                  <span className="text-slate-400">{SCHOOL_PROFILE.contact.phone}</span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                  <span className="text-slate-400">{SCHOOL_PROFILE.contact.email}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} SMK Negeri 2 Kuningan. Hak Cipta Dilindungi Undang-Undang.
            </p>
            <p className="flex items-center gap-1.5">
              <span>Maju Bersama, Hebat Semua</span>
              <span className="text-red-500">♥</span>
              <span>Kuningan, Jawa Barat</span>
            </p>
          </div>

        </div>
      </footer>

      {/* FLOATING ACTION BUTTON (BACK TO TOP) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          id="btn_back_to_top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-90 hover:scale-105 transition-all cursor-pointer"
          title="Kembali ke Atas"
          aria-label="Back to Top"
        >
          <ChevronDown className="h-5 w-5 rotate-180" />
        </button>
      </div>

    </div>
  );
}
