'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { BudgetCard } from '@/components/bento/BudgetCard';
import { getProjects, Project } from '@/lib/data/projects';

export default function Home() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col p-6 pb-32">
        
        {/* Header Estilo Apple */}
        <header className="flex justify-between items-end mt-8 mb-12">
          <div className="flex flex-col">
            <span className="text-secondary mb-1">Wilson Torrez</span>
            <h1 className="text-4xl font-black tracking-tighter text-white">Presupuestos</h1>
          </div>
          <button 
            onClick={loadProjects}
            className="text-[10px] bg-white/5 border border-white/10 px-4 py-2 rounded-full text-zinc-400 font-bold uppercase tracking-widest active:scale-95 transition-all mb-1"
          >
            Actualizar
          </button>
        </header>

        {/* Lista de Proyectos */}
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-secondary">Recientes</h2>
            <span className="text-[10px] text-zinc-700 font-black">{projects.length} TOTAL</span>
          </div>

          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-full h-44 glass animate-pulse"></div>
                ))}
              </div>
            ) : projects.length > 0 ? (
              projects.map((proj) => (
                <BudgetCard 
                  key={proj.id}
                  id={proj.id}
                  client={proj.client_name}
                  address={proj.address}
                  total={proj.total_amount}
                  date={new Date(proj.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  status={proj.status}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center glass border-dashed">
                <p className="text-zinc-500 font-medium mb-4 text-sm px-10">No hay presupuestos todavía.</p>
                <button 
                  onClick={() => router.push('/project/new')}
                  className="text-xs text-white font-bold uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full active:bg-white active:text-black transition-all"
                >
                  Crear el primero
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* FAB Estilo iOS */}
      <button 
        onClick={() => router.push('/project/new')}
        className="fixed bottom-24 right-6 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(255,255,255,0.2)] active:scale-90 transition-all z-30"
      >
        <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
}
