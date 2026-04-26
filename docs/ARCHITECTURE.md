# Arquitectura Técnica - Presupuestos Wilson

Este documento detalla las decisiones técnicas y la estructura del sistema para facilitar el mantenimiento futuro.

## 🎨 Sistema de Diseño (Theming)
Hemos implementado un sistema **centralizado** en `src/app/globals.css`. 

- **Variables CSS:** Todos los colores, radios de borde y efectos de desenfoque (blur) están definidos como variables `:root`.
- **Uso:** No se deben usar colores "hardcoded" (ej: `bg-blue-500`) en los componentes. Siempre usar las clases de utilidad como `.google-card` o las variables como `var(--m3-primary)`.
- **Adaptabilidad:** Cambiar la estética completa de la app solo requiere modificar el bloque `:root` en `globals.css`.

## 🗄️ Capa de Datos (Supabase)
La comunicación con la base de datos se centraliza en `src/lib/data/projects.ts`.

### Políticas RLS:
Para que el CRUD funcione, la tabla `projects` en Supabase debe tener habilitadas las políticas de **Row Level Security**:
- **SELECT:** `true` (público).
- **INSERT/UPDATE/DELETE:** `true` (público para rol `anon` durante desarrollo).

### Modelo de Datos:
```typescript
interface Project {
  id: string;          // UUID
  client_name: string; // Nombre
  address: string;     // Dirección (Geocodificada)
  total_amount: number;// Monto (Calculado por superficie)
  status: string;      // Borrador | Pendiente | Aceptado | Finalizado
  created_at: string;  // Timestamp
}
```

## 📏 Lógica de Medidas (Numpad)
El componente `NumpadSheet.tsx` gestiona la entrada de datos numéricos. 
- **Internamente:** Usa `.` como separador decimal para cálculos en JavaScript.
- **Visualmente:** Convierte `.` a `,` mediante `.replace('.', ',')` para cumplir con el estándar español solicitado por el usuario.

## 🌍 Geolocalización
Usamos la API de **Nominatim (OpenStreetMap)** para la geocodificación inversa. No requiere API Key para volúmenes bajos de peticiones, lo que la hace ideal para el MVP.
