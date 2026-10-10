import { describe, expect, it } from "vitest";
import {
  COLUMN_COUNT,
  createEmptySeatMatrix,
  reserveSeat,
  ROW_COUNT,
  type Seat,
  type SeatMatrix,
  type SeatPosition
} from "./seatManager";
import { getRoomStatus } from "./webReservations";

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

describe("getRoomStatus", () => {
  it("distinguishes an empty room", () => {
    expect(getRoomStatus(createEmptySeatMatrix())).toBe("Sala vacía");
  });

  it("distinguishes a partially occupied room with adjacent availability", () => {
    const [matrix] = reserveSeat(createEmptySeatMatrix(), 1, 1);

    expect(getRoomStatus(matrix)).toBe("Parcialmente ocupada");
  });

  it("distinguishes a nearly full room with only isolated available seats", () => {
    const matrix = createMatrixWithAvailableSeats([
      [1, 1],
      [1, 3],
      [8, 10]
    ]);

    expect(getRoomStatus(matrix)).toBe("Casi llena");
  });

  it("distinguishes a full room", () => {
    const matrix: SeatMatrix = Array.from({ length: ROW_COUNT }, () =>
      Array.from({ length: COLUMN_COUNT }, (): Seat => 1)
    );

    expect(getRoomStatus(matrix)).toBe("Completa");
  });
});