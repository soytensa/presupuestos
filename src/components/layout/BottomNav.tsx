'use client';

import React from 'react';
import { Home, PlusSquare, FileText, Settings } from 'lucide-react';

/**
 * BottomNav Component
 * Optimizado para uso con una sola mano en iPhone.
 * Estética Pure OLED Black.
 */

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-gray-900 px-6 py-4 pb-8 flex justify-between items-center z-50">
      <NavItem icon={<Home size={24} />} label="Inicio" active />
      <NavItem icon={<PlusSquare size={24} />} label="Nuevo" />
      <NavItem icon={<FileText size={24} />} label="Proyectos" />
      <NavItem icon={<Settings size={24} />} label="Ajustes" />
    </nav>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#39FF14]' : 'text-gray-500 hover:text-gray-300'}`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}
