# Proposal

## Why

La gestión de asientos ya funciona desde la consola, pero el personal necesita consultar y reservar en una interfaz visual, adaptable y disponible en el navegador. Esta mejora incorpora ese flujo sin cambiar la lógica existente ni eliminar el acceso interactivo por consola.

## What Changes

- Reemplazar la plantilla inicial de `index.html` por una interfaz oscura y adaptable con la sala de 8 filas por 10 columnas y una leyenda de asientos libres, ocupados y contiguos.
- Permitir reservar inmediatamente al hacer clic y mostrar el resultado en una ventana de mensajes.
- Añadir una acción para buscar el primer par libre contiguo, resaltarlo temporalmente en naranja y comunicar sus ubicaciones.
- Mostrar conteos y estado de sala actualizados para sala vacía, parcialmente ocupada, casi llena sin pares contiguos y completamente llena.
- Conservar las reservas en `sessionStorage` durante la sesión del navegador, incluso al recargar la página; no añadir sincronización ni persistencia en servidor.
- Mantener `npm run console:interactive` y excluir categorías VIP y precios.

## Capabilities

### New Capabilities
- `seat-management-web`: representación e interacción visual para consultar, reservar y buscar asientos contiguos desde el navegador.

### Modified Capabilities

## Impact

- `index.html` y la entrada web de `src/`; reutilización de `seatManager.ts` y `seatMap.ts` cuando corresponda.
- Estilos existentes de Tailwind y pruebas Vitest para interacciones de navegador y persistencia de sesión.
- `sessionStorage` del navegador; no se añaden servicios, sincronización entre usuarios ni dependencias de backend.