// Barrel export — importa todo desde un solo lugar:
// import { OnlineCheckIn, AppCheckIn, ... } from "./patterns/strategy"

export { CheckInStrategy } from "./CheckInStrategy";
export { OnlineCheckIn }   from "./OnlineCheckIn";
export { AppCheckIn }      from "./AppCheckIn";
export { KioskCheckIn }    from "./KioskCheckIn";
export { CounterCheckIn }  from "./CounterCheckIn";

// Mapa de estrategias disponibles para el componente UI
import { OnlineCheckIn }  from "./OnlineCheckIn";
import { AppCheckIn }     from "./AppCheckIn";
import { KioskCheckIn }   from "./KioskCheckIn";
import { CounterCheckIn } from "./CounterCheckIn";

export const STRATEGIES = {
  online:  { label: "Online",    icon: "✈️",  strategy: new OnlineCheckIn()  },
  app:     { label: "App Móvil", icon: "📱",  strategy: new AppCheckIn()     },
  kiosk:   { label: "Kiosco",    icon: "🖥️",  strategy: new KioskCheckIn()   },
  counter: { label: "Mostrador", icon: "🧑‍✈️", strategy: new CounterCheckIn() },
};
