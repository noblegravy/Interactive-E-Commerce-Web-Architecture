import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Cpu, Fan, Shield, Zap, Menu, ShoppingCart, X, MessageCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import Configurator from './components/Configurator';
import Contact from './components/Contact';
import Checkout from './components/Checkout';

function LineupSection({ setView, setSelectedModel }: { setView: (view: 'home' | 'models' | 'configurator' | 'contact' | 'checkout') => void, setSelectedModel: (model: string) => void }) {
  const CATEGORIES = [
  {
    title: "Office PCs",
    description: "Reliable systems for everyday productivity.",
    models: [
      {
        id: "office1",
        name: "Starter Office",
        tag: "Budget",
        price: "₹33,000",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1000",
        specs: ["i3 12th Gen", "8GB DDR4", "512GB NVMe", "H610M-S"]
      },
      {
        id: "office2",
        name: "Office Pro",
        tag: "Balanced",
        price: "₹37,000",
        image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1000",
        specs: ["i3 14th Gen", "8GB DDR4", "512GB NVMe", "H610M-S"]
      },
      {
        id: "office3",
        name: "Office Elite",
        tag: "Performance",
        price: "₹45,000",
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=1000",
        specs: ["i5 14th Gen", "8GB DDR4", "512GB NVMe", "H610M-S"]
      }
    ]
  },
  {
    title: "Trading PCs",
    description: "Multi-monitor setups for serious traders.",
    models: [
      {
        id: "trader1",
        name: "Trader Setup",
        tag: "Multi Display",
        price: "₹46,000",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000",
        specs: ["i3 12th Gen", "GT 730 (4 HDMI)", "8GB RAM", "512GB SSD"]
      },
      {
        id: "trader2",
        name: "Trader Pro",
        tag: "Advanced",
        price: "₹50,000",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
        specs: ["i3 14th Gen", "GT 730 (4 HDMI)", "8GB RAM", "512GB SSD"]
      }
    ]
  }
];
  return (
    <section id="models" className="py-40 bg-[var(--color-gapr-dark)] border-t premium-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[var(--color-gapr-accent)]"></div>
              <span className="text-[var(--color-gapr-accent)] text-[10px] font-semibold tracking-[0.3em] uppercase">
                Hardware
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">The Lineup</h2>
          </div>
        </div>

        <div className="space-y-32">
          {CATEGORIES.map((category, catIdx) => (
            <div key={catIdx}>
              <div className="mb-12 pb-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold tracking-wide text-[var(--color-gapr-accent)] mb-3">
  {category.title}
</h3>

<div className="flex items-center gap-3">
  <div className="h-[1px] w-6 bg-[var(--color-gapr-accent)]"></div>
  <p className="text-white/70 font-mono text-sm tracking-[0.18em] uppercase">
    {category.description}
  </p>
</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.models.map((model, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer flex flex-col"
                    onClick={() => {
                      setSelectedModel(model.id);
                      setView('configurator');
                    }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-8 premium-border bg-[var(--color-gapr-gray)]">
                      <img 
                        src={model.image} 
                        alt={model.name}
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

{/* Subtle brand tint */}
<div className="absolute inset-0 bg-[var(--color-gapr-accent)]/10 mix-blend-overlay" />
                      
                      <div className="absolute top-6 left-6">
                        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/50 border border-white/10 px-3 py-1.5 backdrop-blur-md">
                          {model.tag}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-end mb-6">
                        <h3 className="text-2xl font-display font-bold tracking-wide">{model.name}</h3>
                        <div className="text-right">
                          <p className="text-[var(--color-gapr-accent)] font-mono text-sm tracking-wider">FR {model.price}</p>
                          <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">
  + ₹5,000 Monitor (Optional)
</p>
                          
                        </div>
                      </div>
                      
                      <ul className="space-y-4 mb-8 flex-grow">
                        {model.specs.map((spec, j) => (
                          <li key={j} className="text-[11px] text-white/40 font-mono tracking-widest uppercase flex items-center justify-between pb-2">
                            <span>0{j + 1}</span>
                            <span className="text-white/70">{spec}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button className="w-full py-4 border premium-border text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                        Configure System
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home({ setView, setSelectedModel }: { setView: (view: 'home' | 'models' | 'configurator' | 'contact' | 'checkout') => void, setSelectedModel: (model: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const FEATURED_MODELS = [
  {
    id: "office1",
    name: "Starter Office",
    specs: "i3 12th Gen // 8GB DDR4 // 512GB NVMe",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2000"
  },
  {
    id: "office2",
    name: "Office Pro",
    specs: "i3 14th Gen // 8GB DDR4 // 512GB NVMe",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=2000"
  },
  {
    id: "office3",
    name: "Office Elite",
    specs: "i5 14th Gen // 8GB DDR4 // 512GB NVMe",
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=2000"
  },
  {
    id: "trader1",
    name: "Trader Setup",
    specs: "i3 12th Gen // GT 730 (4 HDMI) // 8GB RAM",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000"
  }
];
  const [currentModel, setCurrentModel] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);

const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

useEffect(() => {
  if (timer) clearTimeout(timer);

  const newTimer = setTimeout(() => {
    setCurrentModel((prev) => (prev + 1) % FEATURED_MODELS.length);
  }, 5000);

  setTimer(newTimer);

  return () => clearTimeout(newTimer);
}, [currentModel]);
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setShowScrollHint(false);
    } else {
      setShowScrollHint(true);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} id="top">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background Glow - More subtle and refined */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-gapr-purple)]/30 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Massive Background Text - Outlined for premium feel */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <h1 className="text-[28vw] font-display font-bold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.03)] uppercase select-none italic">
            GAPR
          </h1>
        </motion.div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-[var(--color-gapr-accent)]"></div>
              <span className="text-[var(--color-gapr-accent)] text-[10px] font-semibold tracking-[0.3em] uppercase">
                The New Standard
              </span>
              <div className="h-[1px] w-8 bg-[var(--color-gapr-accent)]"></div>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6 text-gradient">
              Uncompromising<br />Performance.
            </h2>
            <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto font-light tracking-wide">
              Precision-engineered custom PCs for those who demand the absolute best. Crafted with obsession, powered by the latest architecture.
            </p>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1.02 }}
  transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
  className="relative w-full max-w-5xl aspect-video premium-border bg-[var(--color-gapr-gray)] group cursor-pointer"
  onClick={() => {
    setSelectedModel(FEATURED_MODELS[currentModel].id);
    setView('configurator');
  }}
>
<motion.div
  key={currentModel}
  initial={{ scale: 0.9, opacity: 0.3 }}
  animate={{ scale: 1.2, opacity: 0.5 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
  className="absolute inset-0 flex items-center justify-center pointer-events-none"
>
  <div className="w-[500px] h-[500px] bg-[var(--color-gapr-accent)]/20 rounded-full blur-[120px]" />
</motion.div>
  <AnimatePresence mode="wait">
  <motion.img
    key={FEATURED_MODELS[currentModel].image}
    src={FEATURED_MODELS[currentModel].image}
    alt={FEATURED_MODELS[currentModel].name}
    initial={{ opacity: 0, scale: 1.08 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 1.0, ease: "easeInOut" }}
    className="absolute inset-0 w-full h-full object-cover object-center"
    referrerPolicy="no-referrer"
  />
</AnimatePresence>

  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-gapr-dark)] via-transparent to-transparent opacity-90" />
  <button
  onClick={(e) => {
    e.stopPropagation();
    setCurrentModel((prev) =>
      prev === 0 ? FEATURED_MODELS.length - 1 : prev - 1
    );
  }}
  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
>
  <ChevronLeft size={22} />
</button>

<button
  onClick={(e) => {
    e.stopPropagation();
    setCurrentModel((prev) =>
      (prev + 1) % FEATURED_MODELS.length
    );
  }}
  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
>
  <ChevronRight size={22} />
</button>

  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="w-2 h-2 rounded-full bg-[var(--color-gapr-accent)]"></span>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/60">
          Featured Model
        </span>
      </div>

      <AnimatePresence mode="wait">
  <motion.h3
    key={FEATURED_MODELS[currentModel].name}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.6 }}
    className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2"
  >
    {FEATURED_MODELS[currentModel].name}
  </motion.h3>
</AnimatePresence>

      <AnimatePresence mode="wait">
  <motion.p
    key={FEATURED_MODELS[currentModel].specs}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="text-xs text-white/40 font-mono tracking-widest"
  >
    {FEATURED_MODELS[currentModel].specs}
  </motion.p>
</AnimatePresence>
      <div className="mt-4 w-full max-w-[300px] h-[4px] bg-white/20 rounded-full overflow-hidden">
  <motion.div
    key={currentModel}
    initial={{ width: "0%" }}
    animate={{ width: "100%" }}
    transition={{ duration: 5, ease: "linear" }}
    className="h-full bg-[var(--color-gapr-accent)]"
  />
</div>
    </div>

    <button className="flex items-center gap-4 group/btn">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 group-hover/btn:text-white transition-colors">
        Discover
      </span>

      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-[var(--color-gapr-accent)] group-hover/btn:bg-[var(--color-gapr-accent)] transition-all duration-500">
        <ChevronRight size={18} className="text-white" />
      </div>
    </button>

  </div>


</motion.div>
        </div>
      </section>

      {/* Philosophy / Features Grid */}
      <section id="philosophy" className="py-40 relative border-t premium-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 md:w-2/3">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-8 leading-tight">
              Engineered for<br />
              <span className="text-[var(--color-gapr-accent)] italic">Excellence.</span>
            </h2>
            <p className="text-white/40 text-lg font-light max-w-xl leading-relaxed">
              Every Gapr PC is a masterpiece of thermal design, acoustic tuning, and raw computational power. We don't just build computers; we craft instruments for creators and competitors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 premium-border">
            {[
              { icon: <Cpu size={20} />, title: "Binned Silicon", desc: "Hand-selected processors for maximum overclocking headroom and stability." },
              { icon: <Fan size={20} />, title: "Acoustic Tuning", desc: "Custom fan curves and premium dampening for whisper-quiet operation under load." },
              { icon: <Zap size={20} />, title: "Clean Power", desc: "Titanium-rated power delivery with custom sleeved, perfectly routed cables." },
              { icon: <Shield size={20} />, title: "Lifetime Support", desc: "Direct access to the engineer who built your system. No call centers." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="p-10 bg-[var(--color-gapr-dark)] group hover:bg-[var(--color-gapr-gray)] transition-colors duration-500"
              >
                <div className="w-10 h-10 border premium-border flex items-center justify-center text-white/50 mb-8 group-hover:text-[var(--color-gapr-accent)] group-hover:border-[var(--color-gapr-accent)]/50 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-display font-bold mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Lineup */}
      <LineupSection setView={setView} setSelectedModel={setSelectedModel} />

      {/* CTA Section */}
      <section className="py-40 relative overflsow-hidden border-t premium-border">
        <div className="absolute inset-0 bg-[var(--color-gapr-accent)]/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter mb-8 leading-tight">
            Ready to build<br />your dream machine?
          </h2>
          <p className="text-lg text-white/40 mb-12 font-light tracking-wide">
            Join the elite tier of gamers, creators, and professionals who trust Gapr PC.
          </p>
          <div
  onClick={() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }}
  className="flex flex-col items-center gap-2 text-white/40 cursor-pointer group"
>

  <span className="text-[10px] font-mono tracking-[0.3em] uppercase group-hover:text-[var(--color-gapr-accent)] transition-colors">
    Scroll
  </span>

  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-1"
  >
    <div className="w-1 h-2 bg-white/60 rounded-full" />
  </motion.div>

</div>
          
        </div>
      </section>
      <section id="contact" className="border-t premium-border">
  <Contact />
</section>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'home' | 'models' | 'configurator' | 'contact' | 'checkout'>('home');
  const [selectedModel, setSelectedModel] = useState<string>('core');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);
  const [cart, setCart] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
useEffect(() => {
  const handleScroll = () => {
    const models = document.getElementById("models");
    const contact = document.getElementById("contact");

    const scrollY = window.scrollY + 200;

    if (contact && scrollY >= contact.offsetTop) {
      setActiveSection("contact");
    } else if (models && scrollY >= models.offsetTop) {
      setActiveSection("models");
    } else {
      setActiveSection("home");
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-gapr-dark)] text-[var(--color-gapr-light)] selection:bg-[var(--color-gapr-accent)] selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Logo onClick={() => setView('home')} />
          
          <div className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
            <button
  onClick={() => scrollToSection("top")}
  className={`hover:text-[var(--color-gapr-accent)] transition-colors ${
    activeSection === "home" ? "text-white" : "text-white/50"
  }`}
>
  Home
</button>

<button
  onClick={() => scrollToSection("models")}
  className={`hover:text-[var(--color-gapr-accent)] transition-colors ${
    activeSection === "models" ? "text-white" : "text-white/50"
  }`}
>
  Models
</button>

<button
  onClick={() => scrollToSection("contact")}
  className={`hover:text-[var(--color-gapr-accent)] transition-colors ${
    activeSection === "contact" ? "text-white" : "text-white/50"
  }`}
>
  Contact
</button>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}}
              className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-white hover:text-[var(--color-gapr-accent)] transition-colors"
            >
              <span>Custom Quote</span>
              <ChevronRight size={14} />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative text-white/50 hover:text-[var(--color-gapr-accent)] transition-colors">
              <ShoppingCart size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-gapr-accent)] text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white/50 hover:text-[var(--color-gapr-accent)] transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] bg-[var(--color-gapr-dark)] border-l premium-border z-[70] p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8 pb-6">
                <h2 className="text-xl font-display font-bold tracking-widest uppercase text-[var(--color-gapr-accent)]">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-white/30">
                  <ShoppingCart size={48} className="mb-6 opacity-20" />
                  <p className="font-mono text-sm uppercase tracking-widest">Your cart is empty</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setView('configurator'); }}
                    className="mt-8 px-8 py-3 border premium-border text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70 hover:bg-[var(--color-gapr-accent)] hover:text-black hover:border-[var(--color-gapr-accent)] transition-all duration-500"
                  >
                    Start Building
                  </button>
                </div>
              ) : (
                <div className="flex-grow flex flex-col">
                  <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                    {cart.map((item, idx) => (
                      <div key={idx} className="bg-[var(--color-gapr-gray)] border premium-border p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-sm">{item.name}</h3>
                          <button 
                            onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                            className="text-white/30 hover:text-red-400 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] font-mono text-white/50 mb-3 line-clamp-2">
                          {item.specs.join(' • ')}
                        </p>
                        <p className="font-mono text-[var(--color-gapr-accent)] text-sm">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 mt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50">Subtotal</span>
                      <span className="text-xl font-mono font-bold text-[var(--color-gapr-accent)]">
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button 
                      onClick={() => { 
                        setCheckoutTotal(cartTotal);
                        setIsCartOpen(false); 
                        setView('checkout'); 
                      }}
                      className="w-full py-4 bg-[var(--color-gapr-accent)] text-black text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-500"
                    >
                      Checkout Now
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[var(--color-gapr-dark)] z-[60] p-6 flex flex-col pt-24 md:hidden"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-6 text-white/50 hover:text-[var(--color-gapr-accent)] transition-colors">
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-3xl font-display font-bold tracking-wider mt-12">
              <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[var(--color-gapr-accent)] transition-colors">Home</button>
              <button onClick={() => { setView('models'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[var(--color-gapr-accent)] transition-colors">Models</button>
              <button onClick={() => { setView('contact'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[var(--color-gapr-accent)] transition-colors">Contact</button>
              <div className="h-px w-full bg-white/10 my-4"></div>
              <button onClick={() => { setView('contact'); setIsMobileMenuOpen(false); }} className="text-left text-[var(--color-gapr-accent)]">Custom Quote</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view !== 'configurator' && view !== 'checkout' && (
  <Home setView={setView} setSelectedModel={setSelectedModel} />
)}

{view === 'configurator' && (
  <Configurator
    setView={setView}
    setCheckoutTotal={setCheckoutTotal}
    addToCart={addToCart}
    modelId={selectedModel}
  />
)}

{view === 'checkout' && (
  <Checkout total={checkoutTotal} cartItems={cart} setView={setView} />
)}

      {/* Footer */}
      <footer className="bg-[var(--color-gapr-dark)] border-t premium-border pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-8">
                <Logo onClick={() => setView('home')} />
              </div>
              <p className="text-white/30 max-w-sm text-xs leading-loose font-light tracking-wide">
                Premium custom PCs engineered for uncompromising performance. Built with obsession in India.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold tracking-[0.2em] uppercase text-[10px] text-white/70 mb-8">Products</h4>
              <ul className="space-y-5 text-xs text-white/40 font-light tracking-wide">
                <li><button onClick={() => { setSelectedModel('core'); setView('configurator'); }} className="hover:text-[var(--color-gapr-accent)] transition-colors">Gaming Series</button></li>
                <li><button onClick={() => { setSelectedModel('studio'); setView('configurator'); }} className="hover:text-[var(--color-gapr-accent)] transition-colors">Professional Series</button></li>
                <li><button onClick={() => { setSelectedModel('executive'); setView('configurator'); }} className="hover:text-[var(--color-gapr-accent)] transition-colors">Productivity Series</button></li>
                <li><button onClick={() => { setSelectedModel('trader'); setView('configurator'); }} className="hover:text-[var(--color-gapr-accent)] transition-colors">Trading Series</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold tracking-[0.2em] uppercase text-[10px] text-white/70 mb-8">Company</h4>
              <ul className="space-y-5 text-xs text-white/40 font-light tracking-wide">
                <li><button onClick={() => setView('contact')} className="hover:text-[var(--color-gapr-accent)] transition-colors">Contact Us</button></li>
                <li><button className="hover:text-[var(--color-gapr-accent)] transition-colors">Support</button></li>
                <li><button className="hover:text-[var(--color-gapr-accent)] transition-colors">Warranty</button></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t premium-border text-[10px] text-white/30 font-mono tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Gapr PC. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918527070073?text=Hello%20I%20am%20interested%20in%20a%20custom%20PC" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white px-5 py-3.5 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
      >
        <MessageCircle size={20} />
        <span className="font-semibold text-sm tracking-wide">Talk to an Expert</span>
      </a>
    </div>
  );
}
