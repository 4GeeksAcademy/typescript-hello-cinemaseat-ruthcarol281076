/** Prueba inicialización, reservas, conteos y búsqueda de asientos contiguos. */
import { describe, expect, it } from "vitest";
import {
  COLUMN_COUNT,
  countSeats,
  createEmptySeatMatrix,
  reserveSeat,
  findFirstAdjacentAvailableSeats,
  ROW_COUNT,
  Seat,
  SeatMatrix,
  SeatPosition
} from "./seatManager";

/** Construye una matriz donde solo las posiciones indicadas están disponibles. */
function createMatrixWithAvailableSeats(
  availablePositions: ReadonlyArray<SeatPosition>
): SeatMatrix {
  return Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
    Array.from({ length: COLUMN_COUNT }, (_, columnIndex): Seat =>
      availablePositions.some(
        ([rowNumber, columnNumber]) =>
          rowNumber === rowIndex + 1 && columnNumber === columnIndex + 1
      )
        ? 0
        : 1
    )
  );
}

describe("createEmptySeatMatrix", () => {
  it("creates 8 rows of 10 available seats", () => {
    const matrix = createEmptySeatMatrix();

    expect(matrix).toHaveLength(ROW_COUNT);
    for (const row of matrix) {
      expect(row).toHaveLength(COLUMN_COUNT);
      expect(row.every((seat) => seat === 0)).toBe(true);
    }
  });
});

describe("reserveSeat", () => {
  it("reserves a free seat without mutating the input matrix", () => {
    const matrix = createEmptySeatMatrix();
    const [updatedMatrix, status] = reserveSeat(matrix, 2, 3);

    expect(status).toBe("reserved");
    expect(updatedMatrix[1][2]).toBe(1);
    expect(matrix[1][2]).toBe(0);
    expect(updatedMatrix).not.toBe(matrix);
  });

  it("reports an occupied seat and returns the unchanged matrix", () => {
    const matrix = createEmptySeatMatrix();
    const [occupiedMatrix] = reserveSeat(matrix, 1, 1);
    const [resultMatrix, status] = reserveSeat(occupiedMatrix, 1, 1);

    expect(status).toBe("occupied");
    expect(resultMatrix).toBe(occupiedMatrix);
  });

  it.each([
    [0, 1],
    [9, 1],
    [1, 0],
    [1, 11],
    [1.5, 1]
  ])("rejects invalid coordinates (%s, %s)", (rowNumber, columnNumber) => {
    const matrix = createEmptySeatMatrix();
    const [resultMatrix, status] = reserveSeat(matrix, rowNumber, columnNumber);

    expect(status).toBe("invalid");
    expect(resultMatrix).toBe(matrix);
  });
});

describe("countSeats", () => {
  it("counts an empty room", () => {
    const [occupiedCount, availableCount] = countSeats(createEmptySeatMatrix());

    expect(occupiedCount).toBe(0);
    expect(availableCount).toBe(80);
    expect(occupiedCount + availableCount).toBe(80);
  });

  it("counts a room with both occupied and available seats", () => {
    const matrix = createEmptySeatMatrix();
    const [partiallyOccupiedMatrix] = reserveSeat(matrix, 1, 1);
    const [mixedMatrix] = reserveSeat(partiallyOccupiedMatrix, 8, 10);
    const [occupiedCount, availableCount] = countSeats(mixedMatrix);

    expect(occupiedCount).toBe(2);
    expect(availableCount).toBe(78);
    expect(occupiedCount + availableCount).toBe(80);
  });

  it("counts a full room", () => {
    const fullMatrix: SeatMatrix = Array.from({ length: ROW_COUNT }, () =>
      Array.from({ length: COLUMN_COUNT }, (): Seat => 1)
    );
    const [occupiedCount, availableCount] = countSeats(fullMatrix);

    expect(occupiedCount).toBe(80);
    expect(availableCount).toBe(0);
    expect(occupiedCount + availableCount).toBe(80);
  });
});

describe("findFirstAdjacentAvailableSeats", () => {
  it("returns the first horizontal pair in row-major order", () => {
    const emptyMatrix = createEmptySeatMatrix();
    const [firstReservation] = reserveSeat(emptyMatrix, 1, 1);
    const [matrix] = reserveSeat(firstReservation, 1, 3);

    expect(findFirstAdjacentAvailableSeats(matrix)).toEqual([
      [1, 4],
      [1, 5]
    ]);
  });

  it("returns null when free seats are isolated", () => {
    const matrix = createMatrixWithAvailableSeats([
      [1, 1],
      [1, 3],
      [8, 10]
    ]);

    expect(findFirstAdjacentAvailableSeats(matrix)).toBeNull();
  });

  it("does not treat seats at adjacent row edges as a pair", () => {
    const matrix = createMatrixWithAvailableSeats([
      [1, COLUMN_COUNT],
      [2, 1]
    ]);

    expect(findFirstAdjacentAvailableSeats(matrix)).toBeNull();
  });
});