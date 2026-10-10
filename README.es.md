# CinemaSeat | Gestor de asientos de cine

<!-- hide -->
> Por [@ehiber](https://github.com/ehiber) y contribuidores de [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![twitter](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=twitter)](https://twitter.com/4geeksacademy)

*These instructions are available in [english](./README.md).*
<!-- endhide -->

CinemaSeat es una aplicación web para consultar y reservar asientos en una sala de 8 filas por 10 columnas. Permite reservar con un clic, encontrar el primer par horizontal contiguo disponible y consultar en tiempo real el conteo y estado de la sala. La experiencia de consola original también sigue disponible.

## Requisitos

- Node.js 20 o posterior
- npm

## Instalación

Clona o descarga el proyecto y, desde su directorio, instala las dependencias:

```bash
npm install
```

## Iniciar la aplicación web

Inicia el servidor de desarrollo:

```bash
npm run start
```

Abre `http://localhost:5173` en el navegador. Vite actualiza la página automáticamente al guardar cambios.

## Uso

- El mapa muestra las filas y columnas numeradas del 1 al 8 y del 1 al 10.
- Haz clic en un asiento libre para reservarlo inmediatamente. Si ya está ocupado, la reserva se rechaza y la matriz no cambia.
- Usa **Buscar primer par** para localizar el primer par libre contiguo en una misma fila. Los asientos encontrados se resaltan en naranja; el resaltado temporal se elimina con el siguiente clic o búsqueda.
- Los paneles de estado y mensajes muestran las ubicaciones, el conteo de asientos libres y ocupados y el estado actual: sala vacía, parcialmente ocupada, casi llena o completa. “Casi llena” significa que quedan asientos libres, pero no hay pares contiguos.
- Las reservas se guardan en `sessionStorage` y se conservan al recargar durante la sesión de esa pestaña. No se sincronizan entre personas ni se guardan en un servidor.

Los asientos libres son gris oscuro, los ocupados gris claro con una `X` de marca de agua y el par encontrado es naranja. La interfaz adapta el mapa y sus controles a pantallas móviles. No incluye categorías VIP ni precios.

## Usar en GitHub Codespaces

Ejecuta el mismo servidor:

```bash
npm run start
```

Vite escucha en `0.0.0.0`, por lo que Codespaces puede detectar y reenviar automáticamente el puerto `5173`.

## Usar CinemaSeat desde la consola

La interfaz web no reemplaza los comandos de consola.

### Demo de escenarios

Muestra salas vacías, parcialmente ocupadas, casi llenas y completas:

```bash
npm run console
```

### Consola interactiva

Inicia una sesión de reservas en la terminal:

```bash
npm run console:interactive
```

Ingresa una fila del 1 al 8 y un asiento del 1 al 10. Escribe `status` para ver los conteos, `buscar2AsientosContiguos` para localizar el primer par horizontal disponible o `salir` para terminar.

## Pruebas y compilación

Ejecuta las pruebas automatizadas:

```bash
npm test -- --run
```

Valida TypeScript:

```bash
npm run typecheck
```

Genera la versión de producción y sírvela localmente para revisarla:

```bash
npm run build
npm run preview
```

## Estructura principal

- `index.html` y `src/webMain.ts`: página y entrada de la aplicación web.
- `src/webApp.ts`: interacción del mapa y actualización de la interfaz.
- `src/seatManager.ts`: matriz y operaciones de dominio compartidas por web y consola.
- `src/webReservations.ts`: estado de sala y almacenamiento de sesión.
- `src/webSeatMap.ts`: renderizado y etiquetas accesibles de los asientos.
- `src/style.css`: tema oscuro y estilos adaptables; Tailwind CSS v4 está configurado.

## Solución de problemas

### Los cambios no aparecen

Los cambios en `src/` deberían reflejarse automáticamente. Si no aparecen, recarga la página limpiando la caché:

- macOS: `Cmd + Shift + R`
- Windows/Linux: `Ctrl + Shift + R`

## Contribuidores

Este proyecto parte de la plantilla creada como parte del [Coding Bootcamp de 4Geeks Academy](https://4geeksacademy.com/us/coding-bootcamp) por [ehiber](https://github.com/ehiber) y otros contribuidores. Conoce más sobre nuestro [AI Engineering Course](https://4geeksacademy.com/us/coding-bootcamps/ai-engineering), [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), y [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

Puedes encontrar otras plantillas y recursos en la [página de GitHub de la escuela](https://github.com/4geeksacademy/).
