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
    <div className="min-h-screen pb-24 flex flex-col items-center">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0e1a]/60 backdrop-blur-lg border-b border-primary/10 shadow-[0_8px_32px_0_rgba(10,14,26,0.5)] px-4 py-3 flex items-center justify-between">
        <button onClick={() => step === 1 ? router.push('/') : setStep(1)} className="text-primary hover:bg-primary/10 p-2 rounded-full active:scale-95 transition-transform duration-200 flex items-center justify-center">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold tracking-tight text-lg text-white">
          {step === 1 ? 'Nuevo Presupuesto' : 'Categorías'}
        </h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[60px] w-full z-40 bg-surface-variant h-1">
        <div 
          className="bg-primary h-full transition-all duration-500 shadow-[0_0_10px_rgba(125,211,252,0.5)]" 
          style={{ width: `${(step / 2) * 100}%` }}
        ></div>
      </div>

      <div className="w-full max-w-md flex flex-col p-4 pt-[84px] pb-32">
        
        {step === 1 ? (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            {/* Client Info Section */}
            <section className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold text-primary tracking-wider uppercase ml-1">Información del Cliente</h2>
              <div className={`bg-surface/60 backdrop-blur-[16px] border ${errors.client_name ? 'border-red-500/50' : 'border-primary/10'} rounded-xl p-1 shadow-[0_0_30px_rgba(125,211,252,0.02)]`}>
                <div className="relative flex items-center px-3 py-2">
                  <div className="text-surface-variant mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <input 
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.client_name}
                    onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                    className="w-full bg-transparent border-none text-white placeholder:text-surface-variant focus:outline-none p-0 text-base"
                  />
                </div>
              </div>
              {errors.client_name && <span className="text-[10px] text-red-400 font-bold ml-1 uppercase">Campo obligatorio</span>}
            </section>

            {/* Location Section */}
            <section className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold text-primary tracking-wider uppercase ml-1">Ubicación de la obra</h2>
              <div className={`bg-surface/60 backdrop-blur-[16px] border ${errors.address ? 'border-red-500/50' : 'border-primary/10'} rounded-xl p-1 shadow-[0_0_30px_rgba(125,211,252,0.02)]`}>
                <div className="relative flex items-center px-3 py-2">
                  <div className="text-surface-variant mr-3">
                    <MapPin size={24} />
                  </div>
                  <input 
                    type="text"
                    placeholder="Dirección del proyecto"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-transparent border-none text-white placeholder:text-surface-variant focus:outline-none p-0 text-base"
                  />
                  <button onClick={handleLocation} className="text-primary ml-2 p-1 hover:bg-primary/10 rounded-full transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>
              {errors.address && <span className="text-[10px] text-red-400 font-bold ml-1 uppercase">Campo obligatorio</span>}
            </section>

            {/* Measurements */}
            <section className="flex flex-col gap-3 mt-2">
              <h2 className="text-xs font-semibold text-primary tracking-wider uppercase ml-1">Medidas iniciales (m)</h2>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setActiveNumpad('largo')} className="bg-surface/60 backdrop-blur-[16px] border border-primary/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(125,211,252,0.02)] transition-all">
                  <span className="text-xs text-surface-variant uppercase tracking-wide">Largo</span>
                  <div className="flex items-end gap-1">
                    <span className={`text-2xl font-semibold ${formData.largo ? 'text-white' : 'text-surface-variant'}`}>
                      {formData.largo ? formData.largo.replace('.', ',') : '0,00'}
                    </span>
                    <span className="text-surface-variant text-sm mb-1">m</span>
                  </div>
                </button>
                <button onClick={() => setActiveNumpad('ancho')} className="bg-surface/60 backdrop-blur-[16px] border border-primary/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(125,211,252,0.02)] transition-all">
                  <span className="text-xs text-surface-variant uppercase tracking-wide">Ancho</span>
                  <div className="flex items-end gap-1">
                    <span className={`text-2xl font-semibold ${formData.ancho ? 'text-white' : 'text-surface-variant'}`}>
                      {formData.ancho ? formData.ancho.replace('.', ',') : '0,00'}
                    </span>
                    <span className="text-surface-variant text-sm mb-1">m</span>
                  </div>
                </button>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            <section className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold text-primary tracking-wider uppercase ml-1">Selecciona los servicios</h2>
              <h1 className="text-3xl font-bold text-white mb-4">¿Qué necesitas<br/>para tu proyecto?</h1>
              
              <div className="flex flex-col gap-3">
                {categories.map(cat => {
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <button 
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`bg-surface/60 backdrop-blur-[16px] border rounded-2xl p-4 flex items-center justify-between transition-all ${isSelected ? 'border-primary shadow-[0_0_15px_rgba(125,211,252,0.1)]' : 'border-primary/10'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-primary">
                          {cat.icon}
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-white font-semibold">{cat.name}</span>
                          <span className="text-surface-variant text-xs">{cat.name === 'Demolición' ? 'Derribos y limpieza' : cat.name === 'Fontanería' ? 'Tuberías y sanitarios' : cat.name === 'Pladur' ? 'Techos y tabiques' : cat.name === 'Electricidad' ? 'Cableado y enchufes' : 'Interiores y exteriores'}</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isSelected ? 'bg-primary border-primary text-black' : 'border-surface-variant'}`}>
                        {isSelected && <Check size={14} strokeWidth={4} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}

      </div>

      {/* Bottom Action Area */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-[#0a0e1a]/80 backdrop-blur-xl border-t border-primary/5 z-40 pb-safe">
        <div className="max-w-md mx-auto">
          {step === 1 ? (
            <button 
              onClick={handleNext}
              className="w-full bg-surface-variant hover:bg-surface-variant/80 text-primary font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>SIGUIENTE PASO</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-surface-variant hover:bg-surface-variant/80 text-primary font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <>
                <span>FINALIZAR PRESUPUESTO</span>
                <Check size={20} />
              </>}
            </button>
          )}
        </div>
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
