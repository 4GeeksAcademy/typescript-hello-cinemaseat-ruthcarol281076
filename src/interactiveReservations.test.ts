import { describe, expect, it } from "vitest";
import { createEmptySeatMatrix, reserveSeat } from "./seatManager";
import { runInteractiveReservations } from "./interactiveReservations";
import { formatSeatMap } from "./seatMap";

describe("runInteractiveReservations", () => {
  it("shows the map before and after successful and rejected reservations", async () => {
    const answers = ["4", "5", "4", "5", "salir"];
    const prompts: string[] = [];
    const output: string[] = [];
    const emptyMap = formatSeatMap(createEmptySeatMatrix());
    const [reservedRoom] = reserveSeat(createEmptySeatMatrix(), 4, 5);
    const reservedMap = formatSeatMap(reservedRoom);

    await runInteractiveReservations(
      async (prompt) => {
        prompts.push(prompt);
        return answers.shift() ?? "salir";
      },
      (message) => output.push(message)
    );

    expect(output).toEqual([
      "\n=== Mapa antes de la reserva ===",
      emptyMap,
      "Reserva confirmada: fila 4, asiento 5.",
      "\n=== Mapa después de la reserva ===",
      reservedMap,
      "\n=== Mapa antes de la reserva ===",
      reservedMap,
      "Reserva rechazada: el asiento ya esta ocupado.",
      "\n=== Mapa después de la reserva ===",
      reservedMap,
      "\n=== Mapa antes de la reserva ===",
      reservedMap
    ]);
    expect(prompts).toHaveLength(5);
  });

  it("shows the unchanged map after invalid coordinates", async () => {
    const answers = ["fila", "2", "salir"];
    const output: string[] = [];
    const emptyMap = formatSeatMap(createEmptySeatMatrix());

    await runInteractiveReservations(
      async () => answers.shift() ?? "salir",
      (message) => output.push(message)
    );

    expect(output).toEqual([
      "\n=== Mapa antes de la reserva ===",
      emptyMap,
      "La fila debe estar entre 1 y 8 y el asiento entre 1 y 10. Intentalo de nuevo.",
      "\n=== Mapa después de la reserva ===",
      emptyMap,
      "\n=== Mapa antes de la reserva ===",
      emptyMap
    ]);
  });
});