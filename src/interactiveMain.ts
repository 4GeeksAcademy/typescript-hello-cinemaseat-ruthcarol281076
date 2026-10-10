import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { runInteractiveReservations } from "./interactiveReservations";

const terminal = createInterface({ input: stdin, output: stdout });

try {
  await runInteractiveReservations(
    (prompt) => terminal.question(prompt),
    (message) => console.log(message)
  );
} finally {
  terminal.close();
}