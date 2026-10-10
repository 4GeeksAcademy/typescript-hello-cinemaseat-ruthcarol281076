/** Confirma que Vitest puede ejecutar una prueba mínima. */
import { describe, expect, it } from "vitest";

describe("Vitest setup", () => {
  it("executes a smoke test", () => {
    expect(true).toBe(true);
  });
});