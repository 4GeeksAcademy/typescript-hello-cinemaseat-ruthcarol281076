# Design

## Context

See `proposal.md` for motivation and `specs/seat-management/spec.md` for the behavior contract. The workspace is a Vite/TypeScript starter: `src/main.ts` is the current entry point, TypeScript strict mode is enabled, and the package has no test runner yet. The program is a synchronous console prototype with no API or persistence. The seat data must remain a two-dimensional array, without classes or seat objects.

## Goals / Non-Goals

**Goals:**
- Keep seat operations deterministic, independently testable, and immutable at the matrix boundary.
- Separate domain logic, text formatting, and console demonstration code.
- Keep all seat and operation results representable with arrays, tuples, and primitive unions.

**Non-Goals:**
- Add a web reservation workflow, persistence, external APIs, or a general controller/service/repository framework.
- Add dependency injection where no external dependency exists.
- Add asynchronous behavior or error-catching paths to synchronous operations.

## Decisions

- **Use nested readonly array types.** Define `Seat` as `0 | 1`, with `SeatRow` and `SeatMatrix` as readonly nested arrays. A reservation creates copied rows and a new matrix instead of mutating the input. This preserves the matrix as the only representation of seat state and makes accidental writes harder. A mutable matrix or a class-based model would be simpler to mutate but conflicts with the project constraints and makes state changes harder to reason about.
- **Use tuple and primitive-union return values.** Reservation returns a tuple containing the resulting matrix and a status such as `reserved`, `occupied`, or `invalid`; counts return a pair of numbers; adjacent-seat search returns two coordinate tuples or `null`. This avoids seat objects and keeps results explicitly typed. Coordinates accepted and returned at the public function boundary are 1-based; indexing into arrays converts to 0-based internally.
- **Keep pure domain operations in one focused module.** Place initialization, reservation, counting, and adjacent-seat search in `src/seatManager.ts`, with shared type aliases there. These operations need no classes, repository layer, dependency injection, or type guards because they use no external data source.
- **Separate rendering from side effects.** Put a pure formatter in `src/seatMap.ts` that returns the labeled `L`/`X` map as text. `src/main.ts` remains the composition root: call domain functions, print results with `console.log`, and demonstrate the required scenarios. Array mapping is appropriate for formatting; an indexed scan is clearer for finding the first consecutive pair in row-major order.
- **Use Vitest for synchronous unit tests.** Add Vitest and a test script, then cover each exported operation and formatter, including empty, mixed, nearly full with isolated seats, full, occupied reservation, invalid coordinates, and first-pair ordering. Vitest integrates with the existing Vite setup; a custom assertion harness would add maintenance without improving coverage.

## Risks / Trade-offs

- **Readonly nested arrays require copying when reserving.** This adds a small allocation per reservation, negligible for 80 seats, in exchange for predictable immutable behavior.
- **The numeric dimensions and coordinate conversion can drift.** Centralize row/column constants and cover edge coordinates with unit tests.
- **The repo has no test configuration yet.** Adding Vitest changes package metadata and Vite configuration; keep that setup limited to the test command and Node test environment.
- **Console output is harder to assert if mixed with domain operations.** Keep formatting pure and console calls in `main.ts` so tests can inspect strings without intercepting global output.

## Migration Plan

No production migration or rollback is needed. Replace the starter message in `src/main.ts` with the console demonstration, add the focused domain and formatting modules, and add Vitest configuration and tests. To roll back, remove the added modules and test setup and restore the starter entry point.