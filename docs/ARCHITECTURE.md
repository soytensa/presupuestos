# Arquitectura Técnica — Presupuestos Wilson v0.5.0

## 🎨 Sistema de Diseño — Glacier (Glassmorphism)

El sistema de diseño se llama **Glacier** e imita el estilo "frozen light" de los bocetos generados con Google Stitch.

**Archivo único de theming:** `src/app/globals.css`

```css
/* Variables clave */
--bg-color: #0a0e1a;         /* Fondo */
--surface: #0f1524;          /* Superficie de cards */
--surface-variant: #1a2438;  /* Variante elevada */
--primary: #7dd3fc;          /* Azul hielo (acento principal) */
--tertiary: #c8a0f0;         /* Lavanda (acento secundario) */
--on-surface: #e0e8f0;       /* Texto principal */
--on-surface-variant: #a0b4c4; /* Texto secundario */
--outline: #4a6070;          /* Bordes de iconos inactivos */
--outline-variant: #2a3a48;  /* Bordes de inputs */
```

**Clases de utilidad:**
- `.glacier-card` — `background rgba(15,21,36,0.6)`, `backdrop-blur(24px)`, `border-radius: 30px`, borde azul translúcido.
- `.glacier-btn` — Botón oscuro (`surface-variant`) con texto azul (`primary`).
- `.glacier-input` — Input oscuro con borde sutil, focus en azul.
- `.chip` / `.chip-active` — Etiquetas de estado (Borrador, Aceptado, etc.).
- `.top-app-bar` — Header/nav con blur y borde inferior azul translúcido.

**REGLA:** No usar colores hardcoded. Siempre usar las clases de utilidad o variables CSS.

---

## 🗄️ Capa de Datos (Supabase)

**Archivo central:** `src/lib/data/projects.ts`

### Modelo de Datos (tabla `projects`):
```typescript
interface Project {
  id: string;           // UUID (auto-generado)
  client_name: string;  // Nombre del cliente
  address: string;      // Dirección (puede venir de Nominatim)
  largo: string;        // Metros de largo (string con punto decimal)
  ancho: string;        // Metros de ancho (string con punto decimal)
  total_amount: number; // Monto total (calculado: largo × ancho × 100 — pendiente mejorar)
  status: string;       // "Borrador" | "Pendiente" | "Aceptado" | "Finalizado"
  created_at: string;   // Timestamp ISO
}
```

### Funciones disponibles en `projects.ts`:
- `getProjects()` → Devuelve todos los proyectos
- `getProjectById(id)` → Devuelve un proyecto por ID
- `createProject(data)` → Crea un nuevo proyecto
- `updateProject(id, data)` → Actualiza campos de un proyecto
- `deleteProject(id)` → Elimina un proyecto

### Políticas RLS (Supabase Dashboard):
- SELECT / INSERT / UPDATE / DELETE: `true` para `anon` (desarrollo)
- **Pendiente:** Cerrar antes de producción con autenticación

---

## 📏 Numpad (Formato de Medidas)

**Componente:** `src/components/ui/NumpadSheet.tsx`

- Entrada interna: usa `.` como separador decimal (JavaScript).
- Salida visual: convierte `.` → `,` para el estándar español.
- Limitado a 2 decimales.
- Se activa cuando el usuario toca una caja de "Largo" o "Ancho".

---

## 🌍 Geolocalización

- API: **Nominatim (OpenStreetMap)** — geocodificación inversa.
- No requiere API Key para volumen bajo.
- Implementada en `project/new/page.tsx` → función `handleLocation`.

---

## 🚀 Despliegue

- **Local:** `npm run dev` → `http://localhost:3000`
- **Producción:** Vercel → `https://presupuestos-mocha.vercel.app`
- **Variables de entorno necesarias:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🔮 Deuda Técnica / Pendientes

| Prioridad | Tarea | Contexto |
|---|---|---|
| Alta | **Pricing Engine real** | `total_amount = largo × ancho × 100` es temporal. Necesita calcular por categoría (m² × precio_material) |
| Alta | **Lista de Trabajos dinámica** | Los items en `project/[id]/page.tsx` son datos estáticos de ejemplo. Necesitan tabla `line_items` en Supabase |
| Media | **PDF Export** | No implementado. Considerar `@react-pdf/renderer` |
| Media | **Autenticación** | RLS abierta. Supabase Auth o PIN local antes de producción real |
| Baja | **Validación de formularios** | Actualmente validación manual. Considerar Zod |
