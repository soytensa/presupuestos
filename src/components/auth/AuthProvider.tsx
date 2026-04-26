'use client';

import React, { useState, useEffect } from 'react';
import { PinLogin } from './PinLogin';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // El PIN lo leemos de las variables de entorno o usamos el de Wilson
  const CORRECT_PIN = process.env.NEXT_PUBLIC_PIN_CODE || "4536";

  useEffect(() => {
    setIsMounted(true);
    // Para que no le pida el PIN en cada recarga de la misma sesión
    if (sessionStorage.getItem('wilson_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Prevenir errores de hidratación (parpadeo raro al cargar)
  if (!isMounted) {
    return <div className="min-h-screen bg-black"></div>;
  }

  if (!isAuthenticated) {
    return (
      <PinLogin 
        correctPin={CORRECT_PIN} 
        onSuccess={() => {
          sessionStorage.setItem('wilson_auth', 'true');
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  return <>{children}</>;
}
