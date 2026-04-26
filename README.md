# Presupuestos Wilson Torrez - Madrid

PWA (Progressive Web App) de alto rendimiento diseñada para la gestión de presupuestos de reformas en la Comunidad de Madrid.

## 🚀 Misión
Revolucionar la gestión de reformas mediante una herramienta técnica, robusta y estéticamente impecable (Estilo Bento Grid OLED).

## 🛠️ Stack Tecnológico
- **Core:** Next.js 14 + TypeScript
- **Styling:** Tailwind CSS (Pure OLED Black #000000, Electric Green #39FF14)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (Fotos de obra)
- **PDF:** @react-pdf/renderer

## 📂 Estructura del Repositorio
- `/docs`: Documentación técnica y especificaciones.
- `/data`: Datos oficiales BCCM y referencias de precios reales.
- `/diseno`: Mockups conceptuales y recursos gráficos.
- `/src`: Código fuente de la aplicación Next.js.
- `/supabase`: Migraciones y configuración de la base de datos.

## 📐 Lógica de Precios
El sistema utiliza una lógica de 3 capas:
1. **Referencia BCCM:** Datos oficiales de la Comunidad de Madrid (Áreas 1, 2, 3).
2. **Override Wilson:** Precios manuales con prioridad máxima.
3. **Multiplicador Global:** Coeficiente ajustable para inflación o dificultad.

## 🔒 Acceso
Protección mediante PIN de 4 dígitos (Wilson Torrez).

## 📄 Licencia
Privado - Wilson Torrez.
