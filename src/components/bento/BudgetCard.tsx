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
      className="bg-surface/60 backdrop-blur-xl border border-primary/10 rounded-[30px] p-6 shadow-lg shadow-black/20 hover:bg-surface/75 transition-colors relative overflow-hidden group cursor-pointer w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Cliente</span>
          <span className="text-on-surface font-semibold text-lg">{client}</span>
        </div>
        
        {/* Dynamic status chip styling similar to Stitch */}
        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase border ${
          status === 'Aceptado' || status === 'Finalizado' 
            ? 'bg-primary/10 border-primary/20 text-primary'
            : status === 'En Revisión' || status === 'Pendiente'
            ? 'bg-tertiary/10 border-tertiary/20 text-tertiary'
            : 'bg-surface-variant border-white/5 text-on-surface-variant'
        }`}>
          {status}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Presupuesto</div>
        <div className="text-4xl font-bold tracking-tighter text-on-surface flex items-baseline">
          <span className="text-primary/50 text-2xl mr-1 font-medium">$</span>
          {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}
