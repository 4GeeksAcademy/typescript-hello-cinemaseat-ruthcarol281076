# Tasks

## 1. Test Setup and Seat Matrix

- [x] 1.1 Add Vitest, a Vite test configuration, an `npm test` script, and a runner smoke test; verify `npm test -- --run` executes it.
- [x] 1.2 Define readonly seat and matrix types and implement 8-by-10 empty-matrix initialization; add a unit test verifying all 80 seats are `0`.

## 2. Reservation and Availability

- [x] 2.1 Implement immutable seat reservation with coordinate and occupancy validation; add tests for successful, occupied, and out-of-range reservations and verify the input matrix is unchanged.
- [x] 2.2 Implement occupied/free seat counting; add tests for empty, mixed, and full matrices and verify both counts sum to 80.

## 3. Map and Adjacent Seat Search

- [x] 3.1 Implement pure map formatting with 1-based row and column labels and `L`/`X` markers; add tests for empty and mixed maps.
- [x] 3.2 Implement first-pair horizontal search with 1-based coordinates; add tests for first-match ordering, isolated free seats, and no pair without crossing row boundaries.

## 4. Console Demonstration

- [x] 4.1 Replace the starter output with a console demonstration of empty, partially occupied, nearly full with isolated free seats, and full-room scenarios; verify `npm run console` displays clear operation results and the map for each scenario.

## 5. Integration Verification

- [x] 5.1 Run the complete unit suite, `npm run typecheck`, and `npm run build`; verify all pass with TypeScript strict mode and no `any` usage.