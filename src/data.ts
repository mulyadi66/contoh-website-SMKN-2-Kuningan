export interface Major {
  id: string;
  name: string;
  shortName: string;
  description: string;
  prospects: string[];
  iconName: string; // Used to determine Lucide icon
  skills: string[];
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'praktik' | 'kegiatan' | 'prestasi' | 'sarana';
  imageUrl: string;
  description: string;
}

export interface Testimony {
  id: string;
  name: string;
  role: string;
  gradYear: string;
  text: string;
  avatarUrl: string;
}

export const SCHOOL_PROFILE = {
  name: "SMK Negeri 2 Kuningan",
  tagline: "Unggul, Berkarakter, Berdaya Saing Global, dan Berwawasan Lingkungan",
  aboutShort: "SMK Negeri 2 Kuningan adalah salah satu Sekolah Menengah Kejuruan negeri unggulan dan favorit di Kabupaten Kuningan, Jawa Barat. Kami berkomitmen menyelenggarakan pendidikan vokasi yang berkualitas guna menghasilkan lulusan yang kompeten, berakhlak mulia, siap kerja, cerdas, kompetitif, serta peduli terhadap lingkungan.",
  aboutLong: "Didirikan dengan semangat mencerdaskan kehidupan bangsa, SMK Negeri 2 Kuningan terus bertransformasi menjadi pusat pendidikan kejuruan yang modern. Sekolah kami dilengkapi dengan sarana pembelajaran berstandar industri (Teaching Factory), tenaga pendidik yang profesional dan tersertifikasi, serta jaringan kemitraan yang luas dengan Dunia Usaha, Dunia Industri, dan Dunia Kerja (DUDIKA). Kami berfokus pada pengembangan hard skills sekaligus soft skills melalui penguatan karakter profil pelajar Pancasila.",
  stats: [
    { label: "Siswa Aktif", value: "1,800+" },
    { label: "Program Keahlian", value: "6 Bidang" },
    { label: "Guru & Staf", value: "110+" },
    { label: "Kemitraan Industri", value: "75+" }
  ],
  contact: {
    address: "Jl. Sukamulya No.2, Sukamulya, Kec. Cigugur, Kabupaten Kuningan, Jawa Barat 45552",
    phone: "(0232) 871013",
    email: "info@smkn2kuningan.sch.id",
    workingHours: "Senin - Jumat: 07:00 - 15:30 WIB",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m17!1m12!1m3!1d3960.2798606411105!2d108.47355037591605!3d-6.976214568311634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTgnMzQuNCJTIDEwOMKwMjgnMzQuMSJF!5e0!3m2!1sid!2sid!4v1711200000000!5m2!1sid!2sid"
  }
};

export const VISI_MISI = {
  visi: "Menjadi Sekolah Menengah Kejuruan yang menghasilkan lulusan unggul, berkarakter, mandiri, peduli lingkungan, dan mampu bersaing di tingkat nasional maupun internasional.",
  misi: [
    "Melaksanakan sistem pembelajaran yang inovatif berbasis industri dan teknologi informasi guna mewujudkan kecakapan abad 21.",
    "Menanamkan karakter budi pekerti luhur, kedisiplinan, etos kerja tinggi, serta nilai-nilai keagamaan dalam kehidupan sehari-hari.",
    "Meningkatkan kompetensi pendidik dan tenaga kependidikan sesuai standar perkembangan sains, teknologi, dan industri modern.",
    "Mengembangkan kemitraan yang luas dan erat dengan Dunia Usaha, Dunia Industri, dan Dunia Kerja (DUDIKA) untuk penyerapan lulusan yang optimal.",
    "Mewujudkan lingkungan sekolah yang bersih, sehat, rindang, aman, dan kondusif untuk pelestarian fungsi lingkungan hidup."
  ],
  tujuan: [
    "Menghasilkan lulusan yang bertakwa kepada Tuhan Yang Maha Esa dan berakhlak mulia.",
    "Menyiapkan tenaga kerja tingkat menengah yang profesional untuk mengisi kebutuhan industri.",
    "Membekali peserta didik dengan kecakapan wirausaha (entrepreneurship) agar mampu mandiri.",
    "Mempersiapkan lulusan yang memiliki fondasi akademis kuat untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.",
    "Mengembangkan sikap peduli lingkungan, mencegah pencemaran, dan meminimalkan kerusakan alam sekitar sekolah."
  ]
};

export const MAJORS: Major[] = [
  {
    id: "akl",
    name: "Akuntansi dan Keuangan Lembaga",
    shortName: "AKL",
    description: "Membekali peserta didik dengan pengetahuan dan keterampilan akuntansi manual maupun komputerisasi, pengelolaan keuangan, perpajakan, serta aplikasi perbankan modern.",
    iconName: "Calculator",
    skills: [
      "Sistem Akuntansi Keuangan Manual & Komputer",
      "Perpajakan (Pajak Penghasilan, PPN, dll)",
      "Penggunaan Software Akuntansi (MYOB, Spreadsheet)",
      "Akuntansi Perbankan & Lembaga Keuangan",
      "Pengelolaan Kas, Piutang, dan Inventaris"
    ],
    prospects: [
      "Staf Akuntansi / Accounting Officer",
      "Staf Administrasi Keuangan",
      "Kasir & Teller Perbankan",
      "Asisten Akuntan Publik",
      "Konsultan Pajak Muda"
    ]
  },
  {
    id: "mplb",
    name: "Manajemen Perkantoran dan Layanan Bisnis",
    shortName: "MPLB",
    description: "Mempelajari kompetensi pengelolaan administrasi kantor modern, korespondensi bisnis digital, kearsipan elektronik, rapat/konferensi, dan pelayanan prima kepada pelanggan.",
    iconName: "Briefcase",
    skills: [
      "Manajemen Administrasi Perkantoran Digital",
      "Kearsipan Elektronik & Cloud Storage",
      "Korespondensi Bahasa Indonesia & Inggris",
      "Customer Service & Public Relations",
      "Pengoperasian Peralatan Kantor Modern"
    ],
    prospects: [
      "Sekretaris / Administrative Assistant",
      "Resepsionis / Front Desk Agent",
      "Staf Personalia (HRD Admin)",
      "Arsiparis Digital",
      "Customer Relations Officer"
    ]
  },
  {
    id: "pm",
    name: "Pemasaran",
    shortName: "PM",
    description: "Mengembangkan keahlian siswa dalam perencanaan pemasaran produk, pengelolaan ritel modern, komunikasi penjualan, serta penguasaan e-commerce dan digital marketing.",
    iconName: "TrendingUp",
    skills: [
      "Digital Marketing & Social Media Strategist",
      "Desain Visual Iklan & Copywriting",
      "Manajemen Bisnis Ritel & Visual Merchandising",
      "Teknik Negosiasi & Komunikasi Penjualan",
      "Analisis Pasar & E-Commerce Operation"
    ],
    prospects: [
      "Digital Marketer / Content Creator",
      "Store Manager Ritel",
      "Sales Executive / Promotor",
      "Wirausahawan Mandiri (E-Commerce)",
      "Customer Service Supervisor"
    ]
  },
  {
    id: "pplg",
    name: "Pemograman Perangkat Lunak dan Gim",
    shortName: "PPLG",
    description: "Membekali peserta didik dengan keterampilan pengembangan perangkat lunak mulai dari pembuatan aplikasi web, aplikasi mobile, pengelolaan basis data, hingga pembuatan gim interaktif 2D/3D berstandar industri.",
    iconName: "Code",
    skills: [
      "Pemrograman Berorientasi Objek (OOP)",
      "Pemrograman Web Dinamis (React, Laravel, Node.js)",
      "Pengembangan Aplikasi Mobile (Android/iOS)",
      "Perancangan Basis Data & Cloud Computing",
      "Desain & Pengembangan Game (Unity, Godot)"
    ],
    prospects: [
      "Software Engineer / Web Developer",
      "Mobile Application Developer",
      "Game Developer / Game Designer",
      "Database Administrator",
      "IT Consultant / Quality Assurance"
    ]
  },
  {
    id: "tjkt",
    name: "Teknik Jaringan Komputer dan Telekomunikasi",
    shortName: "TJKT",
    description: "Mempelajari rancang bangun jaringan komputer, instalasi jaringan nirkabel (wireless), keamanan jaringan, administrasi server Linux/Windows, serta teknologi cloud networking dan telekomunikasi modern.",
    iconName: "Network",
    skills: [
      "Instalasi & Konfigurasi Jaringan (Cisco, Mikrotik)",
      "Administrasi Sistem Jaringan (Linux/Windows Server)",
      "Cyber Security & Network Defense",
      "Fiber Optic & Wireless Communication",
      "Cloud Infrastructure & Virtualization"
    ],
    prospects: [
      "Network Engineer / Network Administrator",
      "System Administrator / DevOps",
      "Cyber Security Specialist",
      "Technical Support / IT Support",
      "Wireless & Fiber Optic Technician"
    ]
  },
  {
    id: "ulw",
    name: "Usaha Layanan Wisata",
    shortName: "ULW",
    description: "Membekali kompetensi di bidang industri pariwisata seperti pemanduan wisata (guiding), reservasi tiket pesawat/kereta, perencanaan paket wisata menarik, serta pengelolaan event (MICE).",
    iconName: "Compass",
    skills: [
      "Pemanduan Wisata (Tour Guiding)",
      "Perencanaan & Perhitungan Tarif Paket Wisata",
      "Reservasi Tiket Elektronik (Global Distribution System)",
      "Pengelolaan Acara / Event Management (MICE)",
      "Kecakapan Bahasa Asing Pariwisata"
    ],
    prospects: [
      "Tour Guide / Pemandu Wisata",
      "Travel Consultant / Ticketing Officer",
      "Tour Leader (Pemimpin Perjalanan)",
      "Event Organizer Staff",
      "Staf Dinas Pariwisata"
    ]
  }
];

export const FACILITIES: Facility[] = [
  {
    id: "lab_komp",
    name: "Laboratorium Komputer Modern",
    description: "Dilengkapi dengan PC berspesifikasi tinggi, koneksi internet berkecepatan tinggi, dan software berlisensi untuk menunjang praktikum seluruh program keahlian.",
    iconName: "Laptop"
  },
  {
    id: "edotel",
    name: "Edotel (Hotel Training)",
    description: "Fasilitas hotel pelatihan mandiri dengan standar kamar hotel berbintang. Berfungsi sebagai laboratorium praktik nyata siswa Program Keahlian Perhotelan.",
    iconName: "Hotel"
  },
  {
    id: "restoran",
    name: "Restoran & Kitchen Lab",
    description: "Laboratorium praktik tata boga dengan peralatan dapur standar restoran profesional untuk mengasah keahlian kuliner Nusantara dan internasional.",
    iconName: "Flame"
  },
  {
    id: "perpus",
    name: "Perpustakaan Digital",
    description: "Menyediakan ribuan koleksi buku cetak, e-book, jurnal ilmiah, dan komputer riset untuk memfasilitasi kebutuhan literasi warga sekolah.",
    iconName: "BookOpen"
  },
  {
    id: "lapangan",
    name: "Lapangan Olahraga Luas",
    description: "Sarana olahraga serbaguna outdoor dan indoor yang representatif untuk cabang olahraga Basket, Futsal, Voli, Bulutangkis, dan Senam.",
    iconName: "Award"
  },
  {
    id: "masjid",
    name: "Masjid Al-Kautsar",
    description: "Pusat kegiatan keagamaan dan pembinaan kerohanian Islam yang luas, bersih, dan nyaman bagi seluruh guru dan siswa.",
    iconName: "Heart"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal_1",
    title: "Praktik Tata Hidang Siswa Kuliner",
    category: "praktik",
    imageUrl: "https://picsum.photos/seed/culinary/800/600",
    description: "Siswa Program Keahlian Kuliner sedang melakukan simulasi fine dining di Restoran Praktik Sekolah."
  },
  {
    id: "gal_2",
    title: "Simulasi Front Office di Edotel",
    category: "praktik",
    imageUrl: "https://picsum.photos/seed/receptionist/800/600",
    description: "Siswa Perhotelan melayani tamu dengan ramah sesuai standar hospitality di lobby Edotel."
  },
  {
    id: "gal_3",
    title: "Upacara Peringatan Hari Kemerdekaan",
    category: "kegiatan",
    imageUrl: "https://picsum.photos/seed/ceremony/800/600",
    description: "Khidmatnya barisan Paskibra SMKN 2 Kuningan dalam pengibaran bendera Merah Putih."
  },
  {
    id: "gal_4",
    title: "Pembelajaran Berbasis Komputer",
    category: "praktik",
    imageUrl: "https://picsum.photos/seed/computer_lab/800/600",
    description: "Siswa melakukan analisis data keuangan digital di Laboratorium Komputer Akuntansi."
  },
  {
    id: "gal_5",
    title: "Prestasi Juara LKS Tingkat Provinsi",
    category: "prestasi",
    imageUrl: "https://picsum.photos/seed/trophy/800/600",
    description: "Siswa perwakilan sekolah menyabet medali emas pada Lomba Kompetensi Siswa (LKS) bidang Perhotelan."
  },
  {
    id: "gal_6",
    title: "Fasilitas Kelas Modern & Nyaman",
    category: "sarana",
    imageUrl: "https://picsum.photos/seed/classroom/800/600",
    description: "Ruang kelas teori yang sejuk dan dilengkapi dengan proyektor interaktif untuk pembelajaran efektif."
  }
];

export const TESTIMONIALS: Testimony[] = [
  {
    id: "test_1",
    name: "Rian Hidayat, A.Md.",
    role: "Front Office Supervisor di Hotel Grand Preanger Bandung",
    gradYear: "Lulusan 2021",
    text: "Belajar di SMKN 2 Kuningan memberikan saya landasan hospitality yang sangat kuat. Praktik langsung di Edotel sekolah membuat saya tidak kaget lagi saat terjun langsung ke industri hotel berbintang.",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "test_2",
    name: "Siti Nurhaliza",
    role: "Staf Accounting di Bank Rakyat Indonesia (BRI)",
    gradYear: "Lulusan 2020",
    text: "Sertifikasi kompetensi MYOB dan bimbingan karir yang intensif di sekolah sangat mempermudah saya dalam lolos seleksi kerja. Guru-gurunya sangat suportif dan selalu mendidik dengan kesabaran luar biasa.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "test_3",
    name: "Ahmad Maulana",
    role: "Owner 'Kuningan Kulineran' & Creative Entrepreneur",
    gradYear: "Lulusan 2019",
    text: "Berkat program kewirausahaan di Jurusan Pemasaran, saya bisa membangun bisnis makanan olahan sendiri setelah lulus. Pelajaran pemasaran digital yang saya peroleh benar-benar diaplikasikan setiap hari!",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  }
];
