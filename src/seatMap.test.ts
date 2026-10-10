/** Verifica las etiquetas, coordenadas y marcadores del mapa de asientos. */
import { describe, expect, it } from "vitest";
import { createEmptySeatMatrix, reserveSeat, ROW_COUNT } from "./seatManager";
import { formatSeatMap } from "./seatMap";

describe("formatSeatMap", () => {
  it("labels an empty room and displays all seats as available", () => {
    const map = formatSeatMap(createEmptySeatMatrix());
    const lines = map.split("\n");

    expect(lines).toHaveLength(ROW_COUNT + 1);
    expect(lines[0]).toBe("    1  2  3  4  5  6  7  8  9 10");
    expect(lines[1]).toBe(` 1${"  L".repeat(10)}`);
    expect(lines.slice(1).map((line) => line.slice(0, 2))).toEqual([
      " 1",
      " 2",
      " 3",
      " 4",
      " 5",
      " 6",
      " 7",
      " 8"
    ]);
    expect(map.match(/\bL\b/g) ?? []).toHaveLength(80);
  });

  it("marks occupied seats in a mixed room", () => {
    const emptyMatrix = createEmptySeatMatrix();
    const [firstReservation] = reserveSeat(emptyMatrix, 1, 1);
    const [mixedMatrix] = reserveSeat(firstReservation, 8, 10);
    const lines = formatSeatMap(mixedMatrix).split("\n");

    expect(lines[1]).toBe(` 1  X${"  L".repeat(9)}`);
    expect(lines[8]).toBe(` 8${"  L".repeat(9)}  X`);
    expect(lines.join("\n").match(/\bX\b/g) ?? []).toHaveLength(2);
  });
});