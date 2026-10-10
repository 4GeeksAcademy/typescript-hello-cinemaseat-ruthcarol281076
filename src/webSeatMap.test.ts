// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import {
  createEmptySeatMatrix,
  findFirstAdjacentAvailableSeats,
  reserveSeat
} from "./seatManager";
import { renderSeatMap } from "./webSeatMap";

describe("renderSeatMap", () => {
  let seatMap: HTMLElement;
  let columnLabels: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = '<div id="columns"></div><div id="seats"></div>';
    seatMap = document.querySelector<HTMLElement>("#seats")!;
    columnLabels = document.querySelector<HTMLElement>("#columns")!;
  });

  it("renders 8 rows of 10 available seats with accessible coordinates", () => {
    renderSeatMap(createEmptySeatMatrix(), seatMap, columnLabels);

    const seats = seatMap.querySelectorAll<HTMLButtonElement>("button.seat");
    expect(seats).toHaveLength(80);
    expect(seatMap.querySelectorAll(".row-label")).toHaveLength(8);
    expect(columnLabels.querySelectorAll("span")).toHaveLength(11);
    expect(seats[0].getAttribute("aria-label")).toBe(
      "Fila 1, asiento 1, libre"
    );
    expect(seats[79].getAttribute("aria-label")).toBe(
      "Fila 8, asiento 10, libre"
    );
    expect(Array.from(seats).every((seat) => seat.textContent === "L")).toBe(
      true
    );
  });

  it("uses occupied and adjacent styles from the matrix and search result", () => {
    const emptyRoom = createEmptySeatMatrix();
    const [oneOccupied] = reserveSeat(emptyRoom, 1, 1);
    const [mixedRoom] = reserveSeat(oneOccupied, 1, 3);
    const pair = findFirstAdjacentAvailableSeats(mixedRoom);

    renderSeatMap(mixedRoom, seatMap, columnLabels, pair);

    expect(seatMap.querySelector("[data-row='1'][data-column='1']")?.classList.contains("seat--occupied")).toBe(true);
    expect(seatMap.querySelector("[data-row='1'][data-column='1']")?.textContent).toBe("X");
    expect(seatMap.querySelector("[data-row='1'][data-column='2']")?.classList.contains("seat--free")).toBe(true);
    expect(seatMap.querySelector("[data-row='1'][data-column='4']")?.classList.contains("seat--adjacent")).toBe(true);
    expect(seatMap.querySelector("[data-row='1'][data-column='5']")?.classList.contains("seat--adjacent")).toBe(true);
    expect(seatMap.querySelector("[data-row='1'][data-column='6']")?.classList.contains("seat--free")).toBe(true);
  });
});