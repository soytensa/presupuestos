/**
 * Motor de Precios - presupuestos
 * Archivo: src/lib/engine/pricing.ts
 * 
 * Basado en las reglas de negocio de 'Informe_Maestro.md'.
 */

export interface PriceItem {
  id: string;
  name: string;
  price_official_bccm: number;
  price_manual_wilson: number | null;
}

/**
 * Calcula el precio final de un material o partida basándose en la jerarquía.
 * 1. Override manual de Wilson (Prioridad máxima)
 * 2. Referencia Institucional BCCM
 * Todo multiplicado por el coeficiente global.
 * 
 * @param item El material o partida a evaluar
 * @param globalMultiplier El coeficiente global del presupuesto (default 1.0)
 * @returns El precio unitario final calculado
 */
export function calculateFinalPrice(item: PriceItem, globalMultiplier: number = 1.0): number {
  const basePrice = item.price_manual_wilson !== null && item.price_manual_wilson !== undefined
    ? item.price_manual_wilson
    : item.price_official_bccm;
    
  return basePrice * globalMultiplier;
}

/**
 * Calcula el subtotal para una cantidad específica.
 */
export function calculateLineTotal(item: PriceItem, quantity: number, globalMultiplier: number = 1.0): number {
  return calculateFinalPrice(item, globalMultiplier) * quantity;
}
