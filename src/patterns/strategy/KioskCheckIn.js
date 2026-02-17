import { CheckInStrategy } from "./CheckInStrategy";

export class KioskCheckIn extends CheckInStrategy {
  execute(passenger) {
    return `🖥️ Check-in en Kiosco completado para ${passenger}. Imprima su tarjeta en el kiosco.`;
  }
}
