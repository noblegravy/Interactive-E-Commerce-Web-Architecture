import { motion } from 'motion/react';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xnjbyznl', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-[var(--color-gapr-accent)]"></div>
          <span className="text-[var(--color-gapr-accent)] text-[10px] font-semibold tracking-[0.3em] uppercase">
            Get in Touch
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-8">Contact Us</h1>
        <p className="text-white/40 mb-12 font-light leading-relaxed">
          Have a question about a custom build? Need support for your existing Gapr PC? 
          Reach out to our engineering team directly.
        </p>

        {status === 'success' ? (
          <div className="p-6 bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-sm">
            Thank you! Your message has been sent successfully. We'll get back to you shortly.
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">Name</label>
                <input type="text" name="name" required className="w-full bg-[#0a0a0a] border premium-border p-4 text-sm font-mono focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">Email</label>
                <input type="email" name="email" required className="w-full bg-[#0a0a0a] border premium-border p-4 text-sm font-mono focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">Subject</label>
              <select name="subject" className="w-full bg-[#0a0a0a] border premium-border p-4 text-sm font-mono focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors text-white/70">
                <option value="Custom Build Inquiry">Custom Build Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">Message</label>
              <textarea name="message" required rows={6} className="w-full bg-[#0a0a0a] border premium-border p-4 text-sm font-mono focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors resize-none" placeholder="How can we help you?"></textarea>
            </div>
            
            {status === 'error' && (
              <div className="text-red-400 text-xs font-mono">Oops! There was a problem submitting your form.</div>
            )}
            
            <button type="submit" disabled={status === 'submitting'} className="px-10 py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-[var(--color-gapr-accent)] hover:text-white transition-colors duration-500 disabled:opacity-50">
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
