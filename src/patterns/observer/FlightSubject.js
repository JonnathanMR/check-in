// ============================================================
// PATRÓN OBSERVER — Sujeto (Subject)
// Mantiene la lista de vuelos y notifica a los observers
// cuando el estado de algún vuelo cambia.
// ============================================================

import { SystemLogger } from "../singleton";

const INITIAL_FLIGHTS = [
  { id: "AR1024", origin: "Buenos Aires", dest: "Madrid",          time: "10:30", status: "on_time", gate: "A3" },
  { id: "LA540",  origin: "Santiago",     dest: "Lima",            time: "11:15", status: "on_time", gate: "B7" },
  { id: "AV830",  origin: "Bogotá",       dest: "Miami",           time: "12:00", status: "on_time", gate: "C1" },
  { id: "IB721",  origin: "Madrid",       dest: "Ciudad de México",time: "13:45", status: "on_time", gate: "D5" },
  { id: "CM210",  origin: "Panamá",       dest: "Caracas",         time: "14:20", status: "on_time", gate: "A9" },
];

export class FlightSubject {
  constructor() {
    this._observers = [];
    this._flights   = [...INITIAL_FLIGHTS];
  }

  // --- Gestión de observers ---
  subscribe(observerFn) {
    this._observers.push(observerFn);
  }

  unsubscribe(observerFn) {
    this._observers = this._observers.filter(fn => fn !== observerFn);
  }

  // Notifica a TODOS los observers suscritos
  notify(updatedFlight) {
    this._observers.forEach(fn => fn(updatedFlight));
  }

  // --- Lógica de vuelos ---
  toggleDelay(flightId) {
    this._flights = this._flights.map(flight => {
      if (flight.id !== flightId) return flight;

      const newStatus = flight.status === "on_time" ? "delayed" : "on_time";
      const updated   = { ...flight, status: newStatus };

      // Notifica el cambio a todos los observers
      this.notify(updated);

      // Registra en el Singleton Logger
      const logMsg = newStatus === "delayed"
        ? `🚨 Vuelo ${flightId} marcado como DEMORADO`
        : `✅ Vuelo ${flightId} restaurado a EN HORARIO`;
      SystemLogger.getInstance().log(logMsg);

      return updated;
    });

    return this.getFlights();
  }

  getFlights() {
    return [...this._flights];
  }
}
