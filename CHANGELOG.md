# Changelog

## [0.4.0] - 2026-04-26 (Google Material Edition)
### Añadido
- Nueva interfaz basada en **Google Material Design 3**.
- Selector de **Estados** (Borrador, Aceptado, etc.) mediante Chips en la pantalla de detalles.
- Logs de depuración para transacciones de Supabase.
- Soporte para edición de **Categorías** (Pladur, Pintura, etc.) en el modo edición.

### Cambiado
- Rediseño completo de `BudgetCard`, `NumpadSheet` y `ProjectDetailPage` a estética Slate & Gold (Material You).
- Purgado de colores antiguos (Verde eléctrico) en el formulario de creación.
- Mejora en la precisión del Numpad (limitación a 2 decimales).

### Corregido
- **Eliminar Proyecto:** Arreglado el botón de borrado tras configurar las políticas RLS en Supabase.
- **Geocodificación:** Corregido el error de coordenadas por nombres de calle reales.
- **Imports:** Solucionado el error de `Calendar is not defined`.

## [0.2.0] - 2026-04-25 (Apple Frost Edition)
- Intento inicial de Glassmorphism estilo iOS (Descartado en favor de Material 3).
- Implementación de la pantalla de detalles dinámica.

## [0.1.0] - 2026-04-24 (OLED Black)
- Versión inicial con estética Pure Black y acentos verdes.
- Estructura base de Next.js y Supabase.
