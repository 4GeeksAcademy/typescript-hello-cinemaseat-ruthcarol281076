# Tasks

## 1. Entrada web y mapa

- [x] 1.1 Reemplazar el contenido inicial de `index.html` por la estructura semántica de sala, controles, leyenda y regiones de mensajes/estado, y cargar una entrada web separada; verificar que Vite compila y que `npm run console:interactive` conserva su entrada actual.
- [x] 1.2 Renderizar las 8 filas y 10 columnas usando la matriz y operaciones de `seatManager.ts`, con etiquetas accesibles para cada asiento; verificar el mapa inicial vacío y sus coordenadas en una prueba Vitest.

## 2. Reservas, búsqueda y sesión

- [x] 2.1 Implementar reserva por clic y mensajes para reserva exitosa y asiento ocupado, actualizando conteos y estado desde la matriz; verificar ambos resultados y que una reserva no modifica la matriz recibida en pruebas Vitest.
- [x] 2.2 Implementar la búsqueda del primer par horizontal, el mensaje con sus coordenadas y el resaltado transitorio que se limpia antes del siguiente clic o búsqueda; verificar el primer par, ausencia de pares y limpieza del resaltado en pruebas Vitest.
- [x] 2.3 Persistir reservas exitosas en `sessionStorage`, restaurarlas al iniciar y descartar datos inválidos con una sala vacía; verificar guardado, restauración al recargar y recuperación ante datos malformados en pruebas Vitest.
- [x] 2.4 Derivar y mostrar los estados vacía, parcialmente ocupada, casi llena sin pares contiguos y completa junto con conteos actualizados; verificar los cuatro estados con matrices representativas en pruebas Vitest.

## 3. Presentación adaptable

- [x] 3.1 Aplicar el tema oscuro y la forma visual de los asientos, con libre en gris oscuro, ocupado en gris claro con `X` de marca de agua y contiguo en naranja; verificar que cada estado visual corresponde a la matriz o al resaltado temporal.
- [x] 3.2 Ajustar el mapa cuadrado de 8 por 10, controles, leyenda y paneles para pantallas móviles sin solapamientos; verificar manualmente en un viewport móvil y uno de escritorio.

## 4. Verificación integrada

- [x] 4.1 Ejecutar `npm test -- --run`, `npm run typecheck` y `npm run build`, y comprobar en navegador reserva inmediata, búsqueda, recarga dentro de la sesión y uso móvil; confirmar también que `npm run console:interactive` sigue disponible.