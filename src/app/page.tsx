'use client';

import React, { useState, useEffect } from 'react';
import { PinLogin } from '@/components/auth/PinLogin';
import { BudgetCard } from '@/components/bento/BudgetCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { getProjects, Project } from '@/lib/data/projects';
import { Plus } from 'lucide-react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Nuevo PIN de seguridad
  const CORRECT_PIN = "4536";

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  async function loadProjects() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  if (!isAuthenticated) {
    return (
      <PinLogin 
        correctPin={CORRECT_PIN} 
        onSuccess={() => setIsAuthenticated(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col p-6 pb-32">
        
        {/* Header Minimalista */}
        <header className="flex justify-between items-center mt-4 mb-10 px-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Bienvenido</span>
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">Hola, Wilson</h2>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="text-[#39FF14] text-lg font-black uppercase tracking-tighter leading-none">presupuestos</h1>
            <span className="text-[9px] text-zinc-700 font-black uppercase tracking-widest mt-1">v0.1.0</span>
          </div>
        </header>

        {/* Lista de Presupuestos Vertical */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1 mb-2">
            <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">Presupuestos Recientes</h3>
            <button 
              onClick={loadProjects}
              className="text-[9px] bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-full font-bold active:scale-95 transition-transform"
            >
              Actualizar
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="flex flex-col gap-4 animate-pulse">
                {[1, 2].map((i) => (
                  <div key={i} className="h-32 bg-zinc-900/50 rounded-[24px]" />
                ))}
              </div>
            ) : projects.length > 0 ? (
              projects.map((proj) => (
                <BudgetCard 
                  key={proj.id}
                  client={proj.client_name}
                  address={proj.address}
                  total={proj.total_amount}
                  date={new Date(proj.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  status={proj.status}
                />
              ))
            ) : (
              <div className="bg-zinc-900/20 border border-dashed border-zinc-800 rounded-[24px] p-12 text-center">
                <p className="text-zinc-600 text-xs uppercase tracking-widest font-bold">No hay presupuestos</p>
                <p className="text-[9px] text-zinc-800 mt-2">Pulsa el botón + para crear uno</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer Branding */}
        <footer className="mt-16 text-center">
           <p className="text-zinc-800 text-[9px] font-bold uppercase tracking-[0.3em]">
             Wilson Torrez · Proyectos de Reforma
           </p>
        </footer>
      </div>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-28 right-6 w-14 h-14 bg-[#39FF14] text-black rounded-full shadow-[0_0_20px_rgba(57,255,20,0.3)] flex items-center justify-center active:scale-90 active:rotate-90 transition-all z-40">
        <Plus size={32} strokeWidth={3} />
      </button>

      <BottomNav />
    </div>
  );
}







