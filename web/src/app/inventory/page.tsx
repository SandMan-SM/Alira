"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sparkles, Package, ShoppingBag, Book, Gem, ArrowRight, Loader2 } from "lucide-react";
import { getInventory, InventoryItem } from "@/lib/alira-db";

export default function InventoryPage() {
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const data = await getInventory();
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to load inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (id: string) => {
    setCart([...cart, id]);
  };

  const categoryIcons: Record<string, any> = {
    Books: Book,
    Crystals: Gem,
    Accessories: Package,
    Bundles: ShoppingBag,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      
      <section className="relative pt-[72px] pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#10b981]/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Package className="w-4 h-4" />
              Inventory
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sacred <span className="text-[#10b981]">Resources</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Tools and resources to support your spiritual journey.
            </p>
          </div>

          {cart.length > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#10b981] text-black font-bold rounded-full shadow-lg flex items-center gap-4 z-50">
              <span>{cart.length} item{cart.length > 1 ? "s" : ""} in cart</span>
              <button className="px-4 py-1 bg-black text-white rounded-full text-sm">Checkout</button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-[#10b981] animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No products available at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                const Icon = categoryIcons[product.category || "Accessories"] || Package;
                return (
                  <div key={product.id} className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#10b981]/50 transition-all hover:scale-[1.02]">
                    <div className="w-14 h-14 rounded-2xl bg-[#10b981]/20 flex items-center justify-center mb-4 group-hover:bg-[#10b981]/30 transition-colors">
                      <Icon className="w-7 h-7 text-[#10b981]" />
                    </div>
                    
                    <p className="text-[#10b981] text-xs font-semibold tracking-[0.1em] uppercase mb-2">{product.category}</p>
                    <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <p className="text-white font-bold text-xl mb-4">${product.price}</p>
                    
                    <button 
                      onClick={() => addToCart(product.id!)}
                      disabled={product.stock === 0}
                      className="w-full py-3 border border-white/20 text-white text-sm font-semibold tracking-[0.1em] uppercase rounded-full hover:bg-[#10b981] hover:border-[#10b981] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-white/60 mb-6">Custom orders and bulk purchases available</p>
            <a href="/contact" className="inline-flex items-center gap-2 text-[#10b981] font-semibold hover:gap-4 transition-all">
              Contact for Custom Orders <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
