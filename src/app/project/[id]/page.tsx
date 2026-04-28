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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-white/10 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!project) return null;

  const superficie = (parseFloat(editData.largo) * parseFloat(editData.ancho)).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col pb-24 relative overflow-x-hidden">
      <div className="w-full max-w-4xl flex flex-col p-4 md:px-6 lg:px-8 mx-auto mt-20 gap-6">
        
        {/* Header exact Stitch style */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#0a0e1a]/60 backdrop-blur-lg border-b border-primary/10 shadow-[0_8px_32px_0_rgba(10,14,26,0.5)] h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="text-surface-variant hover:bg-primary/10 p-2 rounded-full active:scale-95 transition-transform duration-200 flex items-center justify-center">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-primary font-inter tracking-tight">Presupuesto {project.client_name?.substring(0,6)}...</h1>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button onClick={() => setIsEditing(true)} className="text-surface-variant hover:bg-primary/10 p-2 rounded-full active:scale-95 transition-transform duration-200 flex items-center justify-center">
                  <Edit3 size={20} />
                </button>
                <button onClick={handleDelete} className="text-surface-variant hover:bg-primary/10 p-2 rounded-full active:scale-95 transition-transform duration-200 flex items-center justify-center">
                  <Trash2 size={20} />
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(false)} className="text-surface-variant hover:bg-primary/10 p-2 rounded-full active:scale-95 transition-transform duration-200 flex items-center justify-center">
                <X size={20} />
              </button>
            )}
          </div>
        </header>

        {/* Contenido Principal */}
        <section>
          <div className="flex flex-col gap-1 mt-2 mb-6">
            {isEditing ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] text-primary font-bold uppercase ml-4 tracking-widest">Nombre del Cliente</span>
                   <input 
                    type="text"
                    value={editData.client_name}
                    onChange={(e) => setEditData({...editData, client_name: e.target.value})}
                    className="glacier-input px-6 py-4 text-2xl font-bold text-white outline-none"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] text-primary font-bold uppercase ml-4 tracking-widest">Dirección</span>
                   <input 
                    type="text"
                    value={editData.address}
                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                    className="glacier-input px-6 py-3 text-sm text-surface-variant outline-none"
                  />
                </div>

                {/* Selector de Estado */}
                <div className="flex flex-col gap-2 mt-2">
                   <span className="text-[10px] text-primary font-bold uppercase ml-4 tracking-widest">Estado del Presupuesto</span>
                   <div className="flex flex-wrap gap-2 px-2">
                      {statuses.map(s => (
                        <button
                          key={s}
                          onClick={() => setEditData({...editData, status: s})}
                          className={`chip transition-all ${editData.status === s ? 'chip-active' : ''}`}
                        >
                          {s}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center self-start px-2.5 py-1 rounded-full text-xs font-semibold bg-tertiary/10 text-tertiary border border-tertiary/20 backdrop-blur-sm uppercase">
                  {project.status}
                </div>
                <h2 className="text-2xl font-bold text-white mt-2">Detalles del Presupuesto</h2>
                <p className="text-surface-variant text-sm flex items-center gap-2">
                  <MapPin size={12} /> {project.address}
                </p>
              </>
            )}
          </div>

          {/* Metrics Grid (Bento style) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glacier-card p-5 flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>
               <div className="flex items-center gap-2 text-surface-variant mb-4">
                 <Layers size={14} />
                 <span className="text-xs font-medium tracking-wider uppercase">Superficie</span>
               </div>
               <div>
                  <span className="text-3xl font-bold text-primary">{superficie.replace('.', ',')}</span>
                  <span className="text-sm text-primary/70 font-medium ml-1">m²</span>
               </div>
            </div>
            
            <div className="glacier-card p-5 flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-tertiary/5 rounded-full blur-xl group-hover:bg-tertiary/10 transition-colors"></div>
               <div className="flex items-center gap-2 text-surface-variant mb-4">
                 <Zap size={14} />
                 <span className="text-xs font-medium tracking-wider uppercase">Total</span>
               </div>
               <div>
                  <span className="text-3xl font-bold text-white">{project.total_amount.toLocaleString('es-ES')}</span>
                  <span className="text-sm text-surface-variant font-medium ml-1">€</span>
               </div>
            </div>
          </div>
        </section>

        {/* Medidas Edición */}
        {isEditing && (
          <section className="flex flex-col gap-3 mb-8">
            <h3 className="text-[11px] text-surface-variant font-bold uppercase ml-4 tracking-widest">Medidas del espacio</h3>
            <div className="grid grid-cols-3 gap-3">
              {['largo', 'ancho', 'alto'].map((m) => (
                <button 
                  key={m}
                  onClick={() => setActiveNumpad(m as any)} 
                  className="glacier-card p-4 flex flex-col items-center hover:bg-white/5 transition-colors"
                >
                  <span className="text-[9px] text-surface-variant font-bold uppercase mb-1">{m}</span>
                  <span className="text-lg font-bold text-white">{editData[m as keyof typeof editData]}m</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Partidas */}
        <section className="flex flex-col gap-4 mt-4">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-semibold tracking-wider text-surface-variant uppercase">Trabajos</h3>
            <button className="text-xs font-medium text-primary flex items-center gap-1 hover:text-primary/80 transition-colors">
              <span className="material-symbols-outlined text-[16px]">+</span> Añadir
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { id: 'pladur', name: 'Pladur', desc: 'Falso techo continuo', icon: <Layers size={20} />, price: '28,50', color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
              { id: 'pintura', name: 'Pintura', desc: 'Pintura plástica lisa', icon: <PaintRoller size={20} />, price: '12,00', color: 'text-tertiary', bg: 'bg-tertiary/10 border-tertiary/20' },
              { id: 'demolicion', name: 'Demolición', desc: 'Retirada de escombros', icon: <Hammer size={20} />, price: '15,00', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' }
            ].map(cat => (
              <div key={cat.id} className="glacier-card rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer hover:bg-white/5">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${cat.bg} ${cat.color}`}>
                     {cat.icon}
                   </div>
                   <div className="flex flex-col">
                     <span className="text-base font-semibold text-white">{cat.name}</span>
                     <span className="text-xs text-surface-variant">{cat.desc}</span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex flex-col items-end">
                     <span className="text-sm font-medium text-white">{cat.price} €</span>
                     <span className="text-[10px] text-surface-variant">/ m²</span>
                   </div>
                   <ChevronRight size={20} className="text-outline" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {isEditing && (
          <button 
            onClick={handleUpdate}
            disabled={isSaving}
            className="mt-10 w-full glacier-btn py-5 flex justify-center items-center gap-2"
          >
            {isSaving ? <Loader2 size={24} className="animate-spin" /> : <><Save size={20} /><span className="uppercase tracking-widest text-sm font-bold">Guardar Cambios</span></>}
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
