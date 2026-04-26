'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';

interface BudgetCardProps {
  id: string;
  address: string;
  client: string;
  total: number;
  date: string;
  status: string;
}

export function BudgetCard({ id, address, client, total, date, status }: BudgetCardProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/project/${id}`)}
      className="w-full google-card p-5 flex flex-col gap-4 active:scale-[0.99] transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Cliente</span>
          <span className="text-lg font-bold text-zinc-200 tracking-tight">{client}</span>
        </div>
        <div className={`chip ${status === 'Aceptado' ? 'chip-active' : 'bg-transparent text-zinc-400'}`}>
          {status}
        </div>
      </div>

      <div className="flex justify-between items-end pt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Presupuesto</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white tracking-tighter">{total.toLocaleString('es-ES')}</span>
            <span className="text-xs font-bold text-zinc-500">€</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-zinc-500">
          <Calendar size={12} />
          <span className="text-[10px] font-bold uppercase">{date}</span>
        </div>
      </div>
    </div>
  );
}
