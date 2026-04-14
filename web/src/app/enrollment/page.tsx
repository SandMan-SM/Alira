"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Sparkles, FileText, Users, Check, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { createEnrollment, getPrograms, Program } from "@/lib/alira-db";

const programs = [
  { id: "initiate", name: "Initiate", price: 997 },
  { id: "medium", name: "Medium", price: 4997 },
  { id: "master", name: "Master", price: 9997 },
];

export default function EnrollmentPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    program: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createEnrollment(formData);
      setSuccess(true);
      setFormData({ first_name: "", last_name: "", email: "", phone: "", program: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      
      <section className="relative pt-[72px] md:pt-[80px] pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-4 h-4" />
              Enrollment
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Begin Your <span className="text-[#8b5cf6]">Journey</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Join our transformative spiritual programs and awaken your true potential.
            </p>
          </div>

          {success ? (
            <div className="text-center p-12 rounded-3xl bg-[#10b981]/10 border border-[#10b981]/30">
              <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
              <p className="text-white/60 mb-6">We'll be in touch soon with next steps.</p>
              <button onClick={() => setSuccess(false)} className="text-[#8b5cf6] hover:text-[#a78bfa] font-semibold">
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Application Form</h3>
                
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#8b5cf6]"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#8b5cf6]"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-white/60 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#8b5cf6]"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-white/60 text-sm mb-2">Phone (optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#8b5cf6]"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-white/60 text-sm mb-2">Select Program</label>
                  <select
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#8b5cf6]"
                  >
                    <option value="" className="bg-[#0a0612]">Choose a program...</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#0a0612]">
                        {p.name} - ${p.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.1em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-12 p-8 rounded-3xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">
            <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {["Lifetime community access", "Weekly live sessions", "Personal transformation roadmap", "Expert guidance"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-white/70">
                  <Check className="w-5 h-5 text-[#8b5cf6]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
