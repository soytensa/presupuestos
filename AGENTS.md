# Guía para Agentes de IA — Presupuestos Wilson

Este archivo contiene instrucciones críticas para cualquier agente de IA (Copilot, Codex, Cursor, Claude, etc.) que trabaje en este repositorio.

---

## ⚠️ Reglas Obligatorias

### 1. Next.js — Versión con Breaking Changes
```
<!-- BEGIN:nextjs-agent-rules -->
This is NOT the Next.js you know.
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data.
Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
```

### 2. Sistema de Diseño — NO inventar estilos
- **Todo el theming está centralizado en `src/app/globals.css`**. Lee ese archivo antes de tocar estilos.
- **NO uses colores hardcoded** tipo `bg-blue-500` o `text-gray-400`. Usa las variables CSS definidas: `text-primary`, `text-surface-variant`, `bg-surface`, etc.
- **NO uses clases de Material Design** (`.google-card`, `--m3-primary`). Esas están obsoletas. El sistema actual se llama **Glacier**.
- Las clases de utilidad son: `.glacier-card`, `.glacier-btn`, `.glacier-input`, `.chip`, `.chip-active`.

### 3. Referencia visual — Los bocetos de Stitch son la fuente de verdad
Los bocetos HTML originales están en `diseno/recursos/stitch_buildtech_budgeting_pro/`. Antes de cambiar la UI de cualquier página, **consulta el `.html` correspondiente** para ver el diseño de referencia exacto.

| Página | Boceto de referencia |
|---|---|
| Dashboard | `dashboard_proyectos_fiel_a_referencia/code.html` |
| Nuevo Presupuesto (paso 1) | `nuevo_presupuesto_datos/code.html` |
| Selección de Categorías (paso 2) | `seleccion_de_categorias/code.html` |
| Detalle del Proyecto | `detalle_del_presupuesto/code.html` |

### 4. Base de datos — No cambiar el esquema sin avisar
- Toda la lógica de Supabase está en `src/lib/data/projects.ts`.
- El esquema SQL está en `supabase/schema.sql`.
- Las políticas RLS están en Supabase Dashboard (no en el repo). Están abiertas para `anon` en desarrollo.

### 5. Formato de números
- Internamente: punto `.` como separador decimal (JavaScript estándar).
- En pantalla: coma `,` como separador decimal (formato español). Ver `NumpadSheet.tsx`.

---

## 📐 Arquitectura de Componentes

```
Dashboard (page.tsx)
  └── BudgetCard (components/bento/BudgetCard.tsx)

Nuevo Presupuesto (project/new/page.tsx)
  ├── Step 1: Datos del cliente + medidas
  ├── Step 2: Selección de categorías
  └── NumpadSheet (components/ui/NumpadSheet.tsx)

Detalle (project/[id]/page.tsx)
  ├── Header con edición inline
  ├── Bento Grid (Superficie + Total)
  └── Lista de Trabajos (estática por ahora)
```

---

## 🔮 Funcionalidades Pendientes (Próximos Pasos)

Si el usuario pide alguna de estas, aquí está el contexto:

1. **Pricing Engine** — La columna `total_amount` se calcula hoy con `largo * ancho * 100` (estático). La lógica real debería calcular por categoría: m² × precio_por_m² (diferente según Pladur, Pintura, etc.).

2. **PDF Export** — No implementado. Sugerencia: usar `@react-pdf/renderer` o similar.

3. **Autenticación** — No implementada. RLS en Supabase está abierta al público. No desplegar a producción sin cerrar esto.

4. **Lista de Trabajos dinámica** — En `project/[id]/page.tsx`, los "Trabajos" son actualmente datos estáticos de ejemplo. Deben venir de una tabla `line_items` en Supabase relacionada con el `project.id`.
