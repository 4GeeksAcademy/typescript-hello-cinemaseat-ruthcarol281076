/** Configura Vite y Vitest para el proyecto y sus pruebas de Node. */
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  preview: {
    host: "0.0.0.0",
    port: 4173
  },
  test: {
    // Ejecuta las pruebas del dominio en Node, sin entorno de navegador.
    environment: "node",
    include: ["src/**/*.test.ts"]
  }
});
