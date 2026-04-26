'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, MapPin, Hammer, Droplets, Zap, Layers, PaintRoller, 
  Check, ChevronRight, Loader2 
} from 'lucide-react';
import { createProject } from '@/lib/data/projects';
import { NumpadSheet } from '@/components/ui/NumpadSheet';

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    client_name: '',
    address: '',
    largo: '',
    ancho: '',
    alto: ''
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeNumpad, setActiveNumpad] = useState<'largo' | 'ancho' | 'alto' | null>(null);
  const [errors, setErrors] = useState<{client_name?: boolean, address?: boolean}>({});

  const categories = [
    { id: 'demolicion', name: 'Demolición', icon: <Hammer size={20} /> },
    { id: 'fontaneria', name: 'Fontanería', icon: <Droplets size={20} /> },
    { id: 'pladur', name: 'Pladur', icon: <Layers size={20} /> },
    { id: 'electricidad', name: 'Electricidad', icon: <Zap size={20} /> },
    { id: 'pintura', name: 'Pintura', icon: <PaintRoller size={20} /> },
  ];

  const handleNext = () => {
    const newErrors: {client_name?: boolean, address?: boolean} = {};
    if (!formData.client_name) newErrors.client_name = true;
    if (!formData.address) newErrors.address = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const largo = parseFloat(formData.largo) || 0;
      const ancho = parseFloat(formData.ancho) || 0;
      const total = largo * ancho * 100;

      await createProject({
        client_name: formData.client_name,
        address: formData.address,
        status: 'Borrador',
        total_amount: total
      });
      router.push('/');
    } catch (e) {
      alert('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleLocation = async () => {
    if ("geolocation" in navigator) {
      setFormData(f => ({ ...f, address: 'Buscando...' }));
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          setFormData(f => ({ ...f, address: data.display_name.split(',')[0] + ', ' + data.display_name.split(',')[1] }));
          setErrors(e => ({ ...e, address: false }));
        } catch (e) {
          setFormData(f => ({ ...f, address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1c1e] text-[#e2e2e6] flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col p-6 pb-32">
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-zinc-800 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        <header className="flex items-center gap-4 mb-10">
          <button onClick={() => step === 1 ? router.push('/') : setStep(1)} className="p-2 rounded-full active:bg-zinc-800">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">
            {step === 1 ? 'Nuevo Presupuesto' : 'Categorías'}
          </h1>
        </header>

        {step === 1 ? (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-primary font-bold uppercase ml-4">Información del Cliente</span>
              <div className={`google-card p-2 flex flex-col ${errors.client_name ? 'border-red-500/50' : ''}`}>
                <input 
                  type="text"
                  placeholder="Añadir nombre (Ej: Baño Wilson)"
                  value={formData.client_name}
                  onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                  className="bg-transparent px-4 py-4 text-lg font-bold text-white outline-none placeholder:text-zinc-600"
                />
              </div>
              {errors.client_name && <span className="text-[10px] text-red-400 font-bold ml-4 animate-pulse uppercase">Campo obligatorio</span>}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-primary font-bold uppercase ml-4">Ubicación de la obra</span>
              <div className={`google-card p-2 flex items-center ${errors.address ? 'border-red-500/50' : ''}`}>
                <input 
                  type="text"
                  placeholder="Ej: Calle Principal 123"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="bg-transparent flex-1 px-4 py-4 text-sm text-zinc-300 outline-none placeholder:text-zinc-600"
                />
                <button onClick={handleLocation} className="p-4 text-primary active:scale-90 transition-all">
                  <MapPin size={24} />
                </button>
              </div>
              {errors.address && <span className="text-[10px] text-red-400 font-bold ml-4 animate-pulse uppercase">Campo obligatorio</span>}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-primary font-bold uppercase ml-4">Medidas iniciales (m)</span>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setActiveNumpad('largo')} className="google-card p-6 flex flex-col items-center">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase mb-1">Largo</span>
                  <span className={`text-2xl font-black ${formData.largo ? 'text-white' : 'text-zinc-800'}`}>
                    {formData.largo ? formData.largo.replace('.', ',') : '0,00'}
                  </span>
                </button>
                <button onClick={() => setActiveNumpad('ancho')} className="google-card p-6 flex flex-col items-center">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase mb-1">Ancho</span>
                  <span className={`text-2xl font-black ${formData.ancho ? 'text-white' : 'text-zinc-800'}`}>
                    {formData.ancho ? formData.ancho.replace('.', ',') : '0,00'}
                  </span>
                </button>
              </div>
            </div>

            <button 
              onClick={handleNext}
              className="mt-10 w-full fab-google py-5 flex justify-center items-center gap-2 active:scale-95 transition-all"
            >
              <span className="font-bold uppercase tracking-widest text-sm">Siguiente paso</span>
              <ChevronRight size={20} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            <span className="text-[10px] text-primary font-bold uppercase ml-4 px-1">Selecciona los servicios</span>
            <div className="flex flex-col gap-3">
              {categories.map(cat => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button 
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`google-card p-6 flex items-center justify-between transition-all ${isSelected ? 'bg-primary/10 border-primary/30' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${isSelected ? 'bg-primary text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                        {cat.icon}
                      </div>
                      <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-zinc-500'}`}>{cat.name}</span>
                    </div>
                    {isSelected && <Check size={24} className="text-primary" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={handleSave}
              disabled={loading}
              className="mt-10 w-full fab-google py-5 flex justify-center items-center gap-2 active:scale-95 transition-all"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <>
                <span className="font-bold uppercase tracking-widest text-sm">Finalizar Presupuesto</span>
                <Check size={20} strokeWidth={3} />
              </>}
            </button>
          </div>
        )}

      </div>

      <NumpadSheet 
        isOpen={activeNumpad !== null}
        title={activeNumpad ? activeNumpad.toUpperCase() : ''}
        value={activeNumpad ? formData[activeNumpad] : '0'}
        onClose={() => setActiveNumpad(null)}
        onChange={(val) => {
          if (activeNumpad) setFormData({ ...formData, [activeNumpad]: val });
        }}
      />
    </div>
  );
}
