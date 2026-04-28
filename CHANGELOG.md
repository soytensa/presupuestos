# Changelog

## [0.5.0] - 2026-04-28 (Glacier Edition — Stitch UI Migration)

### Añadido
- **Top App Bar** fija con avatar, título "Glacier Build" y botón de notificaciones.
- **Bottom Navigation Bar** (Home, Projects, Add, Schedule, Profile) en Dashboard.
- **FAB (Floating Action Button)** para crear nuevo presupuesto desde el Dashboard.
- **Progress Bar** en el formulario de creación de 2 pasos.
- Header fijo en formulario de creación y vista de detalle con fondo blur.
- Subtítulos descriptivos en la selección de categorías (ej: "Derribos y limpieza").
- Cuadrícula Bento (Superficie + Total) en la vista de detalle con efecto glow.
- Lista de "Trabajos" en detalle con icono circular de color por categoría.

### Cambiado
- **Sistema de diseño migrado completamente** de Material Design 3 a **Glacier (Glassmorphism)**.
- Paleta de colores ahora basada en los bocetos exactos generados por Google Stitch.
- `globals.css` rehecho desde cero: variables `--bg-color`, `--surface`, `--primary`, etc.
- `BudgetCard`: Tarjetas con `border-radius: 30px`, chips de estado con colores dinámicos.
- `page.tsx` (Dashboard): Nuevo layout con barra superior y navegación inferior.
- `project/new/page.tsx`: Inputs con iconos integrados, cajas de medida oscuras, botón anclado abajo.
- `project/[id]/page.tsx`: Métricas en grid, lista de trabajos con descripción y precio/m².
- Fuente del botón "Siguiente Paso": ahora `bg-surface-variant text-primary` (oscuro con texto azul).

### Corregido
- **Error de parseo JSX** en `page.tsx` causado por `</section>` duplicado → servidor daba 500.
- Servidor de desarrollo no arrancado → iniciado `npm run dev` manualmente.

---

## [0.4.0] - 2026-04-26 (Google Material Edition)
### Añadido
- Nueva interfaz basada en Google Material Design 3.
- Selector de estados (Borrador, Aceptado, etc.) mediante chips.
- Soporte para edición de categorías en modo edición.

### Cambiado
- Rediseño de `BudgetCard`, `NumpadSheet` y `ProjectDetailPage` a estética Slate & Gold.
- Purgado de colores verdes del formulario de creación.
- Mejora en precisión del Numpad (máx. 2 decimales).

### Corregido
- Botón de borrado tras configurar políticas RLS en Supabase.
- Geocodificación corregida para nombres de calle reales.
- Error de import `Calendar is not defined`.

---

## [0.2.0] - 2026-04-25 (Apple Frost Edition)
- Intento inicial de Glassmorphism estilo iOS (descartado en favor de Material 3).
- Implementación de la pantalla de detalles dinámica.

## [0.1.0] - 2026-04-24 (OLED Black)
- Versión inicial con estética Pure Black y acentos verdes.
- Estructura base de Next.js y Supabase.
