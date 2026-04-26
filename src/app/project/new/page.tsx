'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Hammer, Droplets, Zap, Layers, PaintRoller, ChevronRight, Check } from 'lucide-react';
import { NumpadSheet } from '@/components/ui/NumpadSheet';

// Tipos de pasos
type Step = 'info' | 'categories' | 'detail';

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('info');
  
  // Estado del proyecto
  const [projectData, setProjectData] = useState({
    name: 'Baño Principal',
    address: 'Calle Mayor',
    largo: "3.0",
    ancho: "3.0",
    alto: "2.5"
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Estado del Numpad
  const [activeNumpad, setActiveNumpad] = useState<'largo' | 'ancho' | 'alto' | null>(null);

  // Categorías Modulares (Mockup style)
  const categories = [
    { id: 'demolicion', name: 'Demolición', icon: <Hammer size={18} /> },
    { id: 'fontaneria', name: 'Fontanería & Baño', icon: <Droplets size={18} /> },
    { id: 'falso_techo', name: 'Falso Techo (Pladur)', icon: <Layers size={18} /> },
    { id: 'electricidad', name: 'Electricidad', icon: <Zap size={18} /> },
    { id: 'alicatados', name: 'Alicatados & Revestimientos', icon: <Layers size={18} /> },
    { id: 'pintura', name: 'Pintura', icon: <PaintRoller size={18} /> },
  ];

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (currentStep === 'info') setCurrentStep('categories');
  };

  const handleBack = () => {
    if (currentStep === 'info') router.push('/');
    if (currentStep === 'categories') setCurrentStep('info');
  };

  // Cálculo seguro de superficie
  const l = parseFloat(projectData.largo) || 0;
  const a = parseFloat(projectData.ancho) || 0;
  const superficie = (l * a).toFixed(1);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col p-6 pb-32">
        
        {/* Top Header con botón de volver */}
        <header className="flex items-center gap-4 mt-2 mb-8">
          <button onClick={handleBack} className="p-2 -ml-2 rounded-full active:bg-zinc-900 transition-colors">
            <ArrowLeft size={24} className="text-zinc-400" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white">Nuevo Presupuesto</h1>
            {currentStep === 'categories' && (
              <p className="text-[10px] text-[#39FF14] uppercase tracking-widest font-bold">
                {projectData.name} - {projectData.address}
              </p>
            )}
          </div>
        </header>

        {/* CONTENIDO DEL PASO 1: INFO BÁSICA */}
        {currentStep === 'info' && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* Inputs de texto básicos */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-1">Nombre / Identificador</label>
                <input 
                  type="text" 
                  value={projectData.name}
                  onChange={e => setProjectData({...projectData, name: e.target.value})}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-[16px] px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#39FF14]/50 transition-colors"
                  placeholder="Ej: Baño Principal"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-1">Dirección (Opcional)</label>
                <input 
                  type="text" 
                  value={projectData.address}
                  onChange={e => setProjectData({...projectData, address: e.target.value})}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-[16px] px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#39FF14]/50 transition-colors"
                  placeholder="Ej: Calle Mayor 12"
                />
              </div>
            </div>

            {/* Grid de Medidas (Bento Style) */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-1">Medidas de la Estancia (Metros)</h3>
              <div className="grid grid-cols-2 gap-3">
                <MeasurementCard label="Largo" value={projectData.largo} onClick={() => setActiveNumpad('largo')} />
                <MeasurementCard label="Ancho" value={projectData.ancho} onClick={() => setActiveNumpad('ancho')} />
                <MeasurementCard label="Alto" value={projectData.alto} onClick={() => setActiveNumpad('alto')} />
                
                {/* Superficie Total (Autocalculada) */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-[20px] p-4 flex flex-col justify-center items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#39FF14]/5"></div>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mb-1 z-10">Superficie</span>
                  <div className="flex items-baseline gap-1 z-10">
                    <span className="text-3xl font-black text-[#39FF14]">{superficie}</span>
                    <span className="text-xs text-[#39FF14]/70 font-bold">m²</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleNext} className="mt-4 w-full bg-[#39FF14] text-black font-black uppercase tracking-widest py-4 rounded-[20px] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(57,255,20,0.2)]">
              Siguiente: Añadir Partidas
            </button>
          </div>
        )}

        {/* CONTENIDO DEL PASO 2: CATEGORÍAS MODULARES */}
        {currentStep === 'categories' && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            
            <div className="flex flex-col gap-1 px-1">
               <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Partidas Modulares</h3>
               <p className="text-xs text-zinc-400">Selecciona las categorías que se aplicarán al proyecto.</p>
            </div>

            <div className="flex flex-col gap-3">
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <div 
                    key={cat.id}
                    onClick={() => handleCategoryToggle(cat.id)}
                    className={`flex items-center justify-between p-4 rounded-[20px] border cursor-pointer active:scale-[0.98] transition-all ${
                      isSelected 
                        ? 'bg-zinc-900/80 border-[#39FF14]/50 shadow-[0_0_15px_rgba(57,255,20,0.05)]' 
                        : 'bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${isSelected ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-black text-zinc-500'}`}>
                        {cat.icon}
                      </div>
                      <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                        {cat.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#39FF14] border-[#39FF14]' : 'border-zinc-600 bg-transparent'
                      }`}>
                        {isSelected && <Check size={14} className="text-black" strokeWidth={4} />}
                      </div>
                      <ChevronRight size={18} className="text-zinc-600" />
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="mt-8 w-full bg-zinc-900 border border-zinc-800 text-[#39FF14] font-black uppercase tracking-widest py-4 rounded-[20px] active:scale-[0.98] transition-transform flex justify-center items-center gap-2">
               <span>Crear y Detallar</span>
               <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>

      {/* MODAL DEL NUMPAD */}
      <NumpadSheet 
        isOpen={activeNumpad !== null}
        title={activeNumpad ? activeNumpad.toUpperCase() : ''}
        value={activeNumpad ? projectData[activeNumpad] : '0'}
        onClose={() => setActiveNumpad(null)}
        onChange={(val) => {
          if (activeNumpad) {
            setProjectData({ ...projectData, [activeNumpad]: val });
          }
        }}
      />
    </div>
  );
}

function MeasurementCard({ label, value, onClick }: { label: string, value: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-black border border-zinc-800 rounded-[20px] p-4 flex flex-col justify-between group active:bg-zinc-900 transition-colors cursor-pointer"
    >
      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-2">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white w-full truncate">{value}</span>
        <span className="text-xs text-zinc-500 font-bold">m</span>
      </div>
    </div>
  );
}

