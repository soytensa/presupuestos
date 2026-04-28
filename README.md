# Presupuestos Wilson — v0.5.0 (Glacier Edition)

Aplicación PWA para gestión de presupuestos de reformas, optimizada para uso en obra. Interfaz basada en el sistema de diseño **Glacier** (glassmorphism con tonos azul marino profundo).

## 🎨 Sistema de Diseño — "Glacier"

La UI fue diseñada con **Google Stitch** y luego implementada en React/Next.js. Los archivos de referencia originales (HTML estático) están en:

```
diseno/recursos/stitch_buildtech_budgeting_pro/
  ├── glacier/DESIGN.md                     ← Descripción del lenguaje visual
  ├── dashboard_proyectos_fiel_a_referencia/code.html  ← Boceto del Dashboard
  ├── nuevo_presupuesto_datos/code.html     ← Boceto de Nuevo Presupuesto
  ├── seleccion_de_categorias/code.html     ← Boceto de Categorías
  └── detalle_del_presupuesto/code.html     ← Boceto del Detalle
```

**Paleta de colores exacta (definida en `src/app/globals.css`):**
- Fondo: `#0a0e1a` (azul marino casi negro)
- Superficie: `#0f1524`
- Surface Variant: `#1a2438`
- Primary (Ice Blue): `#7dd3fc`
- Tertiary (Lavanda): `#c8a0f0`
- On Surface: `#e0e8f0`
- On Surface Variant: `#a0b4c4`

**Clases de utilidad principales (en `globals.css`):**
- `.glacier-card` — tarjeta con backdrop-blur, borde translúcido, border-radius 30px
- `.glacier-btn` — botón oscuro con texto azul hielo
- `.glacier-input` — input oscuro con borde sutil
- `.chip` / `.chip-active` — etiquetas de estado

## 🚀 Estado Actual

La app se encuentra en fase **MVP** con las siguientes funcionalidades:

- ✅ **Dashboard:** Lista de presupuestos con Top App Bar, Bottom Nav y FAB
- ✅ **Creación (2 pasos):** Datos del cliente → Selección de categorías
- ✅ **Detalle/Edición:** Vista de métricas + lista de trabajos + edición inline
- ✅ **Numpad:** Teclado numérico personalizado (formato español con `,`)
- ✅ **CRUD completo:** Supabase como backend (SELECT, INSERT, UPDATE, DELETE)
- ✅ **Geolocalización:** Nominatim API (OpenStreetMap, sin API key)
- ✅ **Despliegue:** Vercel (`https://presupuestos-mocha.vercel.app`)

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (Turbopack) |
| Estilos | Tailwind CSS 4 + CSS Custom Properties |
| Base de datos | Supabase (PostgreSQL + RLS) |
| Iconos | Lucide React |
| Despliegue | Vercel |
| Fuente | Inter (Google Fonts) |

## 📁 Estructura de Archivos Clave

```
src/
  app/
    globals.css              ← SISTEMA DE DISEÑO COMPLETO (editar aquí para cambiar el tema)
    page.tsx                 ← Dashboard principal
    layout.tsx               ← Layout raíz (fuente Inter)
    project/
      new/page.tsx           ← Formulario de creación (2 pasos)
      [id]/page.tsx          ← Detalle y edición de proyecto
  components/
    bento/BudgetCard.tsx     ← Tarjeta de presupuesto (estilo Stitch)
    ui/NumpadSheet.tsx       ← Teclado numérico de obra
  lib/
    data/projects.ts         ← Toda la lógica de Supabase (CRUD)
    supabaseClient.ts        ← Inicialización del cliente Supabase
diseno/
  recursos/stitch_*/         ← Bocetos originales HTML de Stitch
docs/
  ARCHITECTURE.md            ← Detalles técnicos de la arquitectura
```

## ⚙️ Arrancar en Local

```bash
npm run dev
# → http://localhost:3000
```

Requiere un archivo `.env` con:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 🔮 Próximos Pasos Pendientes

1. **Pricing Engine:** Precios reales por m² según material (Pladur, Pintura, etc.)
2. **PDF Export:** Generación de presupuesto para enviar al cliente
3. **Autenticación:** PIN de acceso para privacidad en obra

---
*Desarrollado con ❤️ por Wilson Torrez & Antigravity AI*
