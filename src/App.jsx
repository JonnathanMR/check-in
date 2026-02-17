import { useState, useEffect } from "react";
import { flightSystem }  from "./patterns/observer";
import { SystemLogger }  from "./patterns/singleton";
import CheckInPanel      from "./components/CheckInPanel";
import FlightBoard       from "./components/FlightBoard";
import AdminPanel        from "./components/AdminPanel";

export default function App() {
  const [flights,       setFlights]       = useState(flightSystem.getFlights());
  const [notifications, setNotifications] = useState([]);
  const [logs,          setLogs]          = useState([]);

  // Función centralizada para refrescar logs desde cualquier acción
  const refreshLogs = () => setLogs(SystemLogger.getInstance().getLogs());

  // Suscribir el componente principal al sistema de vuelos (Observer)
  useEffect(() => {
    const observer = (updatedFlight) => {
      const msg = updatedFlight.status === "delayed"
        ? `🚨 Vuelo ${updatedFlight.id} (${updatedFlight.origin} → ${updatedFlight.dest}) está DEMORADO`
        : `✅ Vuelo ${updatedFlight.id} regresa a horario normal`;

      setNotifications(prev => [
        { id: Date.now(), msg, type: updatedFlight.status },
        ...prev.slice(0, 6),
      ]);
    };

    flightSystem.subscribe(observer);

    // Limpieza al desmontar el componente
    return () => flightSystem.unsubscribe(observer);
  }, []);

  const handleToggleDelay = (flightId) => {
    const updated = flightSystem.toggleDelay(flightId);
    setFlights(updated);
    refreshLogs();
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "'Segoe UI', sans-serif",
      background: "#0d1117",
      color: "#e6edf3",
    }}>
      {/* Columna 1: Check-In (Strategy + muestra Observer y Singleton) */}
      <CheckInPanel notifications={notifications} logs={logs} onCheckIn={refreshLogs} />

      {/* Columna 2: Tablero del pasajero (Observer - suscriptor) */}
      <FlightBoard flights={flights} />

      {/* Columna 3: Panel del administrador (dispara Observer) */}
      <AdminPanel
        flights={flights}
        onToggleDelay={handleToggleDelay}
        logs={logs}
      />
    </div>
  );
}
