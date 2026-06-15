import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Activity, Share2 } from 'lucide-react';

const MODEL_NAMES: Record<string, string> = {
  office1: "Starter Office",
  office2: "Office Pro",
  office3: "Office Elite",
  trader1: "Trader Setup",
  trader2: "Trader Pro"
};
const MODELS_DATA = {
  executive: {
    basePrice: 33000,
    parts: {
      storage: [
        { id: 's1', name: '512GB NVMe SSD', price: 0 },
        { id: 's2', name: '1TB NVMe SSD', price: 3000 },
      ],
      monitor: [
        { id: 'm0', name: 'No Monitor', price: 0 },
        { id: 'm1', name: 'Add Monitor', price: 5000 },
      ]
    }
  },

  developer: {
    basePrice: 37000,
    parts: {
      storage: [
        { id: 's1', name: '512GB NVMe SSD', price: 0 },
        { id: 's2', name: '1TB NVMe SSD', price: 3000 },
      ],
      monitor: [
        { id: 'm0', name: 'No Monitor', price: 0 },
        { id: 'm1', name: 'Add Monitor', price: 5000 },
      ]
    }
  },

  trader: {
    basePrice: 46000, // includes GT 730
    parts: {
      ram: [
        { id: 'r1', name: '8GB DDR4', price: 0 },
        { id: 'r2', name: '16GB DDR4', price: 2500 },
      ],
      storage: [
        { id: 's1', name: '512GB NVMe SSD', price: 0 },
        { id: 's2', name: '1TB NVMe SSD', price: 3000 },
      ],
      monitor: [
  { id: 'm0', name: 'No Monitor', price: 0 },
  { id: 'm1', name: '1 Monitor', price: 5000 },
  { id: 'm2', name: '2 Monitors', price: 10000 },
  { id: 'm3', name: '3 Monitors', price: 15000 },
  { id: 'm4', name: '4 Monitors', price: 20000 },
]
    }
  }
};

export default function Configurator({ 
  setView, 
  setCheckoutTotal,
  addToCart,
  modelId = 'core'
}: { 
  setView: (view: 'home' | 'models' | 'configurator' | 'contact' | 'checkout') => void,
  setCheckoutTotal: (total: number) => void,
  addToCart: (item: any) => void,
  modelId?: string
}) {
  const getModelKey = (id: string) => {
  if (id.includes("trader")) return "trader";
  return "executive"; // default for office
};

const modelData = MODELS_DATA[getModelKey(modelId)];
  const PARTS = modelData.parts;

  const [selected, setSelected] = useState<Record<string, any>>(() => {
  const initial: any = {};
  Object.keys(PARTS).forEach((key) => {
    initial[key] = PARTS[key][0];
  });
  return initial;
});
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);

  const basePrice = modelData.basePrice;
  const total =
  basePrice +
  (Object.values(selected) as any[]).reduce((sum, item) => sum + item.price, 0);
  

  

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Build link copied to clipboard!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row gap-12"
    >
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Configure {MODEL_NAMES[modelId] || modelId}</h1>
        <p className="text-white/40 mb-12 font-mono text-sm tracking-widest uppercase">Select your components</p>
        
        <div className="space-y-12">
          {Object.entries(PARTS).map(([category, options]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-gapr-accent)] mb-6 pb-2">
                {category.toUpperCase()}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map(opt => (
                  <div 
                    key={opt.id}
                    onClick={() => setSelected(s => ({ ...s, [category]: opt }))}
                    className={`p-4 cursor-pointer transition-all duration-300 flex justify-between items-center rounded-md ${
                      selected[category as keyof typeof selected].id === opt.id 
                        ? 'bg-[var(--color-gapr-accent)]/10' 
                        : 'bg-[#0a0a0a] hover:bg-[#111]'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-sm text-white/90">{opt.name}</div>
                      <div className="text-xs text-white/40 mt-1">+ ₹{opt.price.toLocaleString('en-IN')}</div>
                    </div>
                    {selected[category as keyof typeof selected].id === opt.id && (
                      <Check size={18} className="text-[var(--color-gapr-accent)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full lg:w-[400px]">
        <div className="sticky top-32 space-y-6">
          

          {/* Summary Widget */}
          <div className="p-8 bg-[#0a0a0a] rounded-lg">
            <div className="flex justify-between items-center mb-6 pb-4">
              <h3 className="text-lg font-display font-bold">Summary</h3>
              <button onClick={handleShare} className="text-white/50 hover:text-[var(--color-gapr-accent)] transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                <Share2 size={14} /> Share
              </button>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm font-mono">
                <span className="text-white/40">Base System</span>
                <span>₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              {Object.entries(selected).map(([cat, opt]) => (
                <div key={cat} className="flex justify-between text-sm font-mono">
                  <span className="text-white/40">{cat.toUpperCase()}</span>
                  <span>₹{(opt as any).price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="pt-6 mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50">Total</span>
                <span className="text-3xl font-display font-bold text-[var(--color-gapr-accent)]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right text-[10px] font-mono tracking-widest uppercase text-white/40">
                
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  addToCart({
                    name: `Gapr PC - ${MODEL_NAMES[modelId] || modelId}`,
                    price: total,
                    specs: (Object.values(selected) as any[]).map((item) => item.name)
                  });
                }}
                className="w-1/2 py-4 border premium-border text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-500"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
  const item = {
    name: `Gapr PC - ${MODEL_NAMES[modelId] || modelId}`,
    price: total,
    specs: Object.values(selected).map((item: any) => item.name)
  };

  setCheckoutTotal(total);

  // 👇 store this separately (NOT cart)
  window.localStorage.setItem("directCheckout", JSON.stringify(item));

  setView('checkout');
}}
                className="w-1/2 py-4 bg-[var(--color-gapr-accent)] text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
