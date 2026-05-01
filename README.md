# Presupuestos Wilson - v0.5.0 (Glacier Edition)

PWA para gestionar presupuestos de reformas, pensada para uso en obra. La interfaz sigue el sistema de diseño **Glacier**, con una estética glassmorphism en tonos azul marino profundo.

## Sistema de diseño: Glacier

La UI se diseñó con **Google Stitch** y después se implementó en React/Next.js. Los archivos de referencia originales (HTML estático) están en:

```text
diseno/recursos/stitch_buildtech_budgeting_pro/
  ├── glacier/DESIGN.md                     ← Descripción del lenguaje visual
  ├── dashboard_proyectos_fiel_a_referencia/code.html  ← Boceto del dashboard
  ├── nuevo_presupuesto_datos/code.html     ← Boceto de nuevo presupuesto
  ├── seleccion_de_categorias/code.html     ← Boceto de categorías
  └── detalle_del_presupuesto/code.html     ← Boceto del detalle
```

**Paleta exacta de colores** definida en `src/app/globals.css`:
- Fondo: `#0a0e1a` (azul marino casi negro)
- Superficie: `#0f1524`
- Surface Variant: `#1a2438`
- Primary (Ice Blue): `#7dd3fc`
- Tertiary (Lavanda): `#c8a0f0`
- On Surface: `#e0e8f0`
- On Surface Variant: `#a0b4c4`

**Clases de utilidad principales**:
- `.glacier-card` - tarjeta con `backdrop-blur`, borde translúcido y `border-radius: 30px`
- `.glacier-btn` - botón oscuro con texto azul hielo
- `.glacier-input` - input oscuro con borde sutil
- `.chip` / `.chip-active` - etiquetas de estado

## Estado actual

La app está en fase **MVP** con estas funciones:

- Dashboard con lista de presupuestos, Top App Bar, Bottom Nav y FAB
- Creación en 2 pasos: datos del cliente y selección de categorías
- Detalle y edición con vista de métricas, lista de trabajos y edición inline
- Numpad personalizado con formato español usando `,`
- CRUD completo con Supabase como backend
- Geolocalización con Nominatim API (OpenStreetMap, sin API key)
- Despliegue en Vercel: `https://presupuestos-mocha.vercel.app`

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (Turbopack) |
| Estilos | Tailwind CSS 4 + CSS Custom Properties |
| Base de datos | Supabase (PostgreSQL + RLS) |
| Iconos | Lucide React |
| Despliegue | Vercel |
| Fuente | Inter (Google Fonts) |

## Estructura de archivos clave

```text
src/
  app/
    globals.css              ← sistema de diseño completo
    page.tsx                 ← dashboard principal
    layout.tsx               ← layout raíz
    project/
      new/page.tsx           ← formulario de creación
      [id]/page.tsx          ← detalle y edición de proyecto
  components/
    bento/BudgetCard.tsx     ← tarjeta de presupuesto
    ui/NumpadSheet.tsx       ← teclado numérico
  lib/
    data/projects.ts         ← lógica de Supabase (CRUD)
    supabaseClient.ts        ← cliente Supabase
diseno/
  recursos/stitch_*/         ← bocetos HTML originales de Stitch
docs/
  ARCHITECTURE.md            ← detalles técnicos de arquitectura
```

## Arrancar en local

```bash
npm run dev
# → http://localhost:3000
```

Requiere un archivo `.env` con:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Próximos pasos pendientes

1. **Pricing Engine**: precios reales por m² según material
2. **PDF Export**: generación del presupuesto para enviar al cliente
3. **Autenticación**: PIN de acceso para privacidad en obra

---
*Desarrollado con ❤️ por Wilson Torrez & Antigravity AI*
