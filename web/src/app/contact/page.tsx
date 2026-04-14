"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Sparkles, Mail, Phone, MapPin, Send, Check, MessageCircle, Loader2 } from "lucide-react";
import { createContact } from "@/lib/alira-db";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    inquiry_type: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createContact(formData);
      setSubmitted(true);
      setFormData({ first_name: "", last_name: "", email: "", phone: "", inquiry_type: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-[72px] pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-4 h-4" />
              Contact Us
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let's <span className="text-[#8b5cf6]">Connect</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Have questions about our programs? Want to learn more about ALIRA? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-white/60">hello@alira.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Support</h3>
                    <p className="text-white/60">Discord Community</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Location</h3>
                    <p className="text-white/60">Global (Remote)</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-white font-semibold mb-2">Office Hours</h3>
                <p className="text-white/60 text-sm">
                  Monday - Friday<br />
                  9:00 AM - 6:00 PM EST
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60">We'll get back to you within 24-48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-first-name" className="block text-white/70 text-sm mb-2">First Name</label>
                      <input
                        id="contact-first-name"
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-last-name" className="block text-white/70 text-sm mb-2">Last Name</label>
                      <input
                        id="contact-last-name"
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-white/70 text-sm mb-2">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-white/70 text-sm mb-2">Phone (optional)</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-white/70 text-sm mb-2">Topic</label>
                    <select
                      id="contact-topic"
                      value={formData.inquiry_type}
                      onChange={(e) => setFormData({...formData, inquiry_type: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8b5cf6]"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="programs">Programs & Courses</option>
                      <option value="membership">Membership</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-white/70 text-sm mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6] h-32 resize-none"
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.1em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">© 2024 ALIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
