import {
  countSeats,
  createEmptySeatMatrix,
  findFirstAdjacentAvailableSeats,
  reserveSeat
} from "./seatManager";
import { formatSeatMap } from "./seatMap";

function isExitCommand(input: string): boolean {
  return input.trim().toLowerCase() === "salir";
}

export async function runInteractiveReservations(
  ask: (prompt: string) => Promise<string>,
  write: (message: string) => void
): Promise<void> {
  let room = createEmptySeatMatrix();

  while (true) {
    write("\n=== Mapa antes de la reserva ===");
    write(formatSeatMap(room));

    const rowInput = await ask(
      "Fila (1-8), 'buscar2AsientosContiguos' o 'salir': "
    );
    if (isExitCommand(rowInput)) {
      return;
    }

    if (rowInput.trim().toLowerCase() === "buscar2asientoscontiguos") {
      const [, availableSeats] = countSeats(room);
      if (availableSeats > 0) {
        const adjacentPair = findFirstAdjacentAvailableSeats(room);
        if (adjacentPair) {
          write(
            `Par contiguo disponible: fila ${adjacentPair[0][0]}, asientos ${adjacentPair[0][1]} y ${adjacentPair[1][1]}.`
          );
        } else {
          write("No hay dos asientos contiguos disponibles.");
        }
      }
      continue;
    }

    const columnInput = await ask("Asiento (1-10, o 'salir' para terminar): ");
    if (isExitCommand(columnInput)) {
      return;
    }

    const rowNumber = Number(rowInput);
    const columnNumber = Number(columnInput);
    const [updatedRoom, status] = reserveSeat(room, rowNumber, columnNumber);
    room = updatedRoom;

    if (status === "reserved") {
      write(`Reserva confirmada: fila ${rowNumber}, asiento ${columnNumber}.`);
    } else if (status === "occupied") {
      write("Reserva rechazada: el asiento ya esta ocupado.");
    } else {
      write(
        "La fila debe estar entre 1 y 8 y el asiento entre 1 y 10. Intentalo de nuevo."
      );
    }

    write("\n=== Mapa después de la reserva ===");
    write(formatSeatMap(room));

    const [, availableSeats] = countSeats(room);
    if (availableSeats === 0) {
      write("La sala esta completa; no quedan asientos disponibles.");
      return;
    }
  }
}