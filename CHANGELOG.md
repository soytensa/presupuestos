# Registro de cambios

## [0.5.0] - 2026-04-28 (Glacier Edition - migración de UI con Stitch)

### Añadido
- Top App Bar fija con avatar, título "Glacier Build" y botón de notificaciones.
- Bottom Navigation Bar (Home, Projects, Add, Schedule, Profile) en el dashboard.
- FAB (Floating Action Button) para crear un nuevo presupuesto desde el dashboard.
- Barra de progreso en el formulario de creación de 2 pasos.
- Header fijo en el formulario de creación y en la vista de detalle con fondo blur.
- Subtítulos descriptivos en la selección de categorías, por ejemplo "Derribos y limpieza".
- Cuadrícula Bento (Superficie + Total) en la vista de detalle con efecto glow.
- Lista de "Trabajos" en detalle con icono circular y color por categoría.

### Cambiado
- Sistema de diseño migrado completamente de Material Design 3 a **Glacier**.
- Paleta de colores basada en los bocetos exactos generados con Google Stitch.
- `globals.css` rehecho desde cero con variables `--bg-color`, `--surface`, `--primary`, etc.
- `BudgetCard`: tarjetas con `border-radius: 30px` y chips de estado dinámicos.
- `page.tsx` del dashboard: nuevo layout con barra superior y navegación inferior.
- `project/new/page.tsx`: inputs con iconos integrados, cajas de medida oscuras y botón anclado abajo.
- `project/[id]/page.tsx`: métricas en grid, lista de trabajos con descripción y precio/m².
- Botón "Siguiente Paso" ahora usa `bg-surface-variant text-primary`.

### Corregido
- Error de parseo JSX en `page.tsx` causado por un `</section>` duplicado.
- Servidor de desarrollo no arrancado: se inició `npm run dev` manualmente.

---

## [0.4.0] - 2026-04-26 (Google Material Edition)

### Añadido
- Nueva interfaz basada en Google Material Design 3.
- Selector de estados (Borrador, Aceptado, etc.) mediante chips.
- Soporte para edición de categorías en modo edición.

### Cambiado
- Rediseño de `BudgetCard`, `NumpadSheet` y `ProjectDetailPage` a una estética Slate & Gold.
- Eliminación de colores verdes del formulario de creación.
- Mejora de precisión del Numpad (máximo 2 decimales).

### Corregido
- Botón de borrado tras configurar políticas RLS en Supabase.
- Geocodificación corregida para nombres de calle reales.
- Error de import `Calendar is not defined`.

---

## [0.2.0] - 2026-04-25 (Apple Frost Edition)
- Primer intento de glassmorphism estilo iOS, luego descartado en favor de Material 3.
- Implementación de la pantalla de detalles dinámica.

## [0.1.0] - 2026-04-24 (OLED Black)
- Versión inicial con estética Pure Black y acentos verdes.
- Estructura base de Next.js y Supabase.
