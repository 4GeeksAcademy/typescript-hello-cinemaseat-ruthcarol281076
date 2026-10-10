/** Valor binario de un asiento: 0 disponible y 1 reservado. */
export type Seat = 0 | 1;
/** Asientos de una fila, en orden de columna. */
export type SeatRow = ReadonlyArray<Seat>;
/** Filas de la sala, en orden ascendente. */
export type SeatMatrix = ReadonlyArray<SeatRow>;
/** Conteos en el orden [ocupados, disponibles]. */
export type SeatCounts = readonly [occupied: number, available: number];
/** Coordenadas de asiento basadas en filas y columnas desde 1. */
export type SeatPosition = readonly [rowNumber: number, columnNumber: number];
/** Primer y segundo asiento disponible de un par horizontal. */
export type AdjacentSeatPair = readonly [first: SeatPosition, second: SeatPosition];

/** Cantidad de filas de la sala. */
export const ROW_COUNT = 8;
/** Cantidad de asientos por fila. */
export const COLUMN_COUNT = 10;

/** Resultado posible de intentar reservar un asiento. */
export type ReservationStatus = "reserved" | "occupied" | "invalid";

/** Crea una matriz de 8 por 10 con todos los asientos disponibles. */
export function createEmptySeatMatrix(): SeatMatrix {
  return Array.from({ length: ROW_COUNT }, () =>
    Array.from({ length: COLUMN_COUNT }, (): Seat => 0)
  );
}

/**
 * Reserva un asiento sin modificar la matriz recibida.
 * @param matrix Estado actual de la sala.
 * @param rowNumber Fila basada en 1.
 * @param columnNumber Asiento dentro de la fila, basado en 1.
 * @returns La matriz resultante y el estado de la reserva.
 */
export function reserveSeat(
  matrix: SeatMatrix,
  rowNumber: number,
  columnNumber: number
): readonly [SeatMatrix, ReservationStatus] {
  if (
    !Number.isInteger(rowNumber) ||
    !Number.isInteger(columnNumber) ||
    rowNumber < 1 ||
    rowNumber > ROW_COUNT ||
    columnNumber < 1 ||
    columnNumber > COLUMN_COUNT
  ) {
    return [matrix, "invalid"];
  }

  const rowIndex = rowNumber - 1;
  const columnIndex = columnNumber - 1;

  if (matrix[rowIndex][columnIndex] !== 0) {
    return [matrix, "occupied"];
  }

  const updatedMatrix = matrix.map((row, currentRowIndex) =>
    currentRowIndex === rowIndex
      ? row.map((seat, currentColumnIndex): Seat =>
          currentColumnIndex === columnIndex ? 1 : seat
        )
      : row
  );

  return [updatedMatrix, "reserved"];
}

/** Cuenta los asientos ocupados y disponibles de la matriz. */
export function countSeats(matrix: SeatMatrix): SeatCounts {
  const seats = matrix.flat();
  const occupiedCount = seats.filter((seat) => seat === 1).length;

  return [occupiedCount, seats.length - occupiedCount];
}

/** Busca el primer par libre horizontal, recorriendo la sala por filas. */
export function findFirstAdjacentAvailableSeats(
  matrix: SeatMatrix
): AdjacentSeatPair | null {
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1) {
    const row = matrix[rowIndex];

    for (let columnIndex = 0; columnIndex < row.length - 1; columnIndex += 1) {
      if (row[columnIndex] === 0 && row[columnIndex + 1] === 0) {
        return [
          [rowIndex + 1, columnIndex + 1],
          [rowIndex + 1, columnIndex + 2]
        ];
      }
    }
  }

  return null;
}