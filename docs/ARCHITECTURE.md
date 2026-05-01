# Arquitectura técnica - Presupuestos Wilson v0.5.0

## Sistema de diseño: Glacier

El sistema de diseño se llama **Glacier** e imita el estilo "frozen light" de los bocetos generados con Google Stitch.

**Archivo único de theming:** `src/app/globals.css`

```css
/* Variables clave */
--bg-color: #0a0e1a;          /* Fondo */
--surface: #0f1524;           /* Superficie de cards */
--surface-variant: #1a2438;   /* Variante elevada */
--primary: #7dd3fc;           /* Azul hielo (acento principal) */
--tertiary: #c8a0f0;          /* Lavanda (acento secundario) */
--on-surface: #e0e8f0;        /* Texto principal */
--on-surface-variant: #a0b4c4;/* Texto secundario */
--outline: #4a6070;           /* Bordes de iconos inactivos */
--outline-variant: #2a3a48;   /* Bordes de inputs */
```

**Clases de utilidad:**
- `.glacier-card` - `background rgba(15,21,36,0.6)`, `backdrop-blur(24px)`, `border-radius: 30px`, borde azul translúcido.
- `.glacier-btn` - botón oscuro (`surface-variant`) con texto azul (`primary`).
- `.glacier-input` - input oscuro con borde sutil y foco azul.
- `.chip` / `.chip-active` - etiquetas de estado como Borrador o Aceptado.
- `.top-app-bar` - header/nav con blur y borde inferior azul translúcido.

**Regla:** no usar colores hardcoded. Siempre usar las clases de utilidad o variables CSS.

---

## Capa de datos: Supabase

**Archivo central:** `src/lib/data/projects.ts`

### Modelo de datos (`projects`)

```typescript
interface Project {
  id: string;           // UUID auto-generado
  client_name: string;  // Nombre del cliente
  address: string;      // Dirección, puede venir de Nominatim
  largo: string;        // Metros de largo (string con punto decimal)
  ancho: string;        // Metros de ancho (string con punto decimal)
  total_amount: number; // Monto total calculado: largo × ancho × 100
  status: string;       // Borrador | Pendiente | Aceptado | Finalizado
  created_at: string;   // Timestamp ISO
}
```

### Funciones disponibles en `projects.ts`

- `getProjects()` - devuelve todos los proyectos
- `getProjectById(id)` - devuelve un proyecto por ID
- `createProject(data)` - crea un nuevo proyecto
- `updateProject(id, data)` - actualiza campos de un proyecto
- `deleteProject(id)` - elimina un proyecto

### Políticas RLS

- SELECT / INSERT / UPDATE / DELETE: `true` para `anon` en desarrollo
- Pendiente cerrar antes de producción con autenticación

---

## Numpad: formato de medidas

**Componente:** `src/components/ui/NumpadSheet.tsx`

- Entrada interna: usa `.` como separador decimal
- Salida visual: convierte `.` a `,` para el estándar español
- Limitado a 2 decimales
- Se activa cuando el usuario toca una caja de `Largo` o `Ancho`

---

## Geolocalización

- API: **Nominatim (OpenStreetMap)** para geocodificación inversa
- No requiere API key para volumen bajo
- Implementada en `project/new/page.tsx` dentro de `handleLocation`

---

## Despliegue

- **Local:** `npm run dev` → `http://localhost:3000`
- **Producción:** Vercel → `https://presupuestos-mocha.vercel.app`
- Variables de entorno necesarias:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Deuda técnica / pendientes

| Prioridad | Tarea | Contexto |
|---|---|---|
| Alta | **Pricing Engine real** | `total_amount = largo × ancho × 100` es temporal. Debe calcular por categoría (`m² × precio_material`) |
| Alta | **Lista de Trabajos dinámica** | Los items en `project/[id]/page.tsx` son datos estáticos de ejemplo. Deben venir de `line_items` en Supabase |
| Media | **PDF Export** | No implementado. Considerar `@react-pdf/renderer` |
| Media | **Autenticación** | RLS abierta. Supabase Auth o PIN local antes de producción real |
| Baja | **Validación de formularios** | Actualmente es manual. Considerar Zod |
