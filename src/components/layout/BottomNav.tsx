'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BadgeDollarSign, Tag, Plus, Boxes, Settings } from 'lucide-react';

export function BottomNav() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 w-full z-50 h-20 flex justify-between items-center px-4 pb-safe">
      <div className="absolute inset-0 z-[-1]">
        <svg className="w-full h-full fill-[#0f1524]/90 backdrop-blur-2xl" preserveAspectRatio="none" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20 L150 20 Q175 20 180 0 L180 0 Q200 -5 220 0 L220 0 Q225 20 250 20 L400 20 L400 100 L0 100 Z" stroke="rgba(125,211,252,0.15)" strokeWidth="1" />
        </svg>
      </div>

      <button className="flex flex-col items-center justify-center text-sky-300 w-16 pt-4" type="button">
        <BadgeDollarSign size={22} className="mb-1" strokeWidth={2.2} />
        <span className="font-inter text-[8px] font-bold uppercase tracking-widest">PRESUPUESTOS</span>
      </button>

      <button className="flex flex-col items-center justify-center text-slate-500 hover:text-sky-200 transition-all w-16 pt-4" type="button">
        <Tag size={22} className="mb-1" strokeWidth={2.2} />
        <span className="font-inter text-[8px] font-medium uppercase tracking-widest">PRECIOS</span>
      </button>

      <div className="relative -top-6 flex justify-center w-16">
        <button
          onClick={() => router.push('/project/new')}
          className="w-14 h-14 bg-sky-300 text-black rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(125,211,252,0.4)] active:scale-95 transition-transform"
          type="button"
          aria-label="Nuevo"
        >
          <Plus size={28} strokeWidth={2.6} />
        </button>
      </div>

      <button className="flex flex-col items-center justify-center text-slate-500 hover:text-sky-200 transition-all w-16 pt-4" type="button">
        <Boxes size={22} className="mb-1" strokeWidth={2.2} />
        <span className="font-inter text-[8px] font-medium uppercase tracking-widest">MATERIALES</span>
      </button>

      <button className="flex flex-col items-center justify-center text-slate-500 hover:text-sky-200 transition-all w-16 pt-4" type="button">
        <Settings size={22} className="mb-1" strokeWidth={2.2} />
        <span className="font-inter text-[8px] font-medium uppercase tracking-widest">AJUSTES</span>
      </button>
    </nav>
  );
}
