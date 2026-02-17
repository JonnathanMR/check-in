import { CheckInStrategy } from "./CheckInStrategy";

export class OnlineCheckIn extends CheckInStrategy {
  execute(passenger) {
    return `✈️ Check-in Online completado para ${passenger}. Tarjeta de embarque enviada al email.`;
  }
}
