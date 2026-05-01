# Protocolo de trabajo - Presupuestos Wilson

Este documento define el flujo de trabajo preferido para que las sesiones de IA y las pruebas manuales sean eficientes.

## 1. Flujo de prueba por defecto

1. Abre la app primero en tu propio navegador.
2. Verifica la pantalla que quieres probar.
3. Si algo no cuadra, reporta:
   - ruta abierta
   - resultado esperado
   - resultado real
   - texto exacto del error, si existe
4. Si el problema es visual, adjunta una captura o un recorte de la zona afectada.
5. Luego pide el cambio mínimo que lo arregle.

## 2. Cuándo usar tu navegador

Usa tu propio navegador cuando quieras:

- comprobar que la app carga
- navegar entre rutas locales
- revisar el comportamiento de botones
- validar ajustes pequeños de UI
- evitar trabajo de inspección extra por parte de la IA

Rutas locales habituales en este proyecto:

- `/` para el dashboard
- `/project/new` para el flujo de nuevo presupuesto
- `/project/[id]` para la pantalla de detalle

## 3. Cuándo pedir que la IA inspeccione

Pide que la IA inspeccione la app cuando quieras:

- una comparación visual contra una referencia
- una segunda opinión sobre layout o espaciado
- ayuda depurando un bug difícil de describir
- inspección directa de un estado concreto de pantalla

## 4. Regla de coste

- Depurar solo con texto suele ser más barato que la inspección visual.
- Una captura enfocada es más barata que varias capturas de pantalla completa.
- Un recorte de la zona rota suele ser más útil que una captura completa.
- Repetir muchas veces la misma revisión visual es lo que más coste genera.

## 5. Archivos de contexto grandes

- Los archivos largos no deben releerse en cada petición.
- Preferir `docs/AI_CONTEXT.md` como memoria compacta.
- Volver al material largo solo cuando falte un detalle concreto.

## 6. Formato recomendado para pasar trabajo

Cuando necesites ayuda, envía:

- qué cambiaste
- qué ruta probaste
- qué falló
- una captura si es visual
- el objetivo exacto que quieres ahora

Así el trabajo se mantiene preciso y no crece el contexto más de la cuenta.
