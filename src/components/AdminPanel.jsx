import { useState } from "react";
import { SystemLogger } from "../patterns/singleton";

const statusColor = (status) => status === "delayed" ? "#ff4d4d" : "#00c27c";
const statusLabel = (status) => status === "delayed" ? "DEMORADO" : "EN HORARIO";

export default function AdminPanel({ flights, onToggleDelay, logs }) {
  const [_logs]              = useState([]);
  
  const delayedCount  = flights.filter(f => f.status === "delayed").length;
  const onTimeCount   = flights.filter(f => f.status === "on_time").length;

  return (
    <div style={{
      width: "340px", minWidth: "280px", background: "#161b22",
      display: "flex", flexDirection: "column", padding: "24px 20px", overflowY: "auto",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", color: "#f0883e", letterSpacing: "1px", marginBottom: "4px" }}>
          🔒 PANEL ADMINISTRADOR
        </div>
        <h2 style={{ margin: 0, fontSize: "20px", color: "#e6edf3" }}>Control de Vuelos</h2>
        <p style={{ fontSize: "12px", color: "#8b949e", margin: "6px 0 0" }}>
          Al marcar un vuelo como demorado, se notificará a todos los pasajeros (Observer).
        </p>
      </div>

      {/* Lista de vuelos con controles */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {flights.map(flight => (
          <div key={flight.id} style={{
            background: "#0d1117",
            border: `1px solid ${flight.status === "delayed" ? "#da3633" : "#30363d"}`,
            borderRadius: "10px", padding: "14px 16px",
          }}>
            {/* Encabezado del vuelo */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <div style={{ fontWeight: "800", fontSize: "16px", color: "#58a6ff" }}>{flight.id}</div>
                <div style={{ fontSize: "12px", color: "#8b949e", marginTop: "2px" }}>
                  {flight.origin} → {flight.dest}
                </div>
              </div>
              <span style={{
                background: flight.status === "delayed" ? "#3d1c1c" : "#0f2a1a",
                color: statusColor(flight.status),
                border: `1px solid ${statusColor(flight.status)}`,
                borderRadius: "20px", padding: "3px 10px", fontSize: "10px", fontWeight: "700",
              }}>
                {statusLabel(flight.status)}
              </span>
            </div>

            {/* Detalles */}
            <div style={{ display: "flex", gap: "14px", fontSize: "12px", color: "#8b949e", marginBottom: "12px" }}>
              <span>🕐 {flight.time}</span>
              <span>🚪 {flight.gate}</span>
            </div>

            {/* Botón de acción */}
            <button
              onClick={() => onToggleDelay(flight.id)}
              style={{
                width: "100%",
                background: flight.status === "delayed" ? "#238636" : "#b91c1c",
                border: "none", borderRadius: "7px", color: "#fff",
                padding: "9px", fontSize: "12px", fontWeight: "700",
                cursor: "pointer", transition: "background 0.2s",
              }}
            >
              {flight.status === "delayed" ? "✅ Restaurar a horario" : "🚨 Marcar como demorado"}
            </button>
          </div>
        ))}
      </div>

      {/* Resumen estadístico */}
      <div style={{
        marginTop: "20px", background: "#0d1117", border: "1px solid #30363d",
        borderRadius: "10px", padding: "14px",
      }}>
        <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "10px" }}>
          RESUMEN
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#00c27c" }}>{onTimeCount}</div>
            <div style={{ fontSize: "11px", color: "#8b949e" }}>En horario</div>
          </div>
          <div style={{ width: "1px", background: "#30363d" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#ff4d4d" }}>{delayedCount}</div>
            <div style={{ fontSize: "11px", color: "#8b949e" }}>Demorados</div>
          </div>
          <div style={{ width: "1px", background: "#30363d" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#58a6ff" }}>{logs.length}</div>
            <div style={{ fontSize: "11px", color: "#8b949e" }}>Logs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
