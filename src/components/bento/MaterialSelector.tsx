'use client';

import React from 'react';
import materialsData from '@/lib/data/materials.json';
import { Plus } from 'lucide-react';

/**
 * MaterialSelector Component
 * Permite seleccionar partidas de la lista "curada" de Wilson.
 * Estética Bento OLED.
 */

interface MaterialSelectorProps {
  onAdd: (material: any) => void;
}

export function MaterialSelector({ onAdd }: MaterialSelectorProps) {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-[30px] p-6">
      <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">Añadir Partida</h4>
      <div className="grid grid-cols-1 gap-3">
        {materialsData.map((mat) => (
          <div 
            key={mat.id}
            onClick={() => onAdd(mat)}
            className="flex justify-between items-center bg-black/40 border border-gray-800/50 p-4 rounded-[24px] active:scale-95 transition-all cursor-pointer group hover:border-[#39FF14]/30"
          >
            <div>
              <p className="text-sm font-bold text-gray-200 group-hover:text-white">{mat.name}</p>
              <p className="text-[9px] text-gray-600 uppercase font-bold">{mat.category} · {mat.unit}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-[#39FF14] group-hover:bg-[#39FF14] group-hover:text-black transition-colors">
              <Plus size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
