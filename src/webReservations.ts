import {
  COLUMN_COUNT,
  countSeats,
  createEmptySeatMatrix,
  findFirstAdjacentAvailableSeats,
  ROW_COUNT,
  type Seat,
  type SeatMatrix
} from "./seatManager";

export const SESSION_STORAGE_KEY = "cinemaseat:room:v1";

export type RoomStatus =
  | "Sala vacía"
  | "Parcialmente ocupada"
  | "Casi llena"
  | "Completa";

/** Deriva el estado legible de la sala desde sus asientos y pares disponibles. */
export function getRoomStatus(matrix: SeatMatrix): RoomStatus {
  const [occupied, available] = countSeats(matrix);

  if (occupied === 0) {
    return "Sala vacía";
  }
  if (available === 0) {
    return "Completa";
  }
  if (!findFirstAdjacentAvailableSeats(matrix)) {
    return "Casi llena";
  }
  return "Parcialmente ocupada";
}

/** Comprueba que un valor tenga las dimensiones y los estados válidos de la sala. */
function isSeatMatrix(value: unknown): value is SeatMatrix {
  return (
    Array.isArray(value) &&
    value.length === ROW_COUNT &&
    value.every(
      (row) =>
        Array.isArray(row) &&
        row.length === COLUMN_COUNT &&
        row.every((seat): seat is Seat => seat === 0 || seat === 1)
    )
  );
}

/** Recupera una matriz válida o inicia una sala vacía si no existe. */
export function loadSessionRoom(
  storage: Pick<Storage, "getItem"> | null
): SeatMatrix {
  if (!storage) {
    return createEmptySeatMatrix();
  }

  try {
    const savedRoom = storage.getItem(SESSION_STORAGE_KEY);
    if (!savedRoom) {
      return createEmptySeatMatrix();
    }

    const parsed: unknown = JSON.parse(savedRoom);
    return isSeatMatrix(parsed) ? parsed : createEmptySeatMatrix();
  } catch {
    return createEmptySeatMatrix();
  }
}

/** Guarda el estado de la sala sin bloquear las reservas si storage falla. */
export function saveSessionRoom(
  storage: Pick<Storage, "setItem"> | null,
  matrix: SeatMatrix
): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(matrix));
    return true;
  } catch {
    return false;
  }
}