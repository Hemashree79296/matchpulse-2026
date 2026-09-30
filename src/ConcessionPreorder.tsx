import React, { useState } from 'react';
import { Utensils, Clock, ShoppingBag, CheckCircle, Sparkles, AlertCircle, Coffee, Compass } from 'lucide-react';

export interface ConcessionItem {
  id: string;
  name: string;
  stand: string;
  section: string;
  category: 'Food' | 'Drink' | 'Snack';
  price: string;
  prepTimeMin: number;
  dietary: string[];
  queueStatus: 'low' | 'moderate' | 'high';
}

const menuItems: ConcessionItem[] = [
  {
    id: 'c1',
    name: 'MetLife Classic Angus Burger',
    stand: 'Gridiron Grill #14',
    section: 'Sec 118',
    category: 'Food',
    price: '$14.50',
    prepTimeMin: 4,
    dietary: ['Halal Beef Available'],
    queueStatus: 'low'
  },
  {
    id: 'c2',
    name: 'Baja Fish Tacos (3x)',
    stand: 'Cantina Azteca',
    section: 'Sec 204',
    category: 'Food',
    price: '$15.00',
    prepTimeMin: 3,
    dietary: ['Gluten-Free', 'Pescatarian'],
    queueStatus: 'low'
  },
  {
    id: 'c3',
    name: 'Artisan Vegan Falafel Bowl',
    stand: 'Green Garden Express',
    section: 'Sec 105',
    category: 'Food',
    price: '$13.00',
    prepTimeMin: 2,
    dietary: ['100% Vegan', 'Halal'],
    queueStatus: 'low'
  },
  {
    id: 'c4',
    name: 'Zero-Proof Craft Citrus Cooler',
    stand: 'Hydro Refresh Bar',
    section: 'Sec 112',
    category: 'Drink',
    price: '$7.50',
    prepTimeMin: 1,
    dietary: ['Non-Alcoholic', 'Low Sugar'],
    queueStatus: 'low'
  },
  {
    id: 'c5',
    name: 'Warm Stadium Churro Bites',
    stand: 'Dulce Bakery Stand',
    section: 'Sec 322',
    category: 'Snack',
    price: '$8.00',
    prepTimeMin: 2,
    dietary: ['Vegetarian'],
    queueStatus: 'high'
  },
  {
    id: 'c6',
    name: 'Local IPA Draft Beer (20oz)',
    stand: 'East Coast Brews',
    section: 'Sec 220',
    category: 'Drink',
    price: '$16.00',
    prepTimeMin: 1,
    dietary: ['21+ Verified'],
    queueStatus: 'moderate'
  }
];

export const ConcessionPreorder: React.FC = () => {
  const [cart, setCart] = useState<ConcessionItem[]>([]);
  const [ordered, setOrdered] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Food' | 'Drink' | 'Snack'>('All');

  const addToCart = (item: ConcessionItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrdered(true);
  };

  const filteredMenu = menuItems.filter(item => 
    categoryFilter === 'All' ? true : item.category === categoryFilter
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>AI Express Concessions • Skip The Line</span>
          </h4>
          <p className="text-xs text-slate-400">Order from your seat — smart pick-up window timing synced with match clock</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {(['All', 'Food', 'Drink', 'Snack'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                categoryFilter === cat ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Menu Catalog */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h5 className="text-xs font-bold text-slate-100">{item.name}</h5>
                  <span className="text-xs font-black text-amber-400">{item.price}</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                  <span>{item.stand}</span>
                  <span>•</span>
                  <span className="text-amber-300/80">{item.section}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.dietary.map((d, i) => (
                    <span key={i} className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-md border border-slate-700 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.queueStatus === 'low'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : item.queueStatus === 'moderate'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  ~{item.prepTimeMin}m prep time
                </span>

                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Basket & Express AI Window */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Express Pick-up Tray ({cart.length})</span>
              </span>
              {cart.length > 0 && (
                <button onClick={() => setCart([])} className="text-[10px] text-slate-500 hover:text-rose-400">
                  Clear
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                <Coffee className="w-8 h-8 mx-auto text-slate-700 mb-2" />
                <span>Your express tray is empty. Add concessions to generate a timed fast-lane pickup pass.</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cart.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-900 p-2 rounded-lg text-xs">
                    <div>
                      <span className="text-slate-200 font-medium block">{c.name}</span>
                      <span className="text-[10px] text-slate-400">{c.stand}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-amber-400">{c.price}</span>
                      <button onClick={() => removeFromCart(idx)} className="text-slate-500 hover:text-rose-400 font-bold">×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!ordered ? (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>AI queue-skip ready: Priority Fast Lane Lane #3</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                  cart.length > 0
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Confirm Express Pre-Order
              </button>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>Pass Issued: #FIFA-FAST-882</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Head to <strong>Stand #14 (Section 118)</strong> at <strong>Minute 75'</strong> for instant pickup. Zero queue guaranteed.
              </p>
              <button
                onClick={() => { setOrdered(false); setCart([]); }}
                className="w-full mt-2 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg text-[10px] font-semibold hover:bg-slate-800"
              >
                Place Another Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
