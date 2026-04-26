'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * BudgetCard Component
 * Diseño minimalista normalizado (Fuentes 14-16px, Títulos 18-20px).
 * Estética Pure OLED.
 */

interface BudgetCardProps {
  address: string;
  client: string;
  total: number;
  date: string;
  status: string;
  onClick?: () => void;
}

export function BudgetCard({ address, client, total, date, status, onClick }: BudgetCardProps) {
  return (
    <div 
      onClick={onClick}
      className="w-full bg-black border border-zinc-900 rounded-[24px] p-5 flex flex-col gap-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer hover:border-zinc-800"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Cliente</span>
          <span className="text-sm text-zinc-300 font-medium">{client}</span>
        </div>
        <div className="bg-zinc-900/50 px-2.5 py-1 rounded-full border border-zinc-800/50">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">{date} · {status}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold text-white leading-tight tracking-tight">{address}</span>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total Presupuesto</span>
          <span className="text-2xl font-black text-[#39FF14] tracking-tighter">
            {total.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
          </span>
        </div>
        <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-[#39FF14] transition-colors">
           <ArrowRight size={18} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
