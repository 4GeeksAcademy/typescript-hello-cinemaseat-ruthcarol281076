# Hola Mundo con Typescript

<!-- hide -->
> Por [@ehiber](https://github.com/ehiber) y contribuidores de [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![twitter](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=twitter)](https://twitter.com/4geeksacademy)

*These instructions are available in [english](./README.md).*
<!-- endhide -->

Empieza a programar un sitio con TypeScript/HTML/CSS en 30 segundos abriendo esta plantilla con [One-Click Coding](https://s.4geeks.com/start?repo=https://github.com/4GeeksAcademy/typescript-hello) de 4Geeks o en tu computadora local.

## Antes de empezar

Instala los paquetes escribiendo:

```bash
npm install
```

## Como ejecuto mi sitio para ver cambios en vivo?

Escribe en la linea de comandos:

```bash
npm run start
```

Luego abre la URL local en el navegador (normalmente `http://localhost:5173`).

## Como ejecuto esto en GitHub Codespaces?

Usa el mismo servidor de desarrollo:

```bash
npm run start
```

Vite esta configurado para escuchar en `0.0.0.0`, asi que Codespaces puede detectar y redirigir automaticamente el puerto `5173`.

## Como ejecuto solo la validacion de TypeScript?

Usa este comando para validar solo TypeScript sin iniciar Vite:

```bash
npm run typecheck
```

## Como ejecuto `main.ts` desde la terminal?

Si quieres ejecutar `./src/main.ts` directamente y ver la salida de `console.log` en la terminal, usa:

```bash
npm run console
```

Este comando ya viene conectado por defecto a `./src/main.ts`.

## Donde escribo mi codigo?

Depende del lenguaje:

- `./src/main.ts` para la logica en TypeScript.
- `./src/style.css` para estilos (Tailwind CSS v4 ya viene importado).
- `./index.html` para el HTML base.

Puedes agregar mas archivos cuando quieras, solo asegúrate de importarlos desde `main.ts`.

Nota: si puedes ver la tarjeta de "Hello Rigo" y el mensaje "If you can see this, Tailwind is working.", entonces Tailwind esta configurado correctamente.

## Solucion de problemas

### No veo mis cambios...

Cada vez que cambias cualquier archivo dentro de `./src`, el sitio se refresca automaticamente (hot reload).

Si aun no ves cambios, recarga limpiando cache:

- Mac: `Cmd + Shift + R`
- Windows/Linux: `Ctrl + Shift + R`

## Como incluyo mas imagenes en mi proyecto?

Agregalas dentro de `./public` y referencialas en HTML con `/nombre-imagen.ext`.

Ejemplo:

```html
<img src="/rigo-baby.jpg" alt="Rigo" />
```

## Como incluyo mas archivos TypeScript?

Agrega archivos en `./src` e importalos desde `main.ts`.

Ejemplo:

```ts
import { myVar } from "./file2";
```

## Como publico el sitio?

Este boilerplate es compatible con Vercel en un solo paso.

## Contribuidores

Esta plantilla fue creada como parte del [Coding Bootcamp de 4Geeks Academy](https://4geeksacademy.com/us/coding-bootcamp) por [ehiber](https://github.com/ehiber) y otros contribuidores. Conoce mas sobre nuestro [AI Engineering Course](https://4geeksacademy.com/us/coding-bootcamps/ai-engineering), [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), y [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

Puedes encontrar otras plantillas y recursos como este en la [pagina de GitHub de la escuela](https://github.com/4geeksacademy/).
