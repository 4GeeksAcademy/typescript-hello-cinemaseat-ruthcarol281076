import {
  createEmptySeatMatrix,
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

    const rowInput = await ask("Fila (1-8, o 'salir' para terminar): ");
    if (isExitCommand(rowInput)) {
      return;
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
      write("Reserva rechazada: las coordenadas no son validas.");
    }

    write("\n=== Mapa después de la reserva ===");
    write(formatSeatMap(room));
  }
}