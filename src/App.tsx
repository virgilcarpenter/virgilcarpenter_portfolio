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
  ExternalLink,
  Download,
  Mail,
  Linkedin,
  Menu,
  X
} from 'lucide-react';

type Screen = 'home' | 'about' | 'education' | 'projects' | 'documents' | 'contact';

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
                  <span className="text-sm">Virus and malware remediation, OS optimization, and data recovery across diverse platforms.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Cpu size={18} className="text-primary-fixed shrink-0 mt-1" />
                  <span className="text-sm">Advanced hardware diagnostics, precision component replacement, and network infrastructure maintenance.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Wrench size={18} className="text-primary-fixed shrink-0 mt-1" />
                  <span className="text-sm">Troubleshooting connectivity issues and deploying software solutions systematically.</span>
                </li>
              </ul>
            </div>

            {/* Labs Card */}
            <div className="md:col-span-4 bg-white border border-outline-variant p-8 rounded shadow-sm">
              <span className="text-[12px] font-label text-primary-container bg-surface-container-highest px-3 py-1 rounded-full mb-4 inline-block font-bold">HANDS-ON</span>
              <h3 className="text-2xl font-bold text-primary mb-6">Network & Systems Labs</h3>
              <div className="h-32 bg-surface-container rounded mb-4 flex items-center justify-center">
                 <Network size={40} className="text-secondary opacity-40" />
              </div>
              <p className="text-on-surface-variant text-sm">Building virtualized lab environments for testing firewall configurations and network intrusion detection systems.</p>
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

function AboutScreen() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
        <div className="w-48 h-48 rounded-xl overflow-hidden bg-surface-container border border-outline-variant shadow-lg">
          <img src={`${base}aboutme2.jpg`} alt="Virgil Carpenter" className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold text-primary mb-4 text-center md:text-left">About Me</h1>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {['AUGUSTA, GA', 'CYBER ACADEMY OF EXCELLENCE', '10TH GRADE'].map(tag => (
              <span key={tag} className="bg-secondary-container/50 text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold font-label tracking-wider">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-8 bg-white p-10 border border-outline-variant rounded-xl shadow-sm space-y-12">
          <div className="star-border pl-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              I am a 10th-grade student based in Augusta, Georgia, currently attending the Cyber Academy of Excellence and Richmond County Technical Career Magnet School. My academic journey is defined by a rigorous dual-enrollment approach that bridges traditional excellence with specialized technical training. I have cultivated a deep-seated passion for technology repair and network security, viewing every hardware malfunction or network vulnerability as a puzzle requiring a precise, systematic solution.
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
        
        <aside className="md:col-span-4 space-y-6">
          <div className="bg-primary text-white p-8 rounded-xl shadow-lg sticky top-24">
            <h3 className="text-xl font-bold mb-6">Technical Focus</h3>
            <ul className="space-y-6">
              {[
                { icon: Shield, label: 'Network Security' },
                { icon: Wrench, label: 'Tech Repair' },
                { icon: Terminal, label: 'System Hardening' },
                { icon: Network, label: 'Diagnostics' }
              ].map(item => (
                <li key={item.label} className="flex items-center gap-4">
                  <item.icon size={20} className="text-on-primary-container" />
                  <span className="text-[13px] font-label uppercase font-bold tracking-widest">{item.label}</span>
                </li>
              ))}
            </ul>
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
        <h1 className="text-5xl font-bold text-primary mb-4">Educational Roadmap</h1>
        <p className="text-on-surface-variant leading-relaxed">
          A structured overview of formal education, specialized cybersecurity training, and technical certifications aimed at mastering infrastructure security.
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
                  <h2 className="text-2xl font-bold text-primary">Cyber Security Pathway</h2>
                  <p className="text-[12px] font-label font-bold tracking-widest text-on-surface-variant">CORE ACADEMIC CURRICULUM</p>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative ml-6">
                {[
                  { code: 'CS-101', title: 'Hardware Technology', desc: 'Computer components, architecture, and maintenance.', tags: ['Hardware', 'A+ Alignment'] },
                  { code: 'CS-102', title: 'Networking Fundamentals', desc: 'OSI models, TCP/IP, routing, and switching.', tags: ['Infrastructure', 'Net+ Alignment'] },
                  { code: 'CS-201', title: 'Cyber Security Essentials', desc: 'Threat landscape, risk management, and frameworks.', tags: ['Security', 'NIST'] },
                  { code: 'CS-301', title: 'Advanced Cyber Security', desc: 'Defense architecture and incident response.', tags: ['Expert', 'Red/Blue Team'] },
                ].map(course => (
                  <div key={course.code} className="bg-white p-6 border border-outline-variant hover:border-primary transition-colors">
                    <span className="text-[10px] font-bold text-primary mb-2 block">{course.code}</span>
                    <h4 className="text-lg font-bold mb-3">{course.title}</h4>
                    <p className="text-sm text-on-surface-variant mb-6">{course.desc}</p>
                    <div className="flex gap-2">
                       {course.tags.map(tag => (
                         <span key={tag} className="text-[9px] bg-secondary-container px-2 py-1 font-bold uppercase">{tag}</span>
                       ))}
                    </div>
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
              <h2 className="text-3xl font-bold text-primary">Classroom Network Diagnostics & PXE Deployment</h2>
              <span className="text-sm font-bold text-secondary-fixed bg-secondary-container px-3 py-1 rounded">MARCH 2025</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-6 font-medium">Cyber Academy of Excellence – Augusta, GA • Collaborators: Virgil Carpenter, Jason Williams</p>
            <div className="h-1 w-20 bg-primary mb-12"></div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-video bg-surface-container rounded-xl overflow-hidden border border-outline-variant mb-6 grayscale hover:grayscale-0 transition-all duration-500">
              <img src={`${base}/public/serverrack.jpg`} alt="Server rack" className="w-full h-full object-cover" />
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
          <div className="lg:col-span-5 lg:order-last">
             <div className="aspect-video bg-surface-container rounded-xl overflow-hidden border border-outline-variant mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                <img src={`${base}/pubic/activedirectory.jpg`} alt="AD Management" className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-wrap gap-2">
                {['ACTIVE DIRECTORY', 'POWERSHELL', 'VIRTUALBOX'].map(tag => (
                  <span key={tag} className="bg-secondary-container text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">{tag}</span>
                ))}
             </div>
          </div>
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
        </section>

        {/* Project 3 */}
        <section className="grid lg:grid-cols-12 gap-12 items-start pt-20 border-t border-outline-variant/30">
          <div className="lg:col-span-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
              <h2 className="text-3xl font-bold text-primary">Network & Systems Labs</h2>
              <span className="text-sm font-bold text-secondary-fixed bg-secondary-container px-3 py-1 rounded">JANUARY 2026</span>
            </div>
            <div className="h-1 w-20 bg-primary mb-12"></div>
          </div>
          <div className="lg:col-span-5">
             <div className="aspect-video bg-surface-container rounded-xl overflow-hidden border border-outline-variant mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                <img src={`${base}/public/fiberobtic.jpg`} alt="Network Lab" className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-wrap gap-2">
                {['pfSense', 'IDS/IPS', 'NETWORK SEGMENTATION', 'VIRTUALIZATION'].map(tag => (
                  <span key={tag} className="bg-secondary-container text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">{tag}</span>
                ))}
             </div>
          </div>
          <div className="lg:col-span-7 space-y-8">
             <div className="star-border pl-6">
               <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Situation</h3>
               <p className="text-on-surface-variant">Needed a secure, isolated environment to test advanced firewall rules and network security configurations without risking production data or personal hardware.</p>
             </div>
             <div className="star-border pl-6">
               <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Action</h3>
               <p className="text-on-surface-variant">Architected a multi-layered virtual network using pfSense for firewalling and Snort for Intrusion Detection (IDS). Configured VLANs to segment traffic and established strict rule-sets to monitor and block malicious patterns.</p>
             </div>
             <div className="star-border pl-6">
               <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Result</h3>
               <p className="text-on-surface-variant">Successfully virtualized a complex network architecture that allows for rapid security prototyping. Validated the setup by simulating common network attacks and confirming the IDS triggered appropriate alerts and blocks.</p>
             </div>
             <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
               <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Shield size={14} /> Reflection
               </h4>
               <p className="text-sm italic text-on-surface-variant leading-relaxed">
                 "This project reinforced that defense-in-depth is the only reliable security posture. Configured firewalls are the first line of defense, but the IDS/IPS layer provides the 'eyes' needed to understand what's actually hitting your perimeter. It also taught me that network segmentation is often the most effective way to limit a blast radius in any security event."
               </p>
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
      id: 'resume',
      title: 'Professional Resume',
      subtitle: 'Cybersecurity & Tech Specialist',
      date: 'Updated April 2026',
      size: '72 KB',
      preview: `${base}resume.jpg`,
      pdf: `${base}resume.pdf`,
      fallback: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
      details: [
        'Security+ 701 Certified',
        'GPA: 93.67',
        'Python Essentials 1',
        'Cisco Networking Academy'
      ]
    }, {
      id: 'cover-letter',
      title: 'Cover Letter',
      subtitle: 'Application for Computer Aide',
      date: 'April 2026',
      size: '54 KB',
      preview: `${base}coverletter.jpg`,
      pdf: `${base}coverletter.pdf`,
      fallback: 'https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=800&auto=format&fit=crop',
      details: [
        'Tailored for NSA',
        'Cyber Academy focus',
        'Technical aptitude',
        'Personal statement'
      ]
    }, {
      id: 'security-plus',
      title: 'CompTIA Security+',
      subtitle: 'Technical Certification (701)',
      date: 'Earned April 2026',
      size: '190 KB',
      preview: `${base}sec+.jpg`,
      pdf: `${base}sec+.pdf`,
      fallback: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
      details: [
        'Network Security',
        'Compliance & Operations',
        'Threats & Vulnerabilities',
        'Application Security'
      ]
    }, {
      id: 'python-cert',
      title: 'Python Essentials 1',
      subtitle: 'Cisco Networking Academy',
      date: 'Earned April 2026',
      size: '1.2 MB',
      preview: `${base}certificate.jpg`,
      pdf: `${base}certificate.pdf`,
      fallback: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      details: [
        'Programming Fundamentals',
        'Automation & Scripting',
        'Logic & Algorithms',
        'Network Programmability'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="max-w-3xl border-l-4 border-primary pl-6 mb-20">
        <h1 className="text-5xl font-bold text-primary mb-4 text-center md:text-left">Achievements & Documents</h1>
        <p className="text-lg text-on-surface-variant text-center md:text-left">A compilation of technical certifications, academic performance, and professional documentation.</p>
      </header>

      <section className="grid md:grid-cols-12 gap-8 mb-20">
        <div className="md:col-span-8 bg-white border border-outline-variant p-10 shadow-sm transition-transform hover:translate-y-[-4px]">
           <h3 className="text-sm font-label font-bold text-secondary uppercase tracking-widest mb-8">Academic & Technical Achievements</h3>
           <div className="space-y-8">
             <div className="bg-surface-container/30 p-6 rounded border-l-4 border-primary">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="text-xl font-bold">HUB Youth Leadership Academy</h4>
                   <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">Class of 2026-2027 Academy Explorers</p>
                 </div>
                 <span className="bg-secondary-container text-on-secondary-container px-3 py-1 font-bold text-[10px] uppercase tracking-tighter rounded">Accepted</span>
               </div>
               <p className="text-sm text-on-surface-variant leading-relaxed">
                 Selected for a competitive leadership program aimed at the area's brightest future leaders. The academy focuses on developing community awareness, professional business etiquette, and advanced leadership skills through a structured curriculum including financial literacy, technology, healthcare, and government engagement.
               </p>
             </div>
             <div className="flex justify-between items-center bg-surface-container/30 p-4 rounded border-l-4 border-primary">
               <div>
                 <h4 className="text-xl font-bold">CompTIA Security+ 701</h4>
                 <p className="text-sm text-on-surface-variant">Global security validation baseline</p>
               </div>
               <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 font-bold text-[10px] uppercase tracking-tighter">Certified</span>
             </div>
             <div className="flex justify-between items-center bg-surface-container/30 p-4 rounded border-l-4 border-primary">
               <div>
                 <h4 className="text-xl font-bold">Cisco Python Essentials 1</h4>
                 <p className="text-sm text-on-surface-variant">Network automation programming</p>
               </div>
               <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 font-bold text-[10px] uppercase tracking-tighter">Completed</span>
             </div>
           </div>
        </div>

        <div className="md:col-span-4 bg-primary text-white p-10 flex flex-col justify-between shadow-xl">
           <h3 className="text-sm font-label font-bold uppercase tracking-widest opacity-60">Academic Standing</h3>
           <div>
             <div className="text-6xl font-bold mb-2 tracking-tighter">93.67</div>
             <p className="text-xs font-bold font-label tracking-widest opacity-50 uppercase">Unweighted GPA</p>
           </div>
           <div className="pt-8 border-t border-white/20 mt-8">
             <p className="font-bold text-lg">Cyber Academy of Excellence</p>
             <p className="text-xs opacity-60">Class of 2026</p>
           </div>
        </div>
      </section>

      <h2 className="text-2xl font-bold text-primary mb-12 flex items-center gap-4">
        Official Files
        <div className="h-px bg-outline-variant flex-1"></div>
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white border border-outline-variant rounded-lg overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500">
             <div className="w-full md:w-64 aspect-[3/4] bg-white relative overflow-hidden shrink-0 border-r border-outline-variant flex items-center justify-center">
                <img 
                  src={doc.preview} 
                  alt={doc.title} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700 relative z-10"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = (doc as any).fallback;
                    if (fallback && !target.src.includes(fallback)) {
                      target.src = fallback;
                    } else {
                      target.style.opacity = '0.2';
                    }
                  }}
                />
               <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl scale-0 group-hover:scale-100 transition-transform duration-500">
                    <FileText size={24} />
                  </div>
               </div>
             </div>

             <div className="flex-1 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="text-2xl font-bold text-primary tracking-tight">{doc.title}</h3>
                     <p className="text-xs font-bold font-label text-secondary uppercase tracking-[0.1em] mt-1">{doc.subtitle}</p>
                   </div>
                   <span className="text-[10px] font-bold bg-surface-container-highest px-2 py-1 rounded">{doc.size}</span>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                   {doc.details.map((detail, i) => (
                     <div key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                       {detail}
                     </div>
                   ))}
                   <p className="text-[10px] text-secondary font-bold uppercase tracking-widest pt-4 italic border-t border-outline-variant/30">{doc.date}</p>
                </div>

                 <div className="grid grid-cols-2 gap-3">
                   <a 
                     href={doc.pdf || doc.preview}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-primary text-white py-3 font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-primary-container"
                   >
                     <ExternalLink size={14} /> View PDF
                   </a>
                   <a 
                     href={doc.pdf || doc.preview}
                     download={doc.pdf?.split('/').pop() || doc.preview.split('/').pop()}
                     className="border-2 border-primary text-primary py-3 font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-primary hover:text-white"
                   >
                     <Download size={14} /> Download
                   </a>
                </div>
             </div>
          </div>
        ))}
      </div>
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
