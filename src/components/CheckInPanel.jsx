import { useState } from "react";
import { STRATEGIES } from "../patterns/strategy";
import { SystemLogger } from "../patterns/singleton";

export default function CheckInPanel({ notifications, logs, onCheckIn }) {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [passengerName,    setPassengerName]     = useState("");
  const [lastAction,       setLastAction]        = useState(null);

  const handleCheckIn = () => {
    if (!selectedStrategy || !passengerName.trim()) return;

    const { strategy, label } = STRATEGIES[selectedStrategy];
    const result = strategy.execute(passengerName.trim());

    SystemLogger.getInstance().log(`CHECK-IN (${label}): ${passengerName.trim()}`);
    setLastAction(result);
    onCheckIn(); // avisa a App.jsx que refresque los logs
    setPassengerName("");
  };

  return (
    <div style={{
      width: "320px", minWidth: "280px", background: "#161b22",
      borderRight: "1px solid #30363d", display: "flex", flexDirection: "column",
      padding: "24px 20px", gap: "16px", overflowY: "auto",
    }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "4px" }}>
          PATRÓN STRATEGY
        </div>
        <h2 style={{ margin: 0, fontSize: "20px", color: "#58a6ff" }}>Check-In</h2>
        <p style={{ fontSize: "12px", color: "#8b949e", margin: "6px 0 0" }}>
          Seleccione el método y su nombre para realizar el check-in.
        </p>
      </div>

      {/* Botones de estrategia */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {Object.entries(STRATEGIES).map(([key, { label, icon }]) => (
          <button key={key} onClick={() => setSelectedStrategy(key)} style={{
            display: "flex", alignItems: "center", gap: "12px",
            background: selectedStrategy === key ? "#1f6feb" : "#21262d",
            border: `1px solid ${selectedStrategy === key ? "#388bfd" : "#30363d"}`,
            color: "#e6edf3", borderRadius: "10px", padding: "14px 16px",
            cursor: "pointer", fontSize: "14px", fontWeight: "600", transition: "all 0.2s",
          }}>
            <span style={{ fontSize: "22px" }}>{icon}</span>
            <span>{label}</span>
            {selectedStrategy === key && (
              <span style={{ marginLeft: "auto", color: "#79c0ff" }}>✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Input + botón confirmar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          value={passengerName}
          onChange={e => setPassengerName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleCheckIn()}
          placeholder="Nombre del pasajero..."
          style={{
            background: "#0d1117", border: "1px solid #30363d", borderRadius: "8px",
            color: "#e6edf3", padding: "12px 14px", fontSize: "14px", outline: "none",
          }}
        />
        <button
          onClick={handleCheckIn}
          disabled={!selectedStrategy || !passengerName.trim()}
          style={{
            background: selectedStrategy && passengerName.trim() ? "#238636" : "#21262d",
            border: "1px solid #30363d", borderRadius: "8px", color: "#e6edf3",
            padding: "12px", fontSize: "14px", fontWeight: "700",
            cursor: selectedStrategy && passengerName.trim() ? "pointer" : "not-allowed",
            transition: "background 0.2s",
          }}
        >
          Confirmar Check-In
        </button>
      </div>

      {/* Resultado del check-in */}
      {lastAction && (
        <div style={{
          background: "#0f2a1a", border: "1px solid #238636", borderRadius: "8px",
          padding: "12px", fontSize: "13px", color: "#56d364", lineHeight: "1.5",
        }}>
          {lastAction}
        </div>
      )}

      {/* Alertas Observer */}
      {notifications.length > 0 && (
        <div>
          <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "8px" }}>
            PATRÓN OBSERVER — ALERTAS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "200px", overflowY: "auto" }}>
            {notifications.map(n => (
              <div key={n.id} style={{
                background: n.type === "delayed" ? "#2d1515" : "#0f2a1a",
                border: `1px solid ${n.type === "delayed" ? "#f85149" : "#238636"}`,
                borderRadius: "6px", padding: "8px 10px", fontSize: "12px",
                color: n.type === "delayed" ? "#ff7b72" : "#56d364",
              }}>
                {n.msg}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Singleton */}
      {console.log("CheckIN panel: ", logs.length)}
      {logs.length > 0 && (
        <div style={{ marginTop: "auto" }}>
          <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "8px" }}>
            SINGLETON — LOG DEL SISTEMA
          </div>
          <div style={{
            background: "#0d1117", border: "1px solid #30363d", borderRadius: "8px",
            padding: "10px", maxHeight: "140px", overflowY: "auto",
          }}>
            {[...logs].reverse().map((l, i) => (
              <div key={i} style={{ fontSize: "11px", color: "#8b949e", marginBottom: "4px" }}>
                <span style={{ color: "#58a6ff" }}>[{l.time}]</span> {l.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
