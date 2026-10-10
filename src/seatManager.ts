export type Seat = 0 | 1;
export type SeatRow = ReadonlyArray<Seat>;
export type SeatMatrix = ReadonlyArray<SeatRow>;
export type SeatCounts = readonly [occupied: number, available: number];
export type SeatPosition = readonly [rowNumber: number, columnNumber: number];
export type AdjacentSeatPair = readonly [first: SeatPosition, second: SeatPosition];

export const ROW_COUNT = 8;
export const COLUMN_COUNT = 10;

export type ReservationStatus = "reserved" | "occupied" | "invalid";

export function createEmptySeatMatrix(): SeatMatrix {
  return Array.from({ length: ROW_COUNT }, () =>
    Array.from({ length: COLUMN_COUNT }, (): Seat => 0)
  );
}

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

export function countSeats(matrix: SeatMatrix): SeatCounts {
  const seats = matrix.flat();
  const occupiedCount = seats.filter((seat) => seat === 1).length;

  return [occupiedCount, seats.length - occupiedCount];
}

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