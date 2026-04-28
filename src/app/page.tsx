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
    <div className="min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 top-app-bar">
        <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-primary/20 flex items-center justify-center">
          <span className="text-primary text-xs font-bold">WT</span>
        </div>
        <div className="text-xl font-black text-primary tracking-tighter">
          Glacier Build
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 active:scale-95 transition-all text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-24 px-5 max-w-2xl mx-auto flex flex-col pb-10">
        
        {/* Page Header */}
        <div className="mb-10 flex justify-between items-end">
          <div className="flex flex-col">
            <p className="text-on-surface-variant text-sm font-medium tracking-wide mb-1">Wilson Torrez</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-on-surface tracking-tight">Presupuestos</h1>
          </div>
          <button 
            onClick={loadProjects}
            className="text-xs text-primary font-medium hover:text-primary/80 transition-colors mb-2"
          >
            Actualizar
          </button>
        </div>

        {/* Lista de Proyectos */}
        <section className="flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-on-surface-variant/80">Recientes</h2>
            <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">Ver todos</button>
          </div>

          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-full h-44 glacier-card animate-pulse"></div>
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
                  status={proj.status}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center glacier-card border-dashed">
                <p className="text-surface-variant font-medium mb-6 text-sm px-10">No hay presupuestos todavía. Empieza creando el primero.</p>
                <button 
                  onClick={() => router.push('/project/new')}
                  className="glacier-btn px-6 py-3 uppercase tracking-widest text-xs"
                >
                  Nuevo Presupuesto
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FAB */}
      <button 
        onClick={() => router.push('/project/new')}
        className="fixed bottom-24 right-6 w-16 h-16 bg-on-surface text-background rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(224,232,240,0.2)] hover:scale-105 active:scale-95 transition-all duration-200 z-40"
      >
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe top-app-bar rounded-t-3xl border-t border-primary/15 shadow-2xl">
        <a className="flex flex-col items-center justify-center text-outline hover:text-primary transition-all active:scale-90 duration-200 w-16" href="#">
          <span className="material-symbols-outlined mb-1">grid_view</span>
          <span className="font-inter text-[10px] font-medium uppercase tracking-widest">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1.5 w-20 active:scale-90 duration-200" href="#">
          <span className="material-symbols-outlined mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
          <span className="font-inter text-[10px] font-bold uppercase tracking-widest text-primary">Projects</span>
        </a>
        <a className="flex flex-col items-center justify-center text-outline hover:text-primary transition-all active:scale-90 duration-200 w-16" onClick={() => router.push('/project/new')}>
          <span className="material-symbols-outlined mb-1">add_circle</span>
          <span className="font-inter text-[10px] font-medium uppercase tracking-widest">Add</span>
        </a>
        <a className="flex flex-col items-center justify-center text-outline hover:text-primary transition-all active:scale-90 duration-200 w-16" href="#">
          <span className="material-symbols-outlined mb-1">calendar_today</span>
          <span className="font-inter text-[10px] font-medium uppercase tracking-widest">Schedule</span>
        </a>
        <a className="flex flex-col items-center justify-center text-outline hover:text-primary transition-all active:scale-90 duration-200 w-16" href="#">
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-inter text-[10px] font-medium uppercase tracking-widest">Profile</span>
        </a>
      </nav>
    </div>
  );
}
