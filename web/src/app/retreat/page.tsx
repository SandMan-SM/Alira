import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Moon,
  Sun,
  Star,
  Heart,
  Flame,
  Crown,
  Gem,
  Calendar,
  MapPin,
  Clock,
  Check,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Goddess Blueprint Activation Retreat | ALIRA",
  description:
    "A four-day sacred immersion to awaken your divine feminine blueprint. August 14–17, 2026. Early bird $1,444 until June 1.",
  openGraph: {
    title: "Goddess Blueprint Activation Retreat | ALIRA",
    description:
      "A four-day sacred immersion to awaken your divine feminine blueprint. August 14–17, 2026.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goddess Blueprint Activation Retreat | ALIRA",
    description:
      "A four-day sacred immersion to awaken your divine feminine blueprint. August 14–17, 2026.",
  },
};

const pillars = [
  {
    icon: Crown,
    title: "Sovereign Feminine",
    desc: "Reclaim your inner queen and step into rooted, regal power.",
  },
  {
    icon: Flame,
    title: "Sacred Embodiment",
    desc: "Move from concept to cellular knowing — wisdom lived in the body.",
  },
  {
    icon: Moon,
    title: "Lunar Wisdom",
    desc: "Attune to cyclical intelligence and the rhythms of the divine feminine.",
  },
  {
    icon: Heart,
    title: "Heart Activation",
    desc: "Open the heart temple and let love become your operating frequency.",
  },
  {
    icon: Star,
    title: "Soul Blueprint",
    desc: "Decode the original codes you came here to embody and express.",
  },
  {
    icon: Gem,
    title: "Sisterhood Circle",
    desc: "Be witnessed and held in a vessel of high-vibrational sisters.",
  },
];

const itinerary = [
  {
    day: "Day 1",
    date: "August 14",
    title: "Arrival & Opening Ceremony",
    items: [
      "Sacred welcome and intention setting",
      "Cacao ceremony and opening circle",
      "Goddess invocation ritual",
    ],
  },
  {
    day: "Day 2",
    date: "August 15",
    title: "Activation & Awakening",
    items: [
      "Sunrise breathwork and meditation",
      "Goddess archetype embodiment journey",
      "Womb wisdom and sound healing",
    ],
  },
  {
    day: "Day 3",
    date: "August 16",
    title: "Sacred Embodiment",
    items: [
      "Movement medicine and ecstatic dance",
      "Energy work and somatic release",
      "Fireside ceremony under the stars",
    ],
  },
  {
    day: "Day 4",
    date: "August 17",
    title: "Integration & Closing",
    items: [
      "Integration practices and journaling",
      "Vision casting and soul commitments",
      "Closing ceremony and sisterhood blessing",
    ],
  },
];

const included = [
  "All ceremonies, workshops, and group sessions",
  "Daily nourishing plant-based meals",
  "Sacred materials and ritual tools",
  "Goddess Blueprint workbook and journal",
  "Lifetime access to the sisterhood circle",
  "Post-retreat integration support",
];

export default function RetreatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      {/* Hero */}
      <section className="relative pt-[88px] sm:pt-[100px] pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/15 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase mb-6 sm:mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              Sacred Retreat · 2026
            </div>

            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-display mb-4 sm:mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              The <span className="text-[#d4af37]">Goddess Blueprint</span>
              <br />
              <span className="text-[#8b5cf6]">Activation</span>
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              A four-day immersion to awaken the codes of the divine feminine,
              embody your soul&apos;s blueprint, and rise as the woman you came here to be.
            </p>

            {/* Event meta */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full surface-glass">
                <Calendar className="w-4 h-4 text-[#8b5cf6]" />
                <span className="text-sm text-white/80">August 14–17, 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full surface-glass">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span className="text-sm text-white/80">4 Sacred Days</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full surface-glass">
                <MapPin className="w-4 h-4 text-[#8b5cf6]" />
                <span className="text-sm text-white/80">Utah</span>
              </div>
            </div>

            {/* Early bird banner */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#8b5cf6]/20 border border-[#d4af37]/40 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              <Flame className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4af37]">
                Early Bird $1,444 · Ends June 1
              </span>
            </div>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                href="#reserve"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.15em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all duration-300 text-center text-sm sm:text-base"
              >
                Reserve Your Place
              </Link>
              <Link
                href="#about"
                className="w-full sm:w-auto px-8 py-4 border border-white/10 text-white font-semibold tracking-[0.1em] uppercase rounded-full hover:bg-white/5 transition-all duration-300 text-center text-sm sm:text-base"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Crown className="w-4 h-4" />
              The Calling
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-display mb-6">
              Remember <span className="text-[#d4af37]">Who She Is</span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
              There is a woman within you who has been waiting. She knows the ancient
              codes. She remembers the original blueprint. She has been calling you
              home through whispers, through longing, through the parts of life that
              no longer fit.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              The Goddess Blueprint Activation is four days carved out of ordinary
              time — a sacred container where she can finally step forward. You will
              leave activated, embodied, and unmistakably more yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 sm:py-24 relative bg-[#0d0915]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-display mb-4">
              The Six <span className="text-[#8b5cf6]">Activations</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Each day weaves these sacred currents into a complete embodied
              transmission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="surface-card p-6 sm:p-8 hover:border-[#8b5cf6]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mb-5 rounded-full bg-gradient-to-br from-[#8b5cf6]/20 to-[#d4af37]/20 flex items-center justify-center group-hover:from-[#8b5cf6]/30 group-hover:to-[#d4af37]/30 transition-colors">
                  <pillar.icon className="w-6 h-6 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sun className="w-4 h-4" />
              Four Sacred Days
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-display mb-4">
              The <span className="text-[#8b5cf6]">Journey</span>
            </h2>
          </div>

          <div className="space-y-6">
            {itinerary.map((day, i) => (
              <div
                key={i}
                className="surface-card p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8"
              >
                <div className="md:w-48 flex-shrink-0">
                  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4af37] mb-1">
                    {day.day}
                  </div>
                  <div className="text-2xl font-bold text-display text-white">
                    {day.date}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-heading mb-4">
                    {day.title}
                  </h3>
                  <ul className="space-y-2">
                    {day.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-white/70 text-sm sm:text-base"
                      >
                        <Sparkles className="w-4 h-4 text-[#8b5cf6] flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 sm:py-24 relative bg-[#0d0915]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-display mb-4">
              What&apos;s <span className="text-[#d4af37]">Included</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Your investment holds every detail of the sacred container.
            </p>
          </div>

          <div className="surface-card p-6 sm:p-10">
            <ul className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {included.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/80 text-sm sm:text-base"
                >
                  <div className="w-6 h-6 rounded-full bg-[#8b5cf6]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing / Reserve */}
      <section
        id="reserve"
        className="py-16 sm:py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8b5cf6]/15 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-display mb-4">
              Claim Your <span className="text-[#d4af37]">Sacred Seat</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Spaces are intentionally limited to preserve the intimacy of the
              container.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Early Bird */}
            <div className="surface-card p-8 sm:p-10 relative overflow-hidden border-[#d4af37]/40">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37]/15 rounded-full blur-[80px]" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#d4af37] text-[#0a0612] text-xs font-bold tracking-[0.2em] uppercase rounded-full whitespace-nowrap">
                Early Bird
              </div>
              <div className="relative z-10 mt-4 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2">
                  Sacred Seat
                </h3>
                <p className="text-white/50 text-sm mb-6">
                  Available until June 1, 2026
                </p>
                <div className="mb-2">
                  <span className="text-5xl sm:text-6xl font-bold text-[#d4af37]">
                    $1,444
                  </span>
                </div>
                <p className="text-sm text-white/40 line-through mb-6">
                  $1,777 standard
                </p>
                <Link
                  href="/contact?retreat=goddess-blueprint-early"
                  className="block w-full py-4 text-center bg-gradient-to-r from-[#d4af37] to-[#e8c84a] text-[#0a0612] font-bold tracking-[0.15em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all"
                >
                  Reserve Early Bird
                </Link>
              </div>
            </div>

            {/* Standard */}
            <div className="surface-card p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#8b5cf6]/15 rounded-full blur-[80px]" />
              <div className="relative z-10 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2 mt-4">
                  Standard Seat
                </h3>
                <p className="text-white/50 text-sm mb-6">
                  After June 1, 2026
                </p>
                <div className="mb-2">
                  <span className="text-5xl sm:text-6xl font-bold text-[#8b5cf6]">
                    $1,777
                  </span>
                </div>
                <p className="text-sm text-white/40 mb-6">Full investment</p>
                <Link
                  href="/contact?retreat=goddess-blueprint"
                  className="block w-full py-4 text-center border border-[#8b5cf6]/40 text-[#8b5cf6] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-[#8b5cf6]/10 transition-all"
                >
                  Reserve Standard
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-white/40 text-xs mt-10 max-w-xl mx-auto">
            Payment plans available upon request. A non-refundable deposit secures
            your space — full balance due July 14, 2026.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/15 to-[#d4af37]/15" />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-display mb-4 sm:mb-6">
            She is <span className="text-[#d4af37]">already within you</span>.
          </h2>
          <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-10">
            This is your invitation to remember.
          </p>
          <Link
            href="#reserve"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.15em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all duration-300 text-sm sm:text-base"
          >
            Reserve Your Place
            <ArrowRight className="w-4 h-4" />
          </Link>
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
              <p className="text-xs text-white/40 uppercase tracking-widest">
                Spiritual Leadership Institute
              </p>
            </div>
            <nav className="flex flex-wrap flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-white/40 uppercase tracking-widest">
              <Link href="/programs" className="hover:text-white transition-colors">
                Programs
              </Link>
              <Link href="/retreat" className="hover:text-white transition-colors">
                Retreat
              </Link>
              <Link href="/membership" className="hover:text-white transition-colors">
                Membership
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </nav>
          </div>
          <div className="text-center mt-8 text-xs text-white/20">
            © 2026 ALIRA. Programs are spiritual development training, not medical
            treatment.
          </div>
        </div>
      </footer>
    </div>
  );
}
