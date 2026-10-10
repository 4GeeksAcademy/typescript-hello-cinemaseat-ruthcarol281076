import {
  countSeats,
  createEmptySeatMatrix,
  findFirstAdjacentAvailableSeats,
  reserveSeat,
  type AdjacentSeatPair,
  type SeatMatrix
} from "./seatManager";
import {
  getRoomStatus,
  loadSessionRoom,
  saveSessionRoom
} from "./webReservations";
import { renderSeatMap } from "./webSeatMap";

function getElement<T extends HTMLElement>(root: Document, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`No se encontró el elemento requerido: ${selector}`);
  }
  return element;
}

/** Conecta el mapa visual con las operaciones puras del dominio de asientos. */
export function mountSeatManager(
  root: Document,
  storage: Storage | null = null
): void {
  const seatMap = getElement<HTMLElement>(root, "#seat-map");
  const columnLabels = getElement<HTMLElement>(root, "#column-labels");
  const roomStatus = getElement<HTMLElement>(root, "#room-status");
  const occupiedCount = getElement<HTMLElement>(root, "#occupied-count");
  const availableCount = getElement<HTMLElement>(root, "#available-count");
  const messageWindow = getElement<HTMLElement>(root, "#message-window");
  const findAdjacentButton = getElement<HTMLButtonElement>(
    root,
    "#find-adjacent"
  );

  let room: SeatMatrix = loadSessionRoom(storage);
  let highlightedPair: AdjacentSeatPair | null = null;

  const writeMessage = (text: string): void => {
    const entry = root.createElement("p");
    entry.className = "message-entry";
    entry.textContent = text;
    messageWindow.replaceChildren(entry);
  };

  const render = (): void => {
    renderSeatMap(room, seatMap, columnLabels, highlightedPair);
    const [occupied, available] = countSeats(room);
    occupiedCount.textContent = String(occupied);
    availableCount.textContent = String(available);
    roomStatus.textContent = getRoomStatus(room);
  };

  seatMap.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof root.defaultView!.HTMLButtonElement)) {
      return;
    }

    const rowNumber = Number(target.dataset.row);
    const columnNumber = Number(target.dataset.column);
    highlightedPair = null;

    const [updatedRoom, status] = reserveSeat(room, rowNumber, columnNumber);
    if (status === "reserved") {
      room = updatedRoom;
      saveSessionRoom(storage, room);
      writeMessage(
        `Reserva confirmada: fila ${rowNumber}, asiento ${columnNumber}.`
      );
    } else if (status === "occupied") {
      writeMessage("Reserva rechazada: el asiento ya está ocupado.");
    } else {
      writeMessage("Las coordenadas del asiento no son válidas.");
    }
    render();
  });

  findAdjacentButton.addEventListener("click", () => {
    highlightedPair = null;
    const pair = findFirstAdjacentAvailableSeats(room);
    if (pair) {
      highlightedPair = pair;
      writeMessage(
        `Par contiguo disponible: fila ${pair[0][0]}, asientos ${pair[0][1]} y ${pair[1][1]}.`
      );
    } else {
      writeMessage("No hay dos asientos contiguos disponibles.");
    }
    render();
  });

  render();
}