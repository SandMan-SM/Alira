import { Header } from "@/components/Header";
import { Sparkles, Moon, Sun, Star, Heart, Eye, Feather, Wind } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-[72px] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-semibold tracking-[0.2em] uppercase mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              Spiritual Leadership Institute
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-display mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Awaken Your <span className="text-[#8b5cf6]">Consciousness</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              ALIRA guides seekers through spiritual insight, intuitive intelligence, and ancient wisdom to unlock their highest potential.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/programs" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.15em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all duration-300 text-center text-sm sm:text-base">
                Begin Your Journey
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/10 text-white font-semibold tracking-[0.1em] uppercase rounded-full hover:bg-white/5 transition-all duration-300 text-center text-sm sm:text-base">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-display mb-4">The <span className="text-[#8b5cf6]">Seven Pillars</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our foundational principles for spiritual development and consciousness expansion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Eye, title: "Awareness", desc: "Develop acute perception of your inner and outer worlds" },
              { icon: Heart, title: "Intuition", desc: "Trust your inner guidance system" },
              { icon: Feather, title: "Balance", desc: "Harmonize mind, body, and spirit" },
              { icon: Wind, title: "Flow", desc: "Surrender to life's natural rhythm" },
              { icon: Moon, title: "Reflection", desc: "Journey inward for answers" },
              { icon: Sun, title: "Radiance", desc: "Share your light with the world" },
              { icon: Star, title: "Transcendence", desc: "Awaken to higher consciousness" },
              { icon: Sparkles, title: "Integration", desc: "Embody wisdom in daily life" },
            ].map((pillar, i) => (
              <div key={i} className="surface-card p-4 sm:p-6 text-center hover:border-[#8b5cf6]/30 transition-all duration-300 group">
                <div className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-4 sm:mb-4 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center group-hover:bg-[#8b5cf6]/20 transition-colors">
                  <pillar.icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#8b5cf6]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-heading mb-1 sm:mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-white/50">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 relative bg-[#0d0915]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-display mb-4">Sacred <span className="text-[#d4af37]">Programs</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Structured pathways for your spiritual evolution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Foundation */}
            <div className="surface-card p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#8b5cf6]/10 rounded-full blur-[60px]" />
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2">Level 1: Foundations</h3>
                <p className="text-white/50 mb-4 sm:mb-6">Begin your sacred journey with core spiritual practices.</p>
                <div className="text-2xl sm:text-3xl font-bold text-[#8b5cf6] mb-4 sm:mb-6">$300-800</div>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-white/60 text-sm sm:text-base">
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#8b5cf6]" /> Meditation Mastery</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#8b5cf6]" /> Energy Awareness</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#8b5cf6]" /> Intuition Basics</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#8b5cf6]" /> Consciousness Theory</li>
                </ul>
                <Link href="/programs" className="block w-full py-3 text-center border border-[#8b5cf6]/30 text-[#8b5cf6] font-bold tracking-[0.1em] uppercase rounded-full hover:bg-[#8b5cf6]/10 transition-all">
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Practitioner */}
            <div className="surface-card p-6 sm:p-8 relative overflow-hidden border-[#8b5cf6]/30">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#d4af37]/10 rounded-full blur-[60px]" />
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 bg-[#d4af37] text-[#0a0612] text-xs font-bold tracking-[0.2em] uppercase rounded-full">
                Most Popular
              </div>
              <div className="relative z-10 mt-3 sm:mt-4">
                <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2">Level 2: Practitioner</h3>
                <p className="text-white/50 mb-4 sm:mb-6">Deepen your practice and learn to serve others.</p>
                <div className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-4 sm:mb-6">$2,000-4,000</div>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-white/60 text-sm sm:text-base">
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#d4af37]" /> Energy Healing</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#d4af37]" /> Intuitive Reading</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#d4af37]" /> Spiritual Counseling</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#d4af37]" /> Ethics & Boundaries</li>
                </ul>
                <Link href="/programs" className="block w-full py-3 text-center bg-gradient-to-r from-[#8b5cf6] to-[#d4af37] text-white font-bold tracking-[0.1em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-all">
                  Enroll Now
                </Link>
              </div>
            </div>
            
            {/* Master */}
            <div className="surface-card p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#d4af37]/10 rounded-full blur-[60px]" />
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2">Level 3: Master</h3>
                <p className="text-white/50 mb-4 sm:mb-6">Become a certified spiritual guide and teacher.</p>
                <div className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-4 sm:mb-6">$10,000</div>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-white/60 text-sm sm:text-base">
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#d4af37]" /> Advanced Mediumship</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#d4af37]" /> Energy Mastery</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#d4af37]" /> Teaching Certification</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#d4af37]" /> 6-12 Month Program</li>
                </ul>
                <Link href="/programs" className="block w-full py-3 text-center border border-[#d4af37]/30 text-[#d4af37] font-bold tracking-[0.1em] uppercase rounded-full hover:bg-[#d4af37]/10 transition-all">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="surface-card p-6 sm:p-10 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/10 to-[#d4af37]/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-display mb-4 sm:mb-4">Join the <span className="text-[#8b5cf6]">ALIRA Circle</span></h2>
              <p className="text-white/60 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
                A community of conscious seekers on the path to spiritual enlightenment. Access live teachings, group meditations, and exclusive content.
              </p>
              <div className="text-4xl sm:text-5xl font-bold text-[#8b5cf6] mb-2">$25-75<span className="text-base sm:text-lg text-white/40">/month</span></div>
              <p className="text-white/40 text-sm mb-6 sm:mb-8">Tiered membership based on engagement level</p>
              <Link href="/membership" className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.15em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all duration-300 text-sm sm:text-base w-full sm:w-auto">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-[#0d0915]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-display mb-4">Voices of <span className="text-[#8b5cf6]">Transformation</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { quote: "ALIRA completely transformed my understanding of spirituality. The Level 1 program gave me tools I use every day.", author: "Sarah M.", role: "Foundation Graduate" },
              { quote: "The practitioner training was life-changing. I now run my own healing practice and help others on their journey.", author: "Michael R.", role: "Certified Practitioner" },
              { quote: "Being part of the ALIRA Circle has connected me with amazing like-minded souls. The community is incredibly supportive.", author: "Jennifer L.", role: "Circle Member" },
            ].map((testimonial, i) => (
              <div key={i} className="surface-card p-4 sm:p-6">
                <p className="text-white/70 mb-4 sm:mb-6 italic text-sm sm:text-base">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-[#8b5cf6]">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/20 to-[#d4af37]/20" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-display mb-4 sm:mb-6">Ready to <span className="text-[#8b5cf6]">Awaken</span>?</h2>
          <p className="text-base sm:text-xl text-white/60 mb-8 sm:mb-10">
            Your journey to consciousness begins with a single step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4">
            <Link href="/programs" className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.15em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all duration-300 text-sm sm:text-base">
              Start Today
            </Link>
            <Link href="/about" className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 border border-white/10 text-white font-semibold tracking-[0.1em] uppercase rounded-full hover:bg-white/5 transition-all duration-300 text-sm sm:text-base">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-12 border-t border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-[0.3em] text-[#8b5cf6] uppercase mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                ALIRA
              </div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Spiritual Leadership Institute</p>
            </div>
            <nav className="flex flex-wrap flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-white/40 uppercase tracking-widest">
              <Link href="/programs" className="hover:text-white transition-colors">Programs</Link>
              <Link href="/membership" className="hover:text-white transition-colors">Membership</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <div className="flex gap-4 mt-2 sm:mt-0">
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              </div>
            </nav>
          </div>
          <div className="text-center mt-8 text-xs text-white/20">
            © 2026 ALIRA. Programs are spiritual development training, not medical treatment.
          </div>
        </div>
      </footer>
    </div>
  );
}
