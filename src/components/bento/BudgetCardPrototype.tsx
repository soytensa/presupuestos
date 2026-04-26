'use client';

import React from 'react';

/**
 * Prototipo de Tarjeta de Presupuesto
 * Normalización de tamaños: 14-16px cuerpo, 20px precio.
 * Estética minimalista, alto contraste.
 */

export function BudgetCardPrototype() {
  return (
    <div className="w-full max-w-[360px] bg-black border border-zinc-900 rounded-[24px] p-5 flex flex-col gap-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Cliente</span>
          <span className="text-sm text-zinc-300 font-medium">Juan Pérez</span>
        </div>
        <div className="bg-zinc-900/50 px-2 py-1 rounded-full">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">12 Abr · Finalizado</span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold text-white leading-tight">Calle Goya 32, 2ºB</span>
        <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-tighter mt-1">Reforma Integral de Cocina</span>
      </div>

      <div className="flex justify-between items-end mt-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total Presupuesto</span>
          <span className="text-2xl font-black text-[#39FF14] tracking-tight">3.303,30 €</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}
