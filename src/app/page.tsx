'use client';

import React from 'react';
import { BudgetCardPrototype } from '@/components/bento/BudgetCardPrototype';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-8 gap-12">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[#39FF14] text-2xl font-black uppercase tracking-tighter">presupuestos</h1>
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold">Validación de Escala v2</p>
      </div>

      <BudgetCardPrototype />

      <div className="max-w-[300px] text-center">
        <p className="text-zinc-500 text-xs leading-relaxed">
          He ajustado la fuente del cuerpo a <span className="text-white font-bold">14px</span>, el título de dirección a <span className="text-white font-bold">18px</span> y el precio a <span className="text-white font-bold">24px</span>. 
          Los bordes son de <span className="text-white font-bold">24px</span> para un look más refinado.
        </p>
      </div>

      <button className="bg-zinc-900 text-zinc-400 text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full border border-zinc-800">
        Confirmar Diseño
      </button>
    </main>
  );
}





