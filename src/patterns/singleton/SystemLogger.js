// ============================================================
// PATRÓN SINGLETON — Logger único del sistema
// Sin importar cuántas veces se llame getInstance(),
// siempre se devuelve la misma instancia con los mismos logs.
// ============================================================

class SystemLogger {
  constructor() {
    // Si ya existe una instancia, la devuelve en lugar de crear una nueva
    if (SystemLogger._instance) {
      return SystemLogger._instance;
    }
    this._logs = [];
    SystemLogger._instance = this;
  }

  // Punto de acceso global a la instancia única
  static getInstance() {
    if (!SystemLogger._instance) {
      new SystemLogger();
    }
    return SystemLogger._instance;
  }

  log(message) {
    const entry = {
      id:      Date.now(),
      time:    new Date().toLocaleTimeString(),
      message,
    };
    this._logs.push(entry);
    return entry;
  }

  getLogs() {
    return [...this._logs]; // Devuelve copia para no exponer el array interno
  }

  clear() {
    this._logs = [];
  }
}

export default SystemLogger;
