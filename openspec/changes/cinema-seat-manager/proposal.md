# Proposal

## Why

El cine gestiona actualmente la disponibilidad en papel, lo que causa confusiones y demora al atender consultas y reservas. Un prototipo de consola permitirá verificar la lógica de ocupación y búsqueda antes de invertir en una interfaz completa.

## What Changes

- Introducir la gestión de una sala de cine de 8 filas por 10 asientos.
- Mostrar la disponibilidad, reservar asientos, contar estados y localizar el primer par de asientos libres contiguos en una fila.
- Mantener el alcance en un prototipo de consola, sin persistencia ni reservas en línea.

## Capabilities

### New Capabilities
- `seat-management`: representación y operaciones de disponibilidad y reserva de asientos en una sala.

### Modified Capabilities

## Impact

- Código TypeScript existente en `src/main.ts` y módulos auxiliares que se definan durante el diseño.
- Pruebas unitarias para las operaciones de la sala; será necesario configurar un framework de pruebas.
- La configuración actual de TypeScript ya tiene `strict: true`.