import { COLUMN_COUNT, SeatMatrix } from "./seatManager";

/** Formatea la matriz como mapa etiquetado con L para libre y X para ocupado. */
export function formatSeatMap(matrix: SeatMatrix): string {
  const columnLabels = Array.from({ length: COLUMN_COUNT }, (_, columnIndex) =>
    String(columnIndex + 1).padStart(2, " ")
  );
  const header = `   ${columnLabels.join(" ")}`;
  const rowLines = matrix.map((row, rowIndex) => {
    const seatLabels = row.map((seat) => (seat === 0 ? "L" : "X").padStart(2, " "));
    return `${String(rowIndex + 1).padStart(2, " ")} ${seatLabels.join(" ")}`;
  });

  return [header, ...rowLines].join("\n");
}