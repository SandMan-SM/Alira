"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Sparkles, Mail, Send, BookOpen, Star, Heart, Loader2, CheckCircle } from "lucide-react";
import { subscribeNewsletter } from "@/lib/alira-db";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await subscribeNewsletter({ email, first_name: firstName || undefined, source: "website" });
      setSuccess(true);
      setEmail("");
      setFirstName("");
    } catch (err: any) {
      if (err.message?.includes("duplicate")) {
        setError("You're already subscribed!");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      
      <section className="relative pt-[72px] pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Mail className="w-4 h-4" />
              Newsletter
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay <span className="text-[#d4af37]">Connected</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Receive weekly spiritual insights, event updates, and wisdom directly to your inbox.
            </p>
          </div>

          {success ? (
            <div className="text-center p-12 rounded-3xl bg-[#10b981]/10 border border-[#10b981]/30 max-w-md mx-auto">
              <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">You're Subscribed!</h3>
              <p className="text-white/60 mb-6">Check your inbox for a welcome email.</p>
              <button onClick={() => setSuccess(false)} className="text-[#d4af37] hover:text-[#e5c449] font-semibold">
                Subscribe another email
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="First name (optional)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Subscribe to newsletter"
                    className="px-8 py-4 bg-[#d4af37] text-black font-bold tracking-[0.1em] uppercase rounded-full hover:bg-[#e5c449] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Weekly Wisdom", desc: "Spiritual teachings and insights" },
              { icon: Star, title: "Event Updates", desc: "Upcoming workshops and retreats" },
              { icon: Heart, title: "Community Stories", desc: "Transformations from our community" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <item.icon className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
