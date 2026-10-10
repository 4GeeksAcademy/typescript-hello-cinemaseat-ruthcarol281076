# Spec Delta

## Purpose

Permite al personal consultar y operar las reservas de la sala desde una interfaz web adaptable. La interfaz refleja la misma matriz y las mismas reglas de reserva que la experiencia de consola.

## ADDED Requirements

### Requirement: Mapa visual de la sala
La interfaz SHALL representar los 80 asientos en una disposición de 8 filas por 10 columnas, con etiquetas y una leyenda visible para libre, ocupado y contiguo.

#### Scenario: Mostrar la sala vacía
- **WHEN** se abre la interfaz sin reservas de la sesión
- **THEN** se muestran 8 filas de 10 asientos libres, las etiquetas de fila y columna y la leyenda correspondiente

#### Scenario: Diferenciar los estados visuales
- **WHEN** la matriz contiene asientos libres, ocupados o resaltados como contiguos
- **THEN** los asientos libres son gris oscuro, los ocupados gris claro con una `X` en marca de agua gris más oscuro y los contiguos naranja

#### Scenario: Usar la interfaz en una pantalla móvil
- **WHEN** la interfaz se muestra en una pantalla móvil
- **THEN** la sala, los controles, la leyenda y los paneles de mensajes y estado permanecen visibles y utilizables sin solaparse

### Requirement: Reservar desde el mapa
La interfaz SHALL intentar reservar inmediatamente el asiento libre seleccionado y mostrar el resultado en una ventana de mensajes.

#### Scenario: Reservar un asiento libre con un clic
- **WHEN** se hace clic en un asiento libre
- **THEN** el asiento queda ocupado sin pedir confirmación, el mensaje muestra su fila y columna y se actualizan el conteo y el estado de la sala

#### Scenario: Seleccionar un asiento ocupado
- **WHEN** se hace clic en un asiento ocupado
- **THEN** la matriz no cambia y la ventana de mensajes indica que el asiento ya está ocupado

### Requirement: Buscar y resaltar asientos contiguos
La interfaz SHALL ofrecer una acción que muestre el primer par libre contiguo horizontal según el orden por filas y columnas de la matriz.

#### Scenario: Encontrar un par disponible
- **WHEN** se activa la búsqueda y existe un par libre contiguo
- **THEN** se resaltan en naranja los dos asientos encontrados y el mensaje indica la fila y las columnas de ambos

#### Scenario: No encontrar un par disponible
- **WHEN** se activa la búsqueda y no existe ningún par libre contiguo
- **THEN** la ventana de mensajes informa que no hay un par disponible

#### Scenario: Quitar un resaltado temporal
- **WHEN** hay un par resaltado y se hace clic en cualquier asiento o se vuelve a activar la búsqueda
- **THEN** se quita el resaltado anterior y cada asiento vuelve a reflejar su estado libre u ocupado en la matriz, salvo que la nueva búsqueda resalte otro par

### Requirement: Mostrar conteo y estado de la sala
La interfaz SHALL mostrar de forma interactiva el conteo de asientos ocupados y libres y un estado que distinga sala vacía, parcialmente ocupada, casi llena y completa.

#### Scenario: Actualizar el estado después de una reserva
- **WHEN** una reserva modifica correctamente la matriz
- **THEN** los conteos y el estado de sala se actualizan de inmediato

#### Scenario: Identificar los cuatro estados de sala
- **WHEN** se evalúa la matriz actual
- **THEN** el estado es vacía si no hay asientos ocupados, completa si no quedan asientos libres, casi llena si quedan asientos libres pero no hay ningún par horizontal contiguo, y parcialmente ocupada en los demás casos

### Requirement: Conservar reservas durante la sesión del navegador
La interfaz SHALL conservar el estado de la sala en el almacenamiento de sesión del navegador para recuperarlo al recargar la página, sin sincronización entre usuarios ni persistencia en servidor.

#### Scenario: Recuperar reservas al recargar
- **WHEN** se recarga la página durante la misma sesión del navegador
- **THEN** se restaura la matriz reservada y se muestran sus conteos y estado actuales

#### Scenario: Iniciar otra sesión del navegador
- **WHEN** comienza una nueva sesión sin reservas almacenadas para ella
- **THEN** la sala se inicializa vacía