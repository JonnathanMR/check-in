// ============================================================
// PATRÓN STRATEGY — Interfaz base
// Cada método de check-in implementa el mismo contrato: execute(passenger)
// ============================================================

export class CheckInStrategy {
  execute(passenger) {
    throw new Error("execute() debe ser implementado por cada estrategia");
  }
}
