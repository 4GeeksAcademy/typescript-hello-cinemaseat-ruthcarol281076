/** Ejecuta escenarios de demostración para mapas y operaciones de reserva. */
import {
  COLUMN_COUNT,
  countSeats,
  createEmptySeatMatrix,
  findFirstAdjacentAvailableSeats,
  reserveSeat,
  ROW_COUNT,
  Seat,
  SeatMatrix
} from "./seatManager";
import { formatSeatMap } from "./seatMap";

const emptyRoom = createEmptySeatMatrix();
console.log("\n=== Sala vacia ===");
console.log(formatSeatMap(emptyRoom));
const [emptyOccupied, emptyAvailable] = countSeats(emptyRoom);
console.log(`Ocupados: ${emptyOccupied} | Libres: ${emptyAvailable}`);
const emptyPair = findFirstAdjacentAvailableSeats(emptyRoom);
if (emptyPair) {
  console.log(
    `Primer par contiguo: fila ${emptyPair[0][0]}, asientos ${emptyPair[0][1]} y ${emptyPair[1][1]}.`
  );
}

let partiallyOccupiedRoom = createEmptySeatMatrix();
const [afterFirstReservation, firstReservationStatus] = reserveSeat(
  partiallyOccupiedRoom,
  4,
  5
);
partiallyOccupiedRoom = afterFirstReservation;
if (firstReservationStatus === "reserved") {
  console.log("Reserva confirmada: fila 4, asiento 5.");
}
const [afterSecondReservation, secondReservationStatus] = reserveSeat(
  partiallyOccupiedRoom,
  4,
  6
);
partiallyOccupiedRoom = afterSecondReservation;
if (secondReservationStatus === "reserved") {
  console.log("Reserva confirmada: fila 4, asiento 6.");
}
const [afterDuplicateReservation, duplicateReservationStatus] = reserveSeat(
  partiallyOccupiedRoom,
  4,
  5
);
partiallyOccupiedRoom = afterDuplicateReservation;
if (duplicateReservationStatus === "occupied") {
  console.log("Reserva rechazada: el asiento ya esta ocupado.");
}
console.log("\n=== Sala parcialmente ocupada ===");
console.log(formatSeatMap(partiallyOccupiedRoom));
const [partialOccupied, partialAvailable] = countSeats(partiallyOccupiedRoom);
console.log(`Ocupados: ${partialOccupied} | Libres: ${partialAvailable}`);
const partialPair = findFirstAdjacentAvailableSeats(partiallyOccupiedRoom);
if (partialPair) {
  console.log(
    `Primer par contiguo: fila ${partialPair[0][0]}, asientos ${partialPair[0][1]} y ${partialPair[1][1]}.`
  );
}

const nearlyFullRoom: SeatMatrix = Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
  Array.from({ length: COLUMN_COUNT }, (_, columnIndex): Seat => {
    const isIsolatedAvailableSeat =
      (rowIndex === 0 && (columnIndex === 0 || columnIndex === 2)) ||
      (rowIndex === ROW_COUNT - 1 && columnIndex === 4);
    return isIsolatedAvailableSeat ? 0 : 1;
  })
);
console.log("\n=== Sala casi llena con asientos libres aislados ===");
console.log(formatSeatMap(nearlyFullRoom));
const [nearlyFullOccupied, nearlyFullAvailable] = countSeats(nearlyFullRoom);
console.log(`Ocupados: ${nearlyFullOccupied} | Libres: ${nearlyFullAvailable}`);
const nearlyFullPair = findFirstAdjacentAvailableSeats(nearlyFullRoom);
if (!nearlyFullPair) {
  console.log("No hay dos asientos libres contiguos.");
}

const fullRoom: SeatMatrix = Array.from({ length: ROW_COUNT }, () =>
  Array.from({ length: COLUMN_COUNT }, (): Seat => 1)
);
console.log("\n=== Sala completa ===");
console.log(formatSeatMap(fullRoom));
const [fullOccupied, fullAvailable] = countSeats(fullRoom);
console.log(`Ocupados: ${fullOccupied} | Libres: ${fullAvailable}`);
const fullPair = findFirstAdjacentAvailableSeats(fullRoom);
if (!fullPair) {
  console.log("No hay dos asientos libres contiguos.");
}
