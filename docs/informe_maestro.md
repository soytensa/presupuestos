

Este documento recopila la trazabilidad completa de la conversación, los acuerdos alcanzados y la lógica de negocio definida para el desarrollo en Antigravity.

1. DEL CONCEPTO INICIAL A LA IDENTIDAD VISUAL:
- Se inició planteando la necesidad de una herramienta profesional para Wilson Torrez, centrada en reformas.
- Se rechazó el estilo de software de gestión antiguo en favor de una estética moderna "Bento Grid".
- Se exploraron estilos inspirados en "RCM Control", Samsung One UI y el ecosistema Apple/iPhone.
- Se llegó a la conclusión de usar un modo oscuro "Pure OLED" (#000000) para el ahorro de batería en obra y legibilidad, con acentos en "Verde Eléctrico" (#39FF14).
- Se definieron elementos de UI con bordes muy redondeados (+30px) y una disposición de tarjetas minimalista para evitar la saturación de datos en pantalla.
- Se acordó que, aunque se desea calidad, la fluidez y la funcionalidad táctil son la prioridad absoluta.

2. LÓGICA DE NEGOCIO Y EL "CASO MAESTRO" (BAÑO 3X3):
- Se definió un caso de prueba real: Reforma de baño de 3m x 3m con 3m de altura estructural y 2.50m de falso techo.
- Se insistió en la "granularidad total": el software no debe dar precios genéricos, sino desglosar materiales ínfimos como los tornillos PM 3.5x25 (calculando aprox. 500 unidades para este caso).
- Se discutió la inclusión de la electricidad: la conclusión fue no incluir la instalación técnica (cables/mecanismos) si la hace un tercero, pero SÍ cobrar obligatoriamente las "Ayudas de Albañilería" (rozas y tapado), basándose en la realidad de la obra.
- Se acordó incluir partidas automáticas a menudo olvidadas: protección de zonas comunes (ascensores/suelos) y gestión de residuos (contenedores/sacos).

3. LA BASE DE DATOS Y LA BASE DE MADRID (BCCM):
- Se analizaron los archivos de la Base de Precios de la Construcción de la Comunidad de Madrid 2024 (PDF y .bc3).
- Se debatió sobre la complejidad de las 3.000 páginas y se decidió que usarla íntegramente sería contraproducente para un autónomo.
- La conclusión final: Usar la estructura de la BCCM como "esqueleto" institucional, pero alimentar los precios con datos reales de mercado de 2026.
- Se estableció un sistema de 3 capas de precio: 
    1. Base oficial (BCCM).
    2. Coeficiente de beneficio de Wilson.
    3. "Override" o precio real de proveedor (como Obramat).
- Se acordó la necesidad de gestionar 3 áreas geográficas de Madrid para ajustar los precios automáticamente según la ubicación de la obra.

4. ANÁLISIS DE PRESUPUESTOS REALES (ABRIL 2026):
- Se procesaron dos presupuestos reales (C/ José Arcones Gil 136) para extraer precios de mercado actuales.
- Se identificaron marcas de referencia que Wilson usa: Gala, Kassandra, Simon 27, Kerakoll, Duplach.
- Se extrajeron costes reales: Falso techo pladur (~40,96€/m²), Punto de agua (~160€), Protección de zonas comunes (300€), Ayudas de albañilería (~320€-480€).
- Se decidió que estos documentos sirven de validación final para las cláusulas legales que debe generar el PDF (Exclusión de IVA, validez de 3 meses, etc.).

5. INTEGRACIÓN CON ANTIGRAVITY Y DESARROLLO TÉCNICO:
- Se estableció que la comunicación se divide en dos: Gemini (este chat) para el "pensamiento y estrategia" y Antigravity para la "ejecución de código".
- Se decidió que Antigravity tiene la decisión final sobre la implementación técnica específica (lenguajes, estructura de carpetas, optimización de código) para asegurar que el proyecto sea escalable y moderno.
- Se intuyó que Next.js (App Router), Tailwind CSS y Supabase es el stack ideal para una PWA que funcione en iPhone sin necesidad de App Store.
- Se acordó trabajar en local inicialmente, usando Vercel para pruebas en el móvil de forma gratuita y descartando de momento Android Studio por su complejidad innecesaria.
- Se planteó el uso de imágenes conceptuales generadas en este chat y los archivos subidos (PDF/CSV/BC3) como material de referencia directo para que Antigravity no trabaje sobre suposiciones.

6. HOJA DE RUTA (ROADMAP) ACORDADA:
- Prioridad 1: Estructura de archivos, Login por PIN y esquema de Base de Datos en Supabase (Tablas de Capítulos, Partidas y Materiales Granulares).
- Prioridad 2: Interfaz de entrada de medidas y cálculo automático de materiales (Tornillería/Placas).
- Prioridad 3: Sistema de capas de precio y selector de zona geográfica.
- Prioridad 4: Generación de PDF profesional con fotos del estado original de la obra.


7. ORGANIZACIÓN DEL REPOSITORIO:
Se ha estructurado el proyecto de manera profesional siguiendo la jerarquía:
- `/docs`: Documentación técnica y especificaciones (ej. `informe_maestro.md`).
- `/data/bccm`: Archivos oficiales `.bc3` de la Comunidad de Madrid (Áreas 1, 2 y 3).
- `/data/referencias`: Presupuestos reales en PDF y Excel para extracción de precios.
- `/diseno/mockups`: Imágenes conceptuales y capturas de pantalla de la UI.
- `/diseno/recursos`: Logos y elementos gráficos de la aplicación.

ESTADO ACTUAL: Repositorio organizado y estructurado. El equipo dispone del contexto total para avanzar en el desarrollo de la lógica de precios y la UI Bento, con todas las fuentes de verdad localizadas y normalizadas.