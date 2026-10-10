import {
  COLUMN_COUNT,
  ROW_COUNT,
  type AdjacentSeatPair,
  type SeatMatrix
} from "./seatManager";

/** Renderiza el mapa etiquetado de asientos en los contenedores dados. */
export function renderSeatMap(
  matrix: SeatMatrix,
  seatMap: HTMLElement,
  columnLabels: HTMLElement,
  highlightedPair: AdjacentSeatPair | null = null
): void {
  const seatFragment = document.createDocumentFragment();
  const labelFragment = document.createDocumentFragment();
  const corner = document.createElement("span");
  corner.className = "column-labels__corner";
  corner.setAttribute("aria-hidden", "true");
  labelFragment.append(corner);

  for (let columnNumber = 1; columnNumber <= COLUMN_COUNT; columnNumber += 1) {
    const label = document.createElement("span");
    label.textContent = String(columnNumber);
    labelFragment.append(label);
  }

  for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex += 1) {
    const rowNumber = rowIndex + 1;
    const rowLabel = document.createElement("span");
    rowLabel.className = "row-label";
    rowLabel.textContent = String(rowNumber);
    rowLabel.setAttribute("aria-hidden", "true");
    seatFragment.append(rowLabel);

    for (let columnIndex = 0; columnIndex < COLUMN_COUNT; columnIndex += 1) {
      const columnNumber = columnIndex + 1;
      const occupied = matrix[rowIndex][columnIndex] === 1;
      const adjacent = highlightedPair?.some(
        ([pairRow, pairColumn]) =>
          pairRow === rowNumber && pairColumn === columnNumber
      ) ?? false;
      const seat = document.createElement("button");
      seat.className = adjacent
        ? "seat seat--adjacent"
        : occupied
          ? "seat seat--occupied"
          : "seat seat--free";
      seat.type = "button";
      seat.textContent = occupied ? "X" : "L";
      seat.setAttribute(
        "aria-label",
        `Fila ${rowNumber}, asiento ${columnNumber}, ${adjacent ? "contiguo disponible" : occupied ? "ocupado" : "libre"}`
      );
      seat.dataset.row = String(rowNumber);
      seat.dataset.column = String(columnNumber);
      seatFragment.append(seat);
    }
  }

  columnLabels.replaceChildren(labelFragment);
  seatMap.replaceChildren(seatFragment);
}