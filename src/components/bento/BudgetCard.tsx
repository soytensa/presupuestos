'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BudgetCardProps {
  id: string;
  client: string;
  address?: string;
  total: number;
  status: string;
  createdAt?: string;
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'Aceptado':
    case 'Finalizado':
      return 'bg-primary/10 border-primary/20 text-primary';
    case 'En Revisión':
    case 'Pendiente':
      return 'bg-tertiary/10 border-tertiary/20 text-tertiary';
    default:
      return 'bg-surface-variant border-white/5 text-on-surface-variant';
  }
}

export function BudgetCard({ id, client, address, total, status, createdAt }: BudgetCardProps) {
  const router = useRouter();
  const formattedTotal = total.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const displayName = address || client;
  const createdLabel = createdAt
    ? new Date(createdAt).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <div
      onClick={() => router.push(`/project/${id}`)}
      className="bg-surface-container/40 backdrop-blur-md border border-sky-300/15 rounded-[30px] p-6 shadow-lg hover:bg-surface-container/60 transition-colors relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Cliente</span>
          <span className="text-on-surface font-semibold text-base leading-tight max-w-[200px]">{displayName}</span>
        </div>

        <div className={`border text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase ${getStatusClasses(status)}`}>
          {status}
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between">
        <div>
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Presupuesto</div>
          <div className="text-4xl font-bold tracking-tighter text-on-surface flex items-baseline">
            {formattedTotal}
            <span className="text-primary/50 text-2xl ml-1 font-medium">€</span>
          </div>
        </div>
        {createdLabel ? (
          <span className="text-[10px] text-on-surface-variant/50 font-medium mb-1">Creado: {createdLabel}</span>
        ) : null}
      </div>
    </div>
  );
}
