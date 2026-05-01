# Contexto compacto para IA - Presupuestos Wilson

Este documento es un resumen corto para futuras sesiones de IA. Sirve para retomar el trabajo sin volver a procesar chats largos.

## Estado actual del repositorio

- Rama: `develop`
- Tipo de app: PWA de presupuestos para reformas
- Backend: Supabase
- Despliegue objetivo: Vercel
- Sistema de diseño: Glacier

## Fuentes de verdad

- Sistema visual: `src/app/globals.css`
- Instrucciones del repo: `AGENTS.md`
- Arquitectura técnica: `docs/ARCHITECTURE.md`
- Contexto de negocio: `docs/informe_maestro.md`
- Referencias Stitch: `diseno/recursos/stitch_buildtech_budgeting_pro/`

## Lo que ya está construido

- Dashboard con tarjetas de presupuestos y navegación inferior
- Flujo de nuevo presupuesto con:
  - datos del cliente
  - dirección
  - medidas
  - selección de categorías
  - numpad personalizado
- Pantalla de detalle con edición inline
- CRUD de Supabase para `projects`
- Archivos base de pricing en `src/lib/engine/pricing.ts` y `src/components/bento/PricingEngine.tsx`
- Estructura base de autenticación en `src/components/auth/`, aunque el PIN no es todavía un bloqueo real

## Lo que sigue pendiente

- Motor de precios real por categoría y material
- Modelo dinámico de `line_items`
- Exportación a PDF
- Autenticación real / control de acceso
- Validación más fuerte y endurecimiento para producción

## Reglas de trabajo importantes

- No inventar estilos de UI. Usar solo tokens y clases de Glacier.
- Antes de cambiar la UI, comparar con los HTML de Stitch.
- No cambiar el esquema de Supabase sin avisarlo.
- Mantener los números internamente con `.` y mostrarlos con `,`.
- Preferir cambios pequeños y explícitos antes que refactors amplios.

## Contexto histórico útil

El proyecto nació con una petición muy ambiciosa para una PWA de reformas con:

- identidad visual fuerte
- pricing granular de obra
- trabajo local sobre `develop`
- datos en Supabase
- despliegue en Vercel

La idea principal que conviene conservar es:

- la app debe ser simple de usar en obra
- la UI debe seguir fielmente Glacier/Stitch
- la lógica de negocio debe volverse más realista con el tiempo, empezando por el pricing

## Siguientes pasos recomendados

1. Mantener los docs alineados con el código.
2. Implementar el motor de precios real.
3. Convertir los trabajos estáticos en datos de Supabase.
4. Añadir exportación PDF cuando el modelo de datos esté estable.

## Cómo debe retomar una IA futura

- Leer primero `AGENTS.md`.
- Leer `docs/ARCHITECTURE.md` y este archivo.
- Inspeccionar `src/app/globals.css` antes de tocar la UI.
- Usar los HTML de Stitch antes de rediseñar cualquier página.
- Probar localmente en el navegador cuando el cambio sea visualmente importante.
