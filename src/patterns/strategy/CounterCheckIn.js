import { CheckInStrategy } from "./CheckInStrategy";

export class CounterCheckIn extends CheckInStrategy {
  execute(passenger) {
    return `🧑‍✈️ Check-in en Mostrador completado para ${passenger}. Diríjase al mostrador B12.`;
  }
}
