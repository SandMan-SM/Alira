"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sparkles, Crown, Diamond, Star, Check, Heart, BookOpen, Users, Video, MessageCircle } from "lucide-react";

const tiers = [
  {
    id: "seeker",
    name: "Seeker",
    price: 29,
    period: "month",
    description: "Perfect for those just beginning their spiritual journey.",
    features: [
      "Access to community portal",
      "Weekly meditation recordings",
      "Monthly live Q&A sessions",
      "Newsletter subscription",
      "Resource library access"
    ],
    icon: Star,
    color: "from-gray-400 to-gray-600",
    popular: false
  },
  {
    id: "dedicated",
    name: "Dedicated",
    price: 79,
    period: "month",
    description: "For committed seekers ready to deepen their practice.",
    features: [
      "All Seeker benefits",
      "Bi-weekly live sessions",
      "Course discounts (20%)",
      "Priority support",
      "Exclusive content library",
      "Member discussion forums",
      "Monthly healing circles"
    ],
    icon: Diamond,
    color: "from-purple-500 to-indigo-600",
    popular: true
  },
  {
    id: "visionary",
    name: "Visionary",
    price: 197,
    period: "month",
    description: "For those called to lead and transform others.",
    features: [
      "All Dedicated benefits",
      "Monthly coaching call",
      "Early access to new programs",
      "Course discounts (40%)",
      "Private community channel",
      "Quarterly mastermind sessions",
      "Annual retreat invitation",
      "Business guidance calls"
    ],
    icon: Crown,
    color: "from-amber-400 to-yellow-600",
    popular: false
  }
];

const benefits = [
  {
    icon: BookOpen,
    title: "Exclusive Courses",
    description: "Members-only courses on meditation, intuition, and spiritual development."
  },
  {
    icon: Video,
    title: "Live Sessions",
    description: "Regular live sessions with ALIRA instructors and guest experts."
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with a global community of like-minded seekers."
  },
  {
    icon: Heart,
    title: "Support",
    description: "Direct access to our team for questions and guidance."
  }
];

export default function MembershipPage() {
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
              Membership
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our <span className="text-[#8b5cf6]">Community</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Three tiers of membership designed to support your spiritual growth 
              at every stage of your journey.
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

          {/* Tiers */}
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div 
                key={tier.id}
                className={`relative rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
                  tier.popular 
                    ? "bg-gradient-to-b from-[#8b5cf6]/20 to-[#120d1f] border-[#8b5cf6]/50" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8b5cf6] text-white text-xs font-bold tracking-[0.1em] uppercase rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tier.color} flex items-center justify-center mb-6`}>
                  <tier.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-white/60 text-sm mb-4">{tier.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                  <span className="text-white/60">/{tier.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-white/70">
                      <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/signup?membership=${tier.id}`}
                  className={`block w-full py-4 text-center font-bold tracking-[0.1em] uppercase rounded-full transition-all ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)]"
                      : "border border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  Join Now
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Teaser */}
          <div className="mt-20 text-center">
            <p className="text-white/60 mb-6">Questions about membership?</p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-[#8b5cf6] hover:text-[#a78bfa] transition-colors"
            >
              Contact Us
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
