'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, Trash2, Edit3, MapPin, 
  Layers, Hammer, Droplets, Zap, PaintRoller,
  X, Save, Loader2, Check, ChevronRight
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Project, deleteProject, updateProject } from '@/lib/data/projects';
import { NumpadSheet } from '@/components/ui/NumpadSheet';

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeNumpad, setActiveNumpad] = useState<'largo' | 'ancho' | 'alto' | null>(null);
  
  const [editData, setEditData] = useState({
    client_name: '',
    address: '',
    status: '',
    largo: '3.0',
    ancho: '3.0',
    alto: '2.5'
  });

  const statuses = ['Borrador', 'Pendiente', 'Aceptado', 'Finalizado'];

  useEffect(() => {
    async function loadProject() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        router.push('/');
      } else {
        setProject(data);
        setEditData({
          client_name: data.client_name,
          address: data.address,
          status: data.status,
          largo: '3.0',
          ancho: '3.0',
          alto: '2.5'
        });
      }
      setLoading(false);
    }
    loadProject();
  }, [id, router]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteProject(id);
      router.push('/');
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      const l = parseFloat(editData.largo) || 0;
      const a = parseFloat(editData.ancho) || 0;
      const newTotal = l * a * 100;

      const updated = await updateProject(id, {
        client_name: editData.client_name,
        address: editData.address,
        status: editData.status,
        total_amount: newTotal
      });
      setProject(updated);
      setIsEditing(false);
    } catch (e) {
      alert('Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#1a1c1e] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-zinc-700 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!project) return null;

  const superficie = (parseFloat(editData.largo) * parseFloat(editData.ancho)).toFixed(1);

  return (
    <div className="min-h-screen bg-[#1a1c1e] text-[#e2e2e6] flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col p-6 pb-32">
        
        {/* Header Google Style */}
        <header className="flex justify-between items-center mt-2 mb-8">
          <button onClick={() => router.push('/')} className="p-2 rounded-full active:bg-zinc-800 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button onClick={() => setIsEditing(true)} className="p-2.5 rounded-full active:bg-zinc-800">
                  <Edit3 size={20} />
                </button>
                <button onClick={handleDelete} className="p-2.5 rounded-full text-red-400 active:bg-red-900/20">
                  <Trash2 size={20} />
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(false)} className="p-2.5 rounded-full">
                <X size={20} />
              </button>
            )}
          </div>
        </header>

        {/* Contenido Principal */}
        <section className="mb-8">
          <div className="flex flex-col gap-2 mb-8">
            {isEditing ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] text-primary font-bold uppercase ml-4">Nombre del Cliente</span>
                   <input 
                    type="text"
                    value={editData.client_name}
                    onChange={(e) => setEditData({...editData, client_name: e.target.value})}
                    className="bg-[#2d3036] rounded-2xl px-6 py-4 text-2xl font-bold text-white outline-none border border-transparent focus:border-primary/50"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] text-primary font-bold uppercase ml-4">Dirección</span>
                   <input 
                    type="text"
                    value={editData.address}
                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                    className="bg-[#2d3036] rounded-2xl px-6 py-3 text-sm text-zinc-400 outline-none"
                  />
                </div>

                {/* Selector de Estado Google Style */}
                <div className="flex flex-col gap-2 mt-2">
                   <span className="text-[10px] text-primary font-bold uppercase ml-4">Estado del Presupuesto</span>
                   <div className="flex flex-wrap gap-2 px-2">
                      {statuses.map(s => (
                        <button
                          key={s}
                          onClick={() => setEditData({...editData, status: s})}
                          className={`chip transition-all ${editData.status === s ? 'chip-active' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}
                        >
                          {s}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                   <span className="chip chip-active bg-primary/10 text-primary border-primary/20">{project.status}</span>
                   <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">{project.client_name}</h1>
                <div className="flex items-center gap-1.5 text-zinc-500 mt-1">
                  <MapPin size={14} className="text-primary" />
                  <span className="text-xs">{project.address}</span>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="google-card p-6 flex flex-col justify-between h-32">
               <span className="text-[10px] text-zinc-500 font-bold uppercase">Superficie</span>
               <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{superficie.replace('.', ',')}</span>
                  <span className="text-xs text-zinc-500 font-bold">m²</span>
               </div>
            </div>
            <div className="google-card p-6 bg-primary/5 border-primary/10 flex flex-col justify-between h-32">
               <span className="text-[10px] text-primary/70 font-bold uppercase">Total</span>
               <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary">{project.total_amount.toLocaleString('es-ES')}</span>
                  <span className="text-xs text-primary font-bold">€</span>
               </div>
            </div>
          </div>
        </section>

        {/* Medidas Edición */}
        {isEditing && (
          <section className="flex flex-col gap-3 mb-8">
            <h3 className="text-[11px] text-zinc-500 font-bold uppercase ml-4">Medidas del espacio</h3>
            <div className="grid grid-cols-3 gap-3">
              {['largo', 'ancho', 'alto'].map((m) => (
                <button 
                  key={m}
                  onClick={() => setActiveNumpad(m as any)} 
                  className="bg-[#2d3036] p-4 rounded-2xl flex flex-col items-center active:bg-zinc-700 transition-colors"
                >
                  <span className="text-[9px] text-zinc-500 font-bold uppercase mb-1">{m}</span>
                  <span className="text-lg font-bold text-white">{editData[m as keyof typeof editData]}m</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Partidas */}
        <section className="flex flex-col gap-4">
          <h3 className="text-[11px] text-zinc-500 font-bold uppercase ml-4">Trabajos</h3>
          <div className="flex flex-col gap-2">
            {[
              { id: 'pladur', name: 'Pladur', icon: <Layers size={18} /> },
              { id: 'pintura', name: 'Pintura', icon: <PaintRoller size={18} /> },
              { id: 'demolicion', name: 'Demolición', icon: <Hammer size={18} /> }
            ].map(cat => (
              <div key={cat.id} className="google-card p-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-zinc-800 rounded-xl text-primary">{cat.icon}</div>
                   <span className="font-bold text-zinc-300">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-xs font-bold text-zinc-500">28,50 €/m²</span>
                   <ChevronRight size={16} className="text-zinc-600" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {isEditing && (
          <button 
            onClick={handleUpdate}
            disabled={isSaving}
            className="mt-10 w-full fab-google py-5 flex justify-center items-center gap-2 shadow-2xl active:scale-[0.98] transition-all"
          >
            {isSaving ? <Loader2 size={24} className="animate-spin" /> : <><Save size={20} /><span>Guardar Cambios</span></>}
          </button>
        )}

      </div>

      <NumpadSheet 
        isOpen={activeNumpad !== null}
        title={activeNumpad ? activeNumpad.toUpperCase() : ''}
        value={activeNumpad ? editData[activeNumpad] : '0'}
        onClose={() => setActiveNumpad(null)}
        onChange={(val) => {
          if (activeNumpad) setEditData({ ...editData, [activeNumpad]: val });
        }}
      />
    </div>
  );
}
