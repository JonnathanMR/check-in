const statusColor = (status) => status === "delayed" ? "#ff4d4d" : "#00c27c";
const statusLabel = (status) => status === "delayed" ? "DEMORADO" : "EN HORARIO";

export default function FlightBoard({ flights }) {
  return (
    <div style={{
      flex: 1, background: "#0d1117", borderRight: "1px solid #30363d",
      display: "flex", flexDirection: "column", padding: "24px 20px", overflowY: "auto",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "4px" }}>
          PATRÓN OBSERVER — SUSCRIPTOR
        </div>
        <h2 style={{ margin: 0, fontSize: "20px", color: "#e6edf3" }}>Tablero de Vuelos</h2>
        <p style={{ fontSize: "12px", color: "#8b949e", margin: "6px 0 0" }}>
          Vista del pasajero. Se actualiza automáticamente ante cualquier cambio.
        </p>
      </div>

      {/* Lista de vuelos */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {flights.map(flight => (
          <div key={flight.id} style={{
            background: "#161b22",
            border: `1px solid ${flight.status === "delayed" ? "#da3633" : "#30363d"}`,
            borderLeft: `4px solid ${statusColor(flight.status)}`,
            borderRadius: "10px", padding: "16px 18px", transition: "border-color 0.4s",
          }}>
            {/* ID + estado */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontWeight: "800", fontSize: "18px", color: "#58a6ff", letterSpacing: "1px" }}>
                {flight.id}
              </span>
              <span style={{
                background: flight.status === "delayed" ? "#3d1c1c" : "#0f2a1a",
                color: statusColor(flight.status),
                border: `1px solid ${statusColor(flight.status)}`,
                borderRadius: "20px", padding: "3px 12px", fontSize: "11px", fontWeight: "700",
              }}>
                {statusLabel(flight.status)}
              </span>
            </div>

            {/* Ruta */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#e6edf3", marginBottom: "6px" }}>
              <span>{flight.origin}</span>
              <span style={{ color: "#8b949e" }}>→</span>
              <span>{flight.dest}</span>
            </div>

            {/* Detalles */}
            <div style={{ display: "flex", gap: "20px", fontSize: "12px", color: "#8b949e" }}>
              <span>🕐 {flight.time}</span>
              <span>🚪 Puerta {flight.gate}</span>
            </div>

            {/* Alerta de demora */}
            {flight.status === "delayed" && (
              <div style={{
                marginTop: "10px", padding: "8px 12px", background: "#2d1515",
                borderRadius: "6px", fontSize: "12px", color: "#ff7b72",
              }}>
                ⚠️ Su vuelo presenta demora. Permanezca atento a las actualizaciones.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
