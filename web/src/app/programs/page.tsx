"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sparkles, Crown, Award, Gem, Heart, ChevronRight, Check, Star, Moon, Sun, ArrowRight, Loader2, BookOpen as BookOpenIcon, Users as UsersIcon } from "lucide-react";
import { getPrograms, type Program } from "@/lib/alira-db";

const BookOpen = ({ className }: { className?: string }) => <BookOpenIcon className={className} />;
const Users = ({ className }: { className?: string }) => <UsersIcon className={className} />;

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const data = await getPrograms();
      setPrograms(data || []);
    } catch (err) {
      console.error("Failed to load programs:", err);
      // Fallback to default programs
      setPrograms([
        { id: "initiate", name: "Initiate", tagline: "Begin Your Journey", price: 997, description: "Foundational spiritual awakening and self-discovery program.", features: ["8-week structured curriculum", "Weekly live sessions", "Access to community portal", "Foundation meditation training"], sort_order: 1 },
        { id: "medium", name: "Medium", tagline: "Awaken Your Gifts", price: 4997, description: "Intermediate program for developing intuitive abilities and spiritual gifts.", features: ["16-week intensive curriculum", "Bi-weekly live sessions", "One-on-one coaching call", "Advanced meditation mastery"], sort_order: 2 },
        { id: "master", name: "Master", tagline: "Transcend & Lead", price: 9997, description: "Advanced certification to become a spiritual leader and practitioner.", features: ["12-month comprehensive program", "Monthly intimate cohort calls", "Quarterly in-person retreats", "3 one-on-one coaching sessions"], sort_order: 3 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const iconMap: Record<string, any> = {
    Initiate: Sun,
    Medium: Moon,
    Master: Crown,
  };

  const colorMap: Record<string, string> = {
    Initiate: "from-amber-500 to-orange-600",
    Medium: "from-purple-500 to-indigo-600",
    Master: "from-amber-400 to-yellow-600",
  };

  const benefits = [
    { icon: BookOpen, title: "Structured Curriculum", description: "Ancient wisdom meets modern methodology in our comprehensive learning system." },
    { icon: Users, title: "Community Support", description: "Connect with like-minded seekers on the same spiritual journey." },
    { icon: Star, title: "Expert Guidance", description: "Learn from experienced spiritual leaders with decades of practice." },
    { icon: Heart, title: "Transformative Experience", description: "Real results that extend beyond the program into your daily life." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-[72px] pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-4 h-4" />
              Certification Programs
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Choose Your <span className="text-[#8b5cf6]">Path</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Three transformative programs designed to guide you through spiritual awakening, 
              gift development, and mastery.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <benefit.icon className="w-8 h-8 text-[#8b5cf6] mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/50 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Programs */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-[#8b5cf6] animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program, idx) => {
                const Icon = iconMap[program.name] || Sun;
                const colorClass = colorMap[program.name] || "from-purple-500 to-indigo-600";
                const isPopular = program.name === "Medium";
                
                return (
                  <div 
                    key={program.id}
                    className={`relative rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
                      isPopular 
                        ? "bg-gradient-to-b from-[#8b5cf6]/20 to-[#120d1f] border-[#8b5cf6]/50" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8b5cf6] text-white text-xs font-bold tracking-[0.1em] uppercase rounded-full">
                        Most Popular
                      </div>
                    )}
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colorClass} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-1">{program.name}</h3>
                    <p className="text-[#8b5cf6] text-sm font-medium mb-4">{program.tagline}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">${program.price?.toLocaleString() || 0}</span>
                    </div>
                    
                    <p className="text-white/60 mb-8">{program.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {(program.features || []).map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 text-white/70">
                          <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      href={`/enrollment?program=${program.id}`}
                      className={`block w-full py-4 text-center font-bold tracking-[0.1em] uppercase rounded-full transition-all ${
                        isPopular
                          ? "bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)]"
                          : "border border-white/20 text-white hover:bg-white/10"
                      }`}
                    >
                      Begin Journey
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* FAQ Teaser */}
          <div className="mt-20 text-center">
            <p className="text-white/60 mb-6">Have questions about which program is right for you?</p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-[#8b5cf6] hover:text-[#a78bfa] transition-colors"
            >
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">© 2024 ALIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
