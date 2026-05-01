# Informe maestro - Presupuestos Wilson

Este documento recopila la trazabilidad de la conversación, los acuerdos alcanzados y la lógica de negocio definida durante el desarrollo inicial.

## 1. Del concepto inicial a la identidad visual

- Se partió de la necesidad de una herramienta profesional para Wilson Torrez, centrada en reformas.
- Se descartó el estilo de software de gestión antiguo en favor de una estética moderna tipo **Bento Grid**.
- Se exploraron estilos inspirados en RCM Control, Samsung One UI y el ecosistema Apple/iPhone.
- Se concluyó usar un modo oscuro **Pure OLED** (`#000000`) para ahorrar batería en obra y mejorar la legibilidad, con acentos en **Verde Eléctrico** (`#39FF14`).
- Se definieron elementos de UI con bordes muy redondeados, por encima de `30px`, y una disposición de tarjetas minimalista para evitar saturar la pantalla.
- Se acordó que, aunque se busca calidad, la fluidez y la funcionalidad táctil son la prioridad absoluta.

## 2. Lógica de negocio y el caso maestro del baño 3x3

- Se definió un caso real de prueba: reforma de un baño de `3m x 3m` con `3m` de altura estructural y `2,50m` de falso techo.
- Se insistió en la granularidad total: el software no debe dar precios genéricos, sino desglosar materiales pequeños como los tornillos `PM 3.5x25`, calculando unas `500` unidades para este caso.
- Se discutió la inclusión de la electricidad: la conclusión fue no incluir la instalación técnica si la hace un tercero, pero sí cobrar obligatoriamente las **Ayudas de Albañilería**.
- Se acordó incluir partidas automáticas que suelen olvidarse, como la protección de zonas comunes y la gestión de residuos.

## 3. Base de datos y Base de Precios de Madrid

- Se analizaron los archivos de la Base de Precios de la Construcción de la Comunidad de Madrid 2024.
- Se concluyó que usarla íntegramente sería contraproducente para un autónomo.
- La decisión final fue usar la estructura de la BCCM como esqueleto institucional, pero alimentar los precios con datos reales de mercado de 2026.
- Se estableció un sistema de 3 capas de precio:
  1. Base oficial (BCCM)
  2. Coeficiente de beneficio de Wilson
  3. Override o precio real de proveedor
- Se acordó gestionar 3 áreas geográficas de Madrid para ajustar los precios según la ubicación de la obra.

## 4. Análisis de presupuestos reales

- Se procesaron presupuestos reales de abril de 2026 para extraer precios de mercado actuales.
- Se identificaron marcas de referencia usadas por Wilson: Gala, Kassandra, Simon 27, Kerakoll y Duplach.
- Se extrajeron costes reales como:
  - falso techo de pladur: unos `40,96 €/m²`
  - punto de agua: unos `160 €`
  - protección de zonas comunes: `300 €`
  - ayudas de albañilería: entre `320 €` y `480 €`
- Estos documentos sirven como validación para las cláusulas legales que debe generar el PDF, como exclusión de IVA, validez de 3 meses y gestión de residuos.

## 5. Integración con Antigravity y desarrollo técnico

- Se estableció que la comunicación se dividía en dos:
  - Gemini para el pensamiento y la estrategia
  - Antigravity para la ejecución de código
- Se decidió que Antigravity tenía la decisión final sobre la implementación técnica concreta para asegurar escalabilidad.
- Se intuyó que Next.js, Tailwind CSS y Supabase eran el stack ideal para una PWA que funcione en iPhone sin pasar por App Store.
- Se acordó trabajar primero en local y usar Vercel para probar en móvil.
- Se planteó usar imágenes conceptuales y archivos adjuntos como material de referencia directo para que el desarrollo no se hiciera sobre suposiciones.

## 6. Hoja de ruta acordada

- Prioridad 1: estructura de archivos, login por PIN y esquema de base de datos en Supabase.
- Prioridad 2: interfaz de entrada de medidas y cálculo automático de materiales.
- Prioridad 3: sistema de capas de precio y selector de zona geográfica.
- Prioridad 4: generación de PDF profesional con fotos del estado original de la obra.

## 7. Organización del repositorio

Se ha estructurado el proyecto siguiendo esta jerarquía:

- `/docs`: documentación técnica y especificaciones
- `/data/bccm`: archivos oficiales `.bc3` de la Comunidad de Madrid
- `/data/referencias`: presupuestos reales en PDF y Excel
- `/diseno/mockups`: imágenes conceptuales y capturas de pantalla
- `/diseno/recursos`: logos y elementos gráficos de la aplicación

## Estado actual

El repositorio está organizado y estructurado. El equipo dispone del contexto necesario para avanzar en la lógica de precios y la UI Bento, con todas las fuentes de verdad localizadas y normalizadas.
