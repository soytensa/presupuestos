'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Filter } from 'lucide-react';
import { BudgetCard } from '@/components/bento/BudgetCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { getProjects, Project } from '@/lib/data/projects';

const avatarUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB8GmQw7yB52jOvAFE0rt22dhafTuzePVmoA2wJG5L_rx7y6PE0a4W9dTYrb9TmUP8joIdlnlLVwYA3HKLXG8t5n7E64xeg4t_so1_DZg-FA-4pfJOEKvty705oKEWowVZ5CXSkXXpDDgQjDfzq-KlFjGE4YW3XJhOmbcSkP30Ei0QO1XHOtpVxQkWO-541L4PGMVm2ts-aaW15ZO6kWKOWhu8r0gpfFD7_YXzAaBslk-YW85TkLdqvj6NkIUCS9PPGmSV48GBohOQW';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    (async () => {
      const data = await getProjects();
      if (!isActive) return;
      setProjects(data);
      setLoading(false);
    })();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="min-h-screen pb-24">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 h-16 backdrop-blur-xl border-b border-sky-300/10 bg-[#0f1524]/60">
        <div className="flex items-center gap-2 flex-1 basis-0">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-primary/20 shrink-0">
            <img alt="Foto de perfil" className="w-full h-full object-cover" src={avatarUrl} />
          </div>
          <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tight hidden sm:block truncate">
            Hola, Wilson
          </span>
        </div>

        <div className="flex justify-center">
          <span className="text-sm font-black text-sky-300 tracking-[0.2em] uppercase whitespace-nowrap">
            Presupuestos
          </span>
        </div>

        <div className="flex justify-end flex-1 basis-0">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-sky-300"
            type="button"
          >
            <Bell size={24} strokeWidth={2.25} />
          </button>
        </div>
      </header>

      <main className="pt-24 px-5 max-w-2xl mx-auto">
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-on-surface-variant/80">
              Recientes
            </h2>
            <div className="flex items-center gap-1">
              <button
                className="text-primary text-sm font-medium hover:text-primary-fixed transition-colors"
                type="button"
              >
                Ver todos
              </button>
              <button
                onClick={async () => {
                  setLoading(true);
                  const data = await getProjects();
                  setProjects(data);
                  setLoading(false);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-primary"
                type="button"
                aria-label="Filtrar"
              >
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-surface-container/40 backdrop-blur-md border border-sky-300/15 rounded-[30px] p-6 shadow-lg animate-pulse h-52"
                  />
                ))}
              </>
            ) : projects.length > 0 ? (
              projects.map((proj) => (
                <BudgetCard
                  key={proj.id}
                  id={proj.id}
                  client={proj.client_name}
                  address={proj.address}
                  total={proj.total_amount}
                  status={proj.status}
                  createdAt={proj.created_at}
                />
              ))
            ) : (
              <div className="bg-surface-container/40 backdrop-blur-md border border-sky-300/15 rounded-[30px] p-6 shadow-lg">
                <p className="text-on-surface-variant text-sm">
                  No hay presupuestos todavía. Crea el primero desde el botón <span className="text-primary">Nuevo</span>.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
