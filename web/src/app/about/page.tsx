"use client";

import { Header } from "@/components/Header";
import { Sparkles, Heart, Star, Moon, Sun, Crown, BookOpen } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Authentic Connection",
    description: "We believe in genuine spiritual connection that transcends dogma and doctrine."
  },
  {
    icon: Star,
    title: "Personal Awakening",
    description: "Each person's journey is unique. We honor individual paths to enlightenment."
  },
  {
    icon: BookOpen,
    title: "Ancient Wisdom",
    description: "Drawing from time-tested traditions while embracing modern understanding."
  },
  {
    icon: Crown,
    title: "Sovereign Leadership",
    description: "Empowering individuals to lead with clarity, compassion, and purpose."
  }
];

const journey = [
  {
    year: "2020",
    title: "The Beginning",
    description: "ALIRA was founded with a vision to bridge ancient spiritual wisdom with modern seekers."
  },
  {
    year: "2021",
    title: "Community Growth",
    description: "Our first cohort of Initiates began their transformation journey together."
  },
  {
    year: "2022",
    title: "Certification Launch",
    description: "The Medium certification program launched, creating a pathway for gifted practitioners."
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "ALIRA reached seekers across 40+ countries, building a worldwide community."
  },
  {
    year: "2024",
    title: "Master Program",
    description: "The Master certification launched, training the next generation of spiritual leaders."
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-[72px] md:pt-[80px] pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-4 h-4" />
              About ALIRA
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-[#8b5cf6]">Story</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Founded on the belief that spiritual awakening is the birthright of every human being, 
              ALIRA guides seekers through profound transformation.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="p-10 rounded-3xl bg-gradient-to-b from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-white/70 leading-relaxed text-center">
                "To awaken conscious leaders who embody ancient wisdom, cultivate intuitive intelligence, 
                and guide humanity toward a more enlightened future through spiritual mastery and authentic service."
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <value.icon className="w-10 h-10 text-[#8b5cf6] mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                  <p className="text-white/50 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
            <div className="max-w-2xl mx-auto">
              {journey.map((item, idx) => (
                <div key={idx} className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex-shrink-0 w-24 text-[#8b5cf6] font-bold">{item.year}</div>
                  <div className="flex-shrink-0 w-4">
                    <div className="w-4 h-4 rounded-full bg-[#8b5cf6]" />
                    {idx < journey.length - 1 && (
                      <div className="w-0.5 h-full bg-[#8b5cf6]/30 ml-1.5 mt-2" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/50">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-white/60 mb-6">Ready to begin your transformation?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/programs"
                className="px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.1em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all"
              >
                View Programs
              </a>
              <a 
                href="/contact"
                className="px-8 py-4 border border-white/20 text-white font-semibold tracking-[0.1em] uppercase rounded-full hover:bg-white/10 transition-all"
              >
                Get in Touch
              </a>
            </div>
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
