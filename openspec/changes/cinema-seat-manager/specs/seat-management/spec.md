# Spec Delta

## Purpose

Gestiona la disponibilidad y reserva de asientos de la sala experimental del cine, de modo que el personal pueda consultar el mapa y localizar asientos juntos desde la consola.

## ADDED Requirements

### Requirement: Sala de asientos
El sistema SHALL representar la sala como una matriz de 8 filas y 10 columnas, con `0` para cada asiento libre y `1` para cada asiento ocupado.

#### Scenario: Inicializar sala vacía
- **WHEN** se inicializa la sala
- **THEN** la matriz contiene 8 filas de 10 asientos y todos tienen valor `0`

### Requirement: Mostrar mapa de asientos
El sistema SHALL mostrar el estado de cada asiento con `L` para libre y `X` para ocupado, incluyendo etiquetas de fila y columna numeradas desde 1.

#### Scenario: Mostrar la sala
- **WHEN** se imprime el estado actual de la sala
- **THEN** la salida identifica las 8 filas y las 10 columnas y representa cada asiento con `L` o `X` según su estado

### Requirement: Reservar un asiento
El sistema SHALL aceptar coordenadas de fila de 1 a 8 y columna de 1 a 10, marcar como ocupado un asiento libre y comunicar el resultado; una reserva no alterará la matriz recibida.

#### Scenario: Reservar asiento libre
- **WHEN** se solicita reservar un asiento libre con coordenadas válidas
- **THEN** el resultado confirma la reserva y entrega el estado actualizado con ese asiento ocupado

#### Scenario: Intentar reservar asiento ocupado
- **WHEN** se solicita reservar un asiento que ya está ocupado
- **THEN** el resultado indica que la reserva falló porque el asiento ya está ocupado y conserva el estado de la sala

#### Scenario: Coordenadas fuera de rango
- **WHEN** se solicita reservar una fila menor que 1 o mayor que 8, o una columna menor que 1 o mayor que 10
- **THEN** el resultado indica que las coordenadas no son válidas y conserva el estado de la sala

### Requirement: Contar disponibilidad
El sistema SHALL informar la cantidad total de asientos ocupados y libres en la sala.

#### Scenario: Contar una sala con estados mixtos
- **WHEN** se solicita el conteo de una sala con asientos ocupados y libres
- **THEN** se devuelven ambos conteos y su suma es 80

### Requirement: Encontrar asientos contiguos
El sistema SHALL localizar el primer par de asientos libres contiguos horizontalmente en una misma fila, recorriendo primero las filas y luego las columnas.

#### Scenario: Existe un par libre
- **WHEN** al menos una fila contiene dos asientos libres consecutivos
- **THEN** se devuelven las coordenadas del primer par encontrado, numeradas desde 1

#### Scenario: No existe un par libre
- **WHEN** no hay dos asientos libres consecutivos en ninguna fila
- **THEN** se comunica claramente que no se encontró un par contiguo disponible