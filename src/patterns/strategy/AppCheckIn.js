import { CheckInStrategy } from "./CheckInStrategy";

export class AppCheckIn extends CheckInStrategy {
  execute(passenger) {
    return `📱 Check-in por App completado para ${passenger}. Tarjeta en wallet del móvil.`;
  }
}
