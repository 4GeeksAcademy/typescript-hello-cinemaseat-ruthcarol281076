/** Interpreta los comandos de consola y actualiza la matriz de reservas. */
import {
  countSeats,
  createEmptySeatMatrix,
  findFirstAdjacentAvailableSeats,
  reserveSeat
} from "./seatManager";
import { formatSeatMap } from "./seatMap";

/** Indica si la entrada solicita terminar la sesión interactiva. */
function isExitCommand(input: string): boolean {
  return input.trim().toLowerCase() === "salir";
}

/** Ejecuta la sesión de reservas y atiende las consultas disponibles sobre la sala. */
export async function runInteractiveReservations(
  /** Solicita una entrada al usuario y devuelve el texto ingresado. */
  ask: (prompt: string) => Promise<string>,
  /** Muestra un mensaje al usuario. */
  write: (message: string) => void
): Promise<void> {
  let room = createEmptySeatMatrix();

  while (true) {
    write("\n=== Mapa de la sala de cine - Reservas ===");
    write(formatSeatMap(room));

    const rowInput = await ask(
      "Fila (1-8), 'status', 'buscar2AsientosContiguos' o 'salir': "
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

    if (rowInput.trim().toLowerCase() === "status") {
      const [occupiedSeats, availableSeats] = countSeats(room);
      const roomStatus =
        availableSeats === 0
          ? "completa"
          : occupiedSeats === 0
            ? "vacia"
            : "parcialmente ocupada";
      write(
        `Estado de la sala: ${roomStatus}. Ocupados: ${occupiedSeats} | Libres: ${availableSeats}.`
      );
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

    write("\n=== Mapa de la sala de cine - Reservas ===");
    write(formatSeatMap(room));

    const [, availableSeats] = countSeats(room);
    if (availableSeats === 0) {
      write("La sala esta completa; no quedan asientos disponibles.");
      return;
    }
  }
}