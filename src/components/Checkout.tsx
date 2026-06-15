import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  name: string;
  price: number;
  specs: string[];
}

interface CheckoutProps {
  total?: number;
  cartItems?: CartItem[];
  setView: (view: 'home' | 'models' | 'configurator' | 'contact' | 'checkout') => void;
}

export default function Checkout({ total = 0, cartItems = [], setView }: CheckoutProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = cartItems.length > 0 ? cartItems.reduce((sum, item) => sum + item.price, 0) : total;
  const taxAmount = subtotal * 0.18;
  const grandTotal = subtotal;

  const formattedSubtotal = subtotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const formattedTax = taxAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const formattedTotal = grandTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone && formData.address && formData.city && formData.postalCode;
  };

  const handlePayment = async () => {
    if (!isFormValid()) {
      setErrorMessage('Please fill in all shipping details before proceeding.');
      setPaymentStatus('error');
      setTimeout(() => setPaymentStatus('idle'), 3000);
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Create order via Netlify Function
      const response = await fetch('/.netlify/functions/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          currency: 'INR',
          receipt: `gapr_${Date.now()}`,
          notes: {
            customerName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            items: cartItems.map(i => i.name).join(', ') || 'Custom Build',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order. Please try again.');
      }

      const orderData = await response.json();

      // Open Razorpay Checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Gapr PC Solutions',
        description: cartItems.length > 0
          ? `${cartItems.length} custom PC build${cartItems.length > 1 ? 's' : ''}`
          : 'Custom PC Build',
        order_id: orderData.id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city} - ${formData.postalCode}`,
        },
        theme: {
          color: '#D4AF37',
        },
        handler: function () {
          setPaymentStatus('success');
          setIsProcessing(false);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        setErrorMessage(response.error?.description || 'Payment failed. Please try again.');
        setPaymentStatus('error');
        setIsProcessing(false);
      });
      razorpay.open();
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  // Success state
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[var(--color-gapr-dark)] pt-32 pb-24 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center p-12 glass-panel premium-border"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={64} className="text-[var(--color-gapr-accent)] mx-auto mb-8" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">Payment Successful</h1>
          <p className="text-white/50 font-mono text-sm tracking-widest uppercase mb-4">
            Order confirmed
          </p>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Thank you for your order! A confirmation email has been sent to <span className="text-white/70">{formData.email}</span>. Our team will begin assembling your custom PC right away.
          </p>
          <div className="p-4 bg-[var(--color-gapr-gray)] border premium-border mb-8">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono tracking-widest uppercase text-white/50">Amount Paid</span>
              <span className="text-xl font-mono font-bold text-[var(--color-gapr-accent)]">{formattedTotal}</span>
            </div>
          </div>
          <button
            onClick={() => setView('home')}
            className="px-10 py-4 bg-[var(--color-gapr-accent)] text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-gapr-dark)] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-4">Secure Checkout</h1>
          <p className="text-white/50 font-mono text-sm tracking-widest uppercase">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-12">

            {/* Shipping Info */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8"
            >
              <h2 className="text-xl font-display font-bold tracking-widest uppercase text-[var(--color-gapr-accent)] mb-6 flex items-center gap-3">
                <Truck size={20} />
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-[var(--color-gapr-gray)] border premium-border p-4 text-white focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-[var(--color-gapr-gray)] border premium-border p-4 text-white focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[var(--color-gapr-gray)] border premium-border p-4 text-white focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[var(--color-gapr-gray)] border premium-border p-4 text-white focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50">Street Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-[var(--color-gapr-gray)] border premium-border p-4 text-white focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="123 Gaming Street" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[var(--color-gapr-gray)] border premium-border p-4 text-white focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="Mumbai" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50">Postal Code</label>
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full bg-[var(--color-gapr-gray)] border premium-border p-4 text-white focus:outline-none focus:border-[var(--color-gapr-accent)] transition-colors" placeholder="400001" />
                </div>
              </div>
            </motion.section>

            {/* Payment Method Info */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 glass-panel premium-border"
            >
              <h2 className="text-xl font-display font-bold tracking-widest uppercase text-[var(--color-gapr-accent)] mb-6 flex items-center gap-3">
                <CreditCard size={20} />
                Payment Method
              </h2>

              <div className="flex items-center gap-4 p-6 bg-[var(--color-gapr-gray)] border premium-border">
                <div className="w-12 h-12 bg-[#072654] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Razorpay Secure Checkout</h3>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 mt-1">
                    UPI / Cards / Net Banking / Wallets / EMI
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/30 mt-4 leading-relaxed">
                You will be redirected to Razorpay's secure payment gateway to complete your payment. All major payment methods are supported including UPI, credit/debit cards, net banking, wallets, and EMI options.
              </p>
            </motion.section>
          </div>

          {/* Right Column: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="p-8">
              <h2 className="text-xl font-display font-bold tracking-widest uppercase text-white mb-8">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="pb-4 border-b border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-sm pr-4">{item.name}</h3>
                        <span className="font-mono text-[var(--color-gapr-accent)] text-sm whitespace-nowrap">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-white/40 line-clamp-2">
                        {item.specs.join(' · ')}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="pb-4 border-b border-white/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">
  {cartItems[0]?.name || "Gapr PC"}
</h3>
                        <p className="text-xs text-white/50 mt-1">Configured Build</p>
                      </div>
                      <span className="font-mono text-[var(--color-gapr-accent)] text-sm">{formattedSubtotal}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm text-white/70">
                  <span>Subtotal</span>
                  <span className="font-mono">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-white/70">
                  <span>Shipping</span>
                  <span className="font-mono text-[var(--color-gapr-accent)]">Free</span>
                </div>
                <div className="flex justify-between items-center text-sm text-white/70">
                  <span>Taxes (Included)</span>
                  <span className="font-mono">{formattedTax}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-white/10 mb-8">
                <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                <span className="text-2xl font-mono font-bold text-[var(--color-gapr-accent)]">{formattedTotal}</span>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {paymentStatus === 'error' && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 border border-red-500/30 bg-red-500/10 flex items-start gap-3"
                  >
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300">{errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-5 bg-[var(--color-gapr-accent)] text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Pay with Razorpay</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-white/30 text-[10px] uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>Secure 256-bit SSL Encryption</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
