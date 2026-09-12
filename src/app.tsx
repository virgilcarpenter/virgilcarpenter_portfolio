import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ShieldCheck, 
  Terminal, 
  Bug, 
  Database, 
  Wrench, 
  Users, 
  Cpu, 
  Network, 
  FileText, 
  ArrowUpRight,
  Award,
  Cloud,
  ExternalLink,
  Download,
  Mail,
  Linkedin,
  Menu,
  X
} from 'lucide-react';

type Screen = 'home' | 'about' | 'education' | 'certifications' | 'projects' | 'documents' | 'experience' | 'contact';

const base = import.meta.env.BASE_URL;

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: Screen; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'documents', label: 'Documents' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact Me' },
  ];

  const handleNavigate = (screen: Screen) => {
    setActiveScreen(screen);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50 px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="text-lg font-bold tracking-tighter text-primary cursor-pointer" onClick={() => handleNavigate('home')}>
          Virgil Carpenter
        </div>
        
        <div className="hidden md:flex gap-8 items-center font-sans text-sm font-semibold tracking-tight">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`pb-1 transition-all duration-200 hover:text-primary ${
                activeScreen === item.id 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-primary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-8 pb-12 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-2xl font-bold tracking-tight text-left pb-4 border-b border-outline-variant/30 ${
                    activeScreen === item.id ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Contact Information</p>
              <div className="flex flex-col gap-4">
                <a href="mailto:virgilcarpenter4005@gmail.com" className="text-sm font-medium flex items-center gap-2">
                  <Mail size={16} /> virgilcarpenter4005@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/virgilcarpenter/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-2">
                  <Linkedin size={16} /> LinkedIn Profile
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full overflow-y-auto"
          >
            {activeScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
            {activeScreen === 'about' && <AboutScreen />}
            {activeScreen === 'education' && <EducationScreen />}
            {activeScreen === 'projects' && <ProjectsScreen />}
            {activeScreen === 'documents' && <DocumentsScreen />}
            {activeScreen === 'certifications' && <CertificationsScreen />}
            {activeScreen === 'experience' && <ExperienceScreen />}
            {activeScreen === 'contact' && <ContactScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-outline-variant py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <div className="text-sm font-bold text-primary">Virgil Carpenter</div>
            <p className="text-[10px] text-secondary font-medium uppercase tracking-[0.15em] max-w-xs leading-relaxed">
              © 2026 Virgil Carpenter. All rights reserved. Professional Cybersecurity Portfolio.
            </p>
          </div>
          <div className="flex gap-8 text-[11px] font-medium uppercase tracking-widest text-secondary items-center">
            <a href="mailto:virgilcarpenter4005@gmail.com" className="hover:text-primary underline underline-offset-4 transition-colors flex items-center gap-2">
              <Mail size={12} className="shrink-0" />
              Email
            </a>
            <a href="https://www.linkedin.com/in/virgilcarpenter/" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-4 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div>
      {/* Hero Section */}
      <header className="relative w-full h-[700px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2000&auto=format&fit=crop" 
            alt="Data Center" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl space-y-4">
            <span className="text-on-primary-container font-label text-[14px] uppercase tracking-[0.2em] block mb-4">
              Cybersecurity Student & Technician
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Virgil Carpenter
            </h1>
            <div className="border-l-4 border-on-primary-container pl-6 py-2 max-w-2xl bg-white/5 backdrop-blur-sm rounded-r-lg">
              <p className="text-lg md:text-xl text-secondary-fixed italic leading-relaxed text-on-primary/90">
                "I've always believed that the most important thing in life is to be happy. But I also believe that you can only be truly happy if you are doing what you love."
              </p>
              <cite className="text-[14px] font-medium text-white/60 block mt-4">— Ayrton Senna</cite>
            </div>
            <div className="flex flex-wrap gap-4 pt-8">
              <button 
                onClick={() => onNavigate('projects')}
                className="bg-white text-primary font-label px-8 py-3 rounded hover:bg-secondary-container transition-colors font-semibold"
              >
                View Portfolio
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="border border-white/20 text-white font-label px-8 py-3 rounded hover:bg-white/10 transition-colors font-semibold"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Achievement Bento Grid */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">Achievement Highlights</h2>
            <div className="h-1 w-12 bg-primary"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Certification Card */}
            <div className="md:col-span-8 bg-white border border-outline-variant p-8 rounded shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <span className="text-[12px] font-label text-primary-container bg-primary-fixed px-3 py-1 rounded-full mb-4 inline-block font-bold">CERTIFIED</span>
                  <h3 className="text-2xl font-bold text-primary">CompTIA Security+ 701</h3>
                </div>
                <ShieldCheck size={40} className="text-primary" />
              </div>
              <p className="text-on-surface-variant leading-relaxed max-w-2xl mb-8">
                Foundational cybersecurity certification covering security concepts, threats, vulnerabilities, and incident response. Validating technical skills in securing networks, devices, and data.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/30">
                {['Network Security', 'Threat Intelligence', 'Cryptography'].map(tag => (
                  <span key={tag} className="bg-surface-container text-secondary text-[11px] px-3 py-1 font-bold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>

            {/* Programming Card */}
            <div className="md:col-span-4 bg-white border border-outline-variant p-8 rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-label text-secondary bg-secondary-fixed px-3 py-1 rounded-full mb-4 inline-block font-bold">PROGRAMMING</span>
                <h3 className="text-2xl font-bold text-primary mb-4">Cisco Python Essentials 1</h3>
                <p className="text-on-surface-variant text-sm">Mastery of Python syntax, data structures, and algorithmic logic for automation and security scripting.</p>
              </div>
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-3">
                  <Terminal size={18} className="text-secondary" />
                  <span className="text-sm font-medium">Automation Scripting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Database size={18} className="text-secondary" />
                  <span className="text-sm font-medium">Security Tooling</span>
                </div>
              </div>
            </div>

            {/* Freelance Card */}
            <div className="md:col-span-4 bg-primary text-white p-8 rounded shadow-sm">
              <span className="text-primary-fixed font-label text-[12px] bg-primary-container px-3 py-1 rounded-full mb-4 inline-block font-bold">FREELANCE</span>
              <h3 className="text-2xl font-bold mb-4">IT Repair Technician</h3>
              <ul className="space-y-4 text-on-primary-container/80">
                <li className="flex gap-3 items-start">
                  <Bug size={18} className="text-primary-fixed shrink-0 mt-1" />
                  <span className="text-sm">Malware cleanup, system troubleshooting, and general technical support.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Cpu size={18} className="text-primary-fixed shrink-0 mt-1" />
                  <span className="text-sm">PC builds and upgrades, hardware troubleshooting, and device setup.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Wrench size={18} className="text-primary-fixed shrink-0 mt-1" />
                  <span className="text-sm">Home and small-office network troubleshooting and connectivity support.</span>
                </li>
              </ul>
            </div>

            {/* Labs Card */}
            <div className="md:col-span-4 bg-white border border-outline-variant p-8 rounded shadow-sm">
              <span className="text-[12px] font-label text-primary-container bg-surface-container-highest px-3 py-1 rounded-full mb-4 inline-block font-bold">HANDS-ON</span>
              <h3 className="text-2xl font-bold text-primary mb-6">Hands-On Labs</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-bold text-sm">PXE Deployment Lab</p>
                  <p className="text-xs text-on-surface-variant mt-1">Network troubleshooting and OS deployment.</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-bold text-sm">Enterprise Active Directory Lab</p>
                  <p className="text-xs text-on-surface-variant mt-1">Identity management and Windows administration.</p>
                </div>
              </div>
            </div>

            {/* Leadership Card */}
            <div className="md:col-span-4 bg-secondary-container text-on-secondary-container p-8 rounded shadow-sm flex flex-col">
              <div className="mb-4">
                <span className="text-[12px] font-label text-on-secondary-fixed bg-on-secondary-container/20 px-3 py-1 rounded-full mb-4 inline-block font-bold uppercase">Leadership</span>
                <h3 className="text-2xl font-bold text-primary mb-2">HUB Augusta Youth Leadership</h3>
                <p className="text-xs font-bold leading-relaxed opacity-70 italic mb-4">Explorers Program 2026-2027</p>
              </div>
              <p className="text-sm text-on-secondary-container/80 leading-relaxed mb-6">
                Selected for a competitive leadership program developing community awareness, professional etiquette, and advanced leadership skills through a structured curriculum and civic engagement.
              </p>
              <div className="mt-auto flex justify-end">
                <Users size={32} className="opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CloudIcon() {
  return <Network size={22} className="text-on-primary-container" />;
}

function AboutScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Header Text and Content */}
        <div className="md:col-span-8 space-y-12">
          {/* New Header Placement */}
          <div className="mb-16 text-left">
            <h1 className="text-5xl font-bold text-primary mb-4">About Me</h1>
            <div className="flex flex-wrap gap-3">
              {['AUGUSTA, GA', 'CYBER ACADEMY OF EXCELLENCE', '11TH GRADE'].map(tag => (
                <span key={tag} className="bg-secondary-container/50 text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold font-label tracking-wider">{tag}</span>
              ))}
            </div>
          </div>

          {/* Main Content Blocks */}
          <div className="bg-white p-10 border border-outline-variant rounded-xl shadow-sm space-y-12">
            <div className="star-border pl-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                I am an 11th-grade student based in Augusta, Georgia, currently attending the Cyber Academy of Excellence and Richmond County Technical Career Magnet School. My academic journey is defined by a rigorous dual-enrollment approach that bridges traditional excellence with specialized technical training. I have cultivated a deep-seated passion for technology repair and network security, viewing every hardware malfunction or network vulnerability as a puzzle requiring a precise, systematic solution.
              </p>
            </div>
            <div className="star-border pl-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Strategic Goals</h2>
              <p className="leading-relaxed text-on-surface-variant">
                My immediate professional trajectory is focused on establishing a dominant presence within the cybersecurity landscape. This involves a commitment to lifelong learning through the pursuit of industry-standard certifications and the accumulation of real-world experience. I am actively seeking opportunities to apply my theoretical knowledge in practical environments, ensuring that my growth is both academically grounded and operationally effective.
              </p>
            </div>
            <div className="star-border pl-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Anticipated Outcomes</h2>
              <p className="leading-relaxed text-on-surface-variant">
                Through the projects and certifications I've already earned, I expect to graduate with a set of skills that most students my age don't yet have, practical experience with Active Directory, network troubleshooting, PXE deployment, and security principles that map directly to industry roles. More than credentials, I want to leave school with the problem-solving mindset of a professional: the ability to walk into an unknown situation, ask the right questions, and work through it systematically. Ultimately, I want to contribute to organizations that take security seriously, and I'm building the portfolio and the knowledge base to make that possible from day one.
              </p>
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN: Profile Picture Sidebar */}
        <aside className="md:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Picture replaces Technical Focus */}
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant shadow-lg">
              <img src={`${base}aboutme2.jpg`} alt="Virgil Carpenter" className="w-full h-full object-cover" />
            </div>

            {/* Optional: You can move the Technical Focus list below the picture or remove it */}
            <div className="bg-primary text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-5">Currently Learning</h3>
              <div className="flex items-center gap-4">
                <Cloud size={22} className="text-on-primary-container shrink-0" />
                <div>
                  <p className="text-[13px] font-label uppercase font-bold tracking-widest">Microsoft Azure</p>
                  <p className="text-sm text-on-primary-container/80 mt-2">Currently learning Azure and building cloud fundamentals.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function EducationScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-16">
        <span className="text-primary text-sm font-label font-bold uppercase tracking-[0.2em] mb-4 block">Academic Development</span>
        <h1 className="text-5xl font-bold text-primary mb-4">Education</h1>
        <p className="text-on-surface-variant leading-relaxed">
          My high school cybersecurity coursework and college dual enrollment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 bg-white p-8 border border-outline-variant shadow-sm h-fit">
          <h3 className="text-xl font-bold text-primary mb-6">Course Philosophy</h3>
          <div className="space-y-8">
            <div className="flex gap-4">
              <Terminal size={24} className="text-primary shrink-0" />
              <div>
                <p className="font-bold">Hands-on Technical</p>
                <p className="text-sm text-on-surface-variant mt-1">Focus on practical application of network security and defensive measures.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Network size={24} className="text-primary shrink-0" />
              <div>
                <p className="font-bold">Hierarchical Growth</p>
                <p className="text-sm text-on-surface-variant mt-1">Progressing from hardware fundamentals to advanced cyber defensive strategies.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-16">
          <div className="space-y-12">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-primary flex items-center justify-center">
                 <Shield className="text-white" size={24} />
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-primary">Cybersecurity Coursework</h2>
                  <p className="text-[12px] font-label font-bold tracking-widest text-on-surface-variant">HIGH SCHOOL COURSEWORK</p>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative ml-6">
                {[
                  { title: 'Intro to Hardware Technology', desc: 'Foundations of computer hardware, components, and troubleshooting.' },
                  { title: 'Networking Fundamentals', desc: 'Foundations of networking, connectivity, and network troubleshooting.' },
                  { title: 'Intro to Cybersecurity', desc: 'Foundational cybersecurity concepts, threats, vulnerabilities, and defensive practices.' },
                  { title: 'Advanced Cybersecurity', desc: 'Advanced cybersecurity concepts and hands-on defensive work.' },
                  { title: 'Networking Systems and Support', desc: 'Current coursework focused on networking systems and technical support.' },
                  { title: 'Intro to Business Technology', desc: 'Foundational business technology and workplace technology skills.' },
                ].map(course => (
                  <div key={course.title} className="bg-white p-6 border border-outline-variant hover:border-primary transition-colors">
                    <h4 className="text-lg font-bold mb-3">{course.title}</h4>
                    <p className="text-sm text-on-surface-variant">{course.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-12">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-primary flex items-center justify-center">
                 <Terminal className="text-white" size={24} />
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-primary">Cisco Netacad</h2>
                  <p className="text-[12px] font-label font-bold tracking-widest text-on-surface-variant">SUPPLEMENTAL CERTIFICATIONS</p>
               </div>
             </div>

             <div className="ml-6 space-y-8">
               <div className="bg-white border border-outline-variant p-10 flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-64 aspect-[4/3] bg-surface-container relative rounded-lg overflow-hidden border border-outline-variant shadow-sm group">
                    <img src={`${base}certificate.jpg`} alt="Python Essentials 1 Certificate" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-primary/5"></div>
                    <a 
                      href={`${base}certificate.pdf`}
                      target="_blank"
                      className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full text-primary shadow-lg hover:bg-primary hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <Download size={18} />
                    </a>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-2xl font-bold text-primary">Python Essentials 1</h4>
                        <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">Certificate of Completion</p>
                      </div>
                      <span className="bg-primary-container text-on-primary-container px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-full">Badge Earned</span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      As part of my preparation for a career in cybersecurity and computer science, I completed Cisco Networking Academy's Python Essentials 1 course to build a strong foundation in programming. Throughout the course, I learned Python syntax, variables, data types, loops, conditionals, and functions, while gaining hands-on experience writing and debugging scripts, performing input/output operations, and applying logical problem-solving to coding exercises. Successfully earning this certificate demonstrates my ability to write Python code, solve programming challenges, and apply core programming concepts, skills that strengthen my technical toolkit for future cybersecurity and computer science projects.
                    </p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="max-w-3xl mb-20">
        <h1 className="text-5xl font-bold text-primary mb-4">Technical Projects</h1>
        <p className="text-lg text-on-surface-variant italic">A selection of laboratory environments documented using the STAR method.</p>
      </header>

      <div className="space-y-32">
        {/* Project 1 */}
        <section className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
              <h2 className="text-3xl font-bold text-primary">PXE Deployment Lab</h2>
              <span className="text-sm font-bold text-secondary-fixed bg-secondary-container px-3 py-1 rounded">MARCH 2025</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-6 font-medium">Cyber Academy of Excellence – Augusta, GA • Collaborators: Virgil Carpenter, Jason Williams</p>
            <div className="h-1 w-20 bg-primary mb-12"></div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-video bg-surface-container rounded-xl overflow-hidden border border-outline-variant mb-6 grayscale hover:grayscale-0 transition-all duration-500">
              <img src={`${base}serverrack.jpg`} alt="Server rack" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
               {['NETWORK TROUBLESHOOTING', 'PXE BOOTING', 'WDS', 'OS DEPLOYMENT'].map(tag => (
                 <span key={tag} className="bg-secondary-container text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">{tag}</span>
               ))}
            </div>
            <div className="bg-surface-container/50 p-6 rounded-xl border border-outline-variant/30">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Tools Used</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Ethernet Switching', 'PXE Protocol', 'BIOS Config', 'Windows Deployment Services'].map(tool => (
                  <div key={tool} className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div className="star-border pl-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Situation</h3>
              <p className="text-on-surface-variant">Multiple classroom workstations at the Cyber Academy of Excellence were experiencing critical Ethernet connectivity failures, hindering instructional readiness.</p>
            </div>
            <div className="star-border pl-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Action</h3>
              <p className="text-on-surface-variant mb-4">Diagnosed network paths using functional PCs to isolate faulty connections and verified switch configurations. Despite initial advice to focus on hardware failure, I trusted my diagnostic instincts and pivoted to testing network ports.</p>
              <ul className="list-disc list-inside text-on-surface-variant space-y-2 marker:text-primary">
                <li>Systematically verified switch configurations and cable integrity.</li>
                <li>Used built-in boot manager tools to execute PXE booting across the lab.</li>
                <li>Deployed standardized operating system images via network imaging (WDS).</li>
              </ul>
            </div>
            <div className="star-border pl-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Result (Outcome)</h3>
              <p className="text-on-surface-variant">Restored all systems to full operational status and standardized the OS environment. This confirmed that the issue was port-based, reinforcing the value of methodical testing over assumptions and strengthening my confidence in technical troubleshooting.</p>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                <Shield size={14} /> Reflection
              </h4>
              <p className="text-sm italic text-on-surface-variant leading-relaxed">
                "This project taught me the importance of trusting my diagnostic instincts. Methodical testing proved that the issue stemmed from the port rather than hardware failure, reminding me that effective diagnostics require both technical skill and trust in your own reasoning."
              </p>
            </div>
          </div>
        </section>

{/* Project 2 */}
<section className="grid lg:grid-cols-12 gap-12 items-start pt-20 border-t border-outline-variant/30">
  <div className="lg:col-span-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
      <h2 className="text-3xl font-bold text-primary">Enterprise Active Directory Lab</h2>
      <span className="text-sm font-bold text-secondary-fixed bg-secondary-container px-3 py-1 rounded">APRIL 2026</span>
    </div>
    <div className="h-1 w-20 bg-primary mb-12"></div>
  </div>

  {/* LEFT COLUMN: Your Original Text */}
  <div className="lg:col-span-7 space-y-8">
    <div className="star-border pl-6">
      <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Situation</h3>
      <p className="text-on-surface-variant">I needed real enterprise identity management experience but had no access to a corporate network environment.</p>
    </div>
    <div className="star-border pl-6">
      <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Action</h3>
      <p className="text-on-surface-variant">I designed and built a realistic lab to practice domain administration, access control, and policy management from scratch.</p>
    </div>
    <div className="star-border pl-6">
      <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Result</h3>
      <p className="text-on-surface-variant">I gained hands-on administration and troubleshooting skills equivalent to real-world sysadmin work, with a fully functional lab environment I can continue building on.</p>
    </div>
    <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
      <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
        <Shield size={14} /> Reflection
      </h4>
      <p className="text-sm italic text-on-surface-variant leading-relaxed">
        "Building this from the ground up showed me that cybersecurity isn't just about blocking threats—it's about understanding the nervous system of an organization. Managing GPOs and user permissions in a sandbox environment gave me the patience to troubleshoot complex authentication chains and the foresight to maintain a 'least privilege' posture even in a lab setting."
      </p>
    </div>
  </div>

  {/* RIGHT COLUMN: The Slideshow */}
  <div className="lg:col-span-5">
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-outline-variant mb-6 shadow-md">
      <iframe 
        src="https://docs.google.com/presentation/d/e/2PACX-1vTZeoJ1uNE4MmWnxxni_QvmFjfMtPd_U5ullYYLYAhhTtUKUPtxtBO7U2BrFtxjIPspc3DZe4LzDE6r/pubembed?start=false&loop=true&delayms=5000" 
        frameBorder="0" 
        width="100%" 
        height="100%" 
        allowFullScreen={true}
        title="Active Directory Lab Presentation"
        className="absolute inset-0"
      ></iframe>
    </div>
    <div className="flex flex-wrap gap-2">
      {['ACTIVE DIRECTORY', 'POWERSHELL', 'VIRTUALBOX'].map(tag => (
        <span key={tag} className="bg-secondary-container text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">{tag}</span>
      ))}
    </div>
  </div>
</section>

      </div>
    </div>
  );
}

function DocumentsScreen() {
  const documents = [
    {
      title: 'Resume',
      subtitle: 'Current professional resume',
      preview: `${base}resume.png`,
      pdf: `${base}resume.pdf`,
    },
    {
      title: 'Cover Letter',
      subtitle: 'Professional cover letter',
      preview: `${base}coverletter.png`,
      pdf: `${base}coverletter.pdf`,
    },
    {
      title: 'Letter of Recommendation',
      subtitle: 'Professional recommendation',
      preview: `${base}letterofrecommendation.png`,
      pdf: `${base}letterofrecommendation.pdf`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="max-w-3xl border-l-4 border-primary pl-6 mb-16">
        <h1 className="text-5xl font-bold text-primary mb-4">Documents</h1>
        <p className="text-lg text-on-surface-variant">Professional documents and application materials.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {documents.map((document) => (
          <article key={document.title} className="bg-white border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <a
              href={document.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-surface-container border-b border-outline-variant aspect-[8.5/11] overflow-hidden group"
              aria-label={`Open ${document.title} in a new tab`}
            >
              <img
                src={document.preview}
                alt={`${document.title} preview`}
                className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </a>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary">{document.title}</h2>
              <p className="text-sm text-on-surface-variant mt-2 mb-6">{document.subtitle}</p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={document.pdf}
                  download
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Download <Download size={14} />
                </a>
                <a
                  href={document.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-outline-variant text-primary px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-primary transition-colors"
                >
                  Open in New Tab <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CertificationsScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="max-w-3xl border-l-4 border-primary pl-6 mb-16">
        <h1 className="text-5xl font-bold text-primary mb-4">Certifications</h1>
        <p className="text-lg text-on-surface-variant">Industry certification and technical training I have completed.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white border border-outline-variant p-8 rounded-lg shadow-sm">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Certified</span>
              <h2 className="text-3xl font-bold text-primary mt-2">CompTIA Security+ 701</h2>
              <p className="text-sm text-on-surface-variant mt-2">Earned April 2026</p>
            </div>
            <ShieldCheck size={38} className="text-primary shrink-0" />
          </div>
          <div className="border border-outline-variant bg-surface-container p-3 mb-6">
            <img src={`${base}sec+.jpg`} alt="CompTIA Security+ certificate" className="w-full h-auto object-contain" />
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
            CompTIA Security+ is my first industry cybersecurity certification and represents the foundation I have built across security concepts, threats, vulnerabilities, and defensive practices.
          </p>
          <a href={`${base}sec+.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            View Certificate <ExternalLink size={14} />
          </a>
        </div>

        <div className="bg-white border border-outline-variant p-8 rounded-lg shadow-sm h-fit">
          <span className="text-[11px] font-bold uppercase tracking-widest text-secondary">Technical Training</span>
          <h2 className="text-3xl font-bold text-primary mt-2">Python Essentials 1</h2>
          <p className="text-sm text-on-surface-variant mt-2">Cisco Networking Academy · Certificate of Completion</p>
          <p className="text-sm text-on-surface-variant leading-relaxed mt-6">
            Completed Python Essentials 1 to build a foundation in programming, scripting, and logical problem-solving.
          </p>
          <a href={`${base}certificate.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            View certificate <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}

function ExperienceScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="max-w-3xl mb-16">
        <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Experience</span>
        <h1 className="text-5xl font-bold text-primary mb-4">Technical Experience</h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">Hands-on technical experience built through school IT work, troubleshooting, and independent technology support.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-outline-variant p-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <Wrench className="text-primary" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-primary">IT Support & Troubleshooting</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mt-1">School-based experience</p>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-on-surface-variant leading-relaxed list-disc list-inside">
            <li>Troubleshoot classroom computers, Ethernet connectivity, and software issues.</li>
            <li>Assist with PC hardware, upgrades, and system setup.</li>
            <li>Worked with PXE deployment and network-based operating system imaging.</li>
            <li>Built hands-on experience with Active Directory and Windows administration labs.</li>
          </ul>
        </div>

        <div className="bg-white border border-outline-variant p-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <Cpu className="text-primary" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-primary">Independent Technical Support</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mt-1">Independent / family & small-office support</p>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-on-surface-variant leading-relaxed list-disc list-inside">
            <li>Help troubleshoot laptops, desktops, phones, consoles, and other personal technology.</li>
            <li>Build and upgrade PCs and diagnose hardware problems.</li>
            <li>Configure and troubleshoot home and small-office networks.</li>
            <li>Assist with malware cleanup and general system troubleshooting.</li>
          </ul>
        </div>
      </div>

      <section className="mt-16 border-t border-outline-variant pt-12">
        <div className="flex items-center gap-3 mb-8">
          <Award className="text-primary" size={24} />
          <h2 className="text-3xl font-bold text-primary">Activities</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-outline-variant p-7 rounded-lg">
            <h3 className="text-xl font-bold text-primary">CyberPatriot</h3>
            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">Cybersecurity competition experience involving system security, vulnerability identification, and defensive troubleshooting.</p>
          </div>
          <div className="bg-white border border-outline-variant p-7 rounded-lg">
            <h3 className="text-xl font-bold text-primary">Be Pro Be Proud</h3>
            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">Volunteer and mentoring experience supporting students through hands-on career and technical activities.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center md:text-left">
      <header className="max-w-3xl mb-20 mx-auto">
        <span className="text-primary text-sm font-label font-bold uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
        <h1 className="text-5xl font-bold text-primary mb-4">Contact Me</h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          You can reach out to me via email for any professional inquiries or connect with me through my LinkedIn profile.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-outline-variant p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 justify-center md:justify-start">
            <Mail className="text-primary" size={24} />
            Email Address
          </h3>
          <a 
            href="mailto:virgilcarpenter4005@gmail.com" 
            className="text-2xl font-medium text-on-surface hover:text-primary transition-colors break-all"
          >
            virgilcarpenter4005@gmail.com
          </a>
          <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">
            For professional inquiries, project proposals, or technical consultations. I typically respond within 24-48 hours.
          </p>
        </div>

        <div className="bg-white border border-outline-variant p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 justify-center md:justify-start">
            <Linkedin className="text-primary" size={24} />
            LinkedIn Profile
          </h3>
          <a 
            href="https://www.linkedin.com/in/virgilcarpenter/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl font-medium text-on-surface hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
          >
            Virgil Carpenter
            <ArrowUpRight size={20} />
          </a>
          <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">
            Connect with me on LinkedIn to view my professional network and industry contributions.
          </p>
        </div>
      </div>
    </div>
  );
}
