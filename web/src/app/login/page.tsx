"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate login - in production, use Supabase auth
    setTimeout(() => {
      setLoading(false);
      window.location.href = redirect;
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      
      <section className="relative pt-[72px] md:pt-[80px] pb-20 flex-1 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                <Sparkles className="w-4 h-4" />
                Welcome Back
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sign In
              </h1>
              
              <p className="text-white/60">
                Access your ALIRA dashboard and continue your journey.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="login-email" className="block text-white/70 text-sm mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-white/70 text-sm mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#8b5cf6]"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-white/60">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#8b5cf6]" />
                    Remember me
                  </label>
                  <Link href="/forgot-password" className="text-[#8b5cf6] hover:text-[#a78bfa]">
                    Forgot password?
                  </Link>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold tracking-[0.1em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign In"} 
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/60">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-[#8b5cf6] hover:text-[#a78bfa] font-semibold">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">© 2024 ALIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function LoginLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-white/40">Loading...</div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
