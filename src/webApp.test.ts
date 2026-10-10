// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { mountSeatManager } from "./webApp";
import { SESSION_STORAGE_KEY } from "./webReservations";

/** Crea el HTML mínimo de la sala y monta su controlador para una prueba. */
function mountRoom(): void {
  document.body.innerHTML = `
    <div id="column-labels"></div>
    <div id="seat-map"></div>
    <p id="room-status"></p>
    <span id="occupied-count"></span>
    <span id="available-count"></span>
    <div id="message-window"></div>
    <button id="find-adjacent" type="button">Buscar</button>
  `;
  mountSeatManager(document, sessionStorage);
}

describe("mountSeatManager", () => {
  beforeEach(() => {
    sessionStorage.clear();
    mountRoom();
  });

  it("reserves an available seat immediately and updates the room", () => {
    document.querySelector<HTMLButtonElement>("[data-row='4'][data-column='5']")!.click();

    expect(
      document.querySelector("[data-row='4'][data-column='5']")?.getAttribute("aria-label")
    ).toBe("Fila 4, asiento 5, ocupado");
    expect(document.querySelector("#occupied-count")?.textContent).toBe("1");
    expect(document.querySelector("#available-count")?.textContent).toBe("79");
    expect(document.querySelector("#room-status")?.textContent).toBe(
      "Parcialmente ocupada"
    );
    expect(document.querySelector("#message-window")?.textContent).toBe(
      "Reserva confirmada: fila 4, asiento 5."
    );
  });

  it("reports an occupied seat without changing the room", () => {
    document.querySelector<HTMLButtonElement>("[data-row='1'][data-column='1']")!.click();
    document.querySelector<HTMLButtonElement>("[data-row='1'][data-column='1']")!.click();

    expect(document.querySelector("#occupied-count")?.textContent).toBe("1");
    expect(document.querySelector("#available-count")?.textContent).toBe("79");
    expect(document.querySelector("#message-window")?.textContent).toBe(
      "Reserva rechazada: el asiento ya está ocupado."
    );
  });

  it("highlights the first adjacent pair and clears it on the next seat click", () => {
    document.querySelector<HTMLButtonElement>("#find-adjacent")!.click();

    expect(document.querySelector("[data-row='1'][data-column='1']")?.classList.contains("seat--adjacent")).toBe(true);
    expect(document.querySelector("[data-row='1'][data-column='2']")?.classList.contains("seat--adjacent")).toBe(true);
    expect(document.querySelector("#message-window")?.textContent).toBe(
      "Par contiguo disponible: fila 1, asientos 1 y 2."
    );

    document.querySelector<HTMLButtonElement>("[data-row='1'][data-column='1']")!.click();

    expect(document.querySelectorAll(".seat--adjacent")).toHaveLength(0);
    expect(document.querySelector("[data-row='1'][data-column='1']")?.classList.contains("seat--occupied")).toBe(true);
    expect(document.querySelector("[data-row='1'][data-column='2']")?.classList.contains("seat--free")).toBe(true);
  });

  it("reports when only isolated available seats remain", () => {
    for (let row = 1; row <= 8; row += 1) {
      for (let column = 1; column <= 10; column += 1) {
        if ((row === 1 && column === 1) || (row === 1 && column === 3)) {
          continue;
        }
        document
          .querySelector<HTMLButtonElement>(`[data-row='${row}'][data-column='${column}']`)!
          .click();
      }
    }

    document.querySelector<HTMLButtonElement>("#find-adjacent")!.click();

    expect(document.querySelector("#message-window")?.textContent).toBe(
      "No hay dos asientos contiguos disponibles."
    );
    expect(document.querySelectorAll(".seat--adjacent")).toHaveLength(0);
    expect(document.querySelector("#room-status")?.textContent).toBe("Casi llena");
  });

  it("restores successful reservations after remounting in the same session", () => {
    document.querySelector<HTMLButtonElement>("[data-row='3'][data-column='7']")!.click();
    expect(sessionStorage.getItem(SESSION_STORAGE_KEY)).not.toBeNull();

    mountRoom();

    expect(document.querySelector("#occupied-count")?.textContent).toBe("1");
    expect(document.querySelector("#available-count")?.textContent).toBe("79");
    expect(document.querySelector("[data-row='3'][data-column='7']")?.getAttribute("aria-label")).toBe(
      "Fila 3, asiento 7, ocupado"
    );
  });

  it("starts with an empty room when stored session data is malformed", () => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, "not-json");
    mountRoom();

    expect(document.querySelector("#occupied-count")?.textContent).toBe("0");
    expect(document.querySelector("#available-count")?.textContent).toBe("80");
    expect(document.querySelector("#room-status")?.textContent).toBe("Sala vacía");
  });
});