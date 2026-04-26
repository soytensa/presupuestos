# Presupuestos Wilson v0.4.0 (Material Design Edition)

Aplicación PWA de alto rendimiento para la gestión de presupuestos de reformas, optimizada para uso en obra y con una estética basada en **Google Material Design 3**.

## 🚀 Estado Actual
La aplicación se encuentra en fase **MVP (Producto Mínimo Viable)**. Hemos completado la infraestructura base de datos y la interfaz de usuario de nueva generación.

### Funcionalidades Implementadas:
- 📊 **Dashboard Bento:** Gestión visual de presupuestos recientes con estados dinámicos.
- 🛠️ **CRUD Completo:** Creación, edición (Nombre, Dirección, Estado) y borrado de proyectos sincronizado con Supabase.
- 📏 **Sistema de Medidas:** Numpad personalizado con formato español (uso de `,` para decimales) para Largo, Ancho y Alto.
- 🌍 **Geolocalización:** Registro automático de la dirección de obra mediante GPS y Nominatim API.
- 🎨 **Google Design System:** Tema oscuro oficial de Google con variables centralizadas en `globals.css`.

## 🛠️ Stack Tecnológico
- **Frontend:** Next.js 14+ (Turbopack), React, Tailwind CSS 4.
- **Backend:** Supabase (PostgreSQL + RLS).
- **Iconos:** Lucide React.
- **Despliegue:** Vercel.

## 📁 Estructura del Proyecto
- `/src/app`: Rutas y páginas (Dashboard, Detalle, Formulario).
- `/src/components`: Componentes UI y Bento Cards.
- `/src/lib/data`: Capa de datos y lógica de conexión con Supabase.
- `/src/app/globals.css`: Sistema de diseño centralizado (Variables Material 3).

## 🚀 Próximos Pasos
1. **Pricing Engine:** Lógica avanzada de cálculo por material (m² de Pladur, botes de pintura, etc.).
2. **Generación de PDF:** Exportación profesional para envío al cliente.
3. **Autenticación:** Sistema de bloqueo por PIN para acceso privado.

---
*Desarrollado con ❤️ por Wilson Torrez & Antigravity AI*
