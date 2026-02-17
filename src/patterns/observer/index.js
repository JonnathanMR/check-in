export { FlightSubject } from "./FlightSubject";

// Instancia global compartida entre todos los componentes
// (simula un servicio real de la aplicación)
import { FlightSubject } from "./FlightSubject";
export const flightSystem = new FlightSubject();
