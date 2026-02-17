# ✈️ Sistema de Check-In — Aerolínea / Airline Check-In System

> Taller de Aplicación — Patrones de Diseño de Software  
> *Application Workshop — Software Design Patterns*

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=flat)

---

## 📋 Descripción / Description

**ES** — Sistema de gestión de check-in para una aerolínea desarrollado con React y Vite. Implementa tres patrones de diseño clásicos de la Gang of Four (GoF): **Strategy**, **Singleton** y **Observer**, aplicados en un contexto real de aviación con interfaz de tres columnas.

**EN** — Airline check-in management system built with React and Vite. Implements three classic Gang of Four (GoF) design patterns: **Strategy**, **Singleton**, and **Observer**, applied in a real aviation context with a three-column interface.

---

## 🎯 Patrones de diseño implementados / Design Patterns Implemented

### 1. Strategy — Métodos de Check-In

**ES** — Permite seleccionar el algoritmo de check-in en tiempo de ejecución sin modificar el código cliente. Cada método implementa la misma interfaz `execute(passenger)`.

**EN** — Allows selecting the check-in algorithm at runtime without modifying client code. Each method implements the same `execute(passenger)` interface.

| Estrategia | Clase | Descripción |
|---|---|---|
| ✈️ Online | `OnlineCheckIn` | Envía tarjeta al email del pasajero |
| 📱 App Móvil | `AppCheckIn` | Agrega tarjeta al wallet del móvil |
| 🖥️ Kiosco | `KioskCheckIn` | Impresión en kiosco físico |
| 🧑‍✈️ Mostrador | `CounterCheckIn` | Atención presencial en mostrador |

```js
// Ejemplo de uso / Usage example
const strategy = new OnlineCheckIn();
strategy.execute("Juan Pérez");
// → "✈️ Check-in Online completado para Juan Pérez."
```

---

### 2. Singleton — Logger del Sistema

**ES** — Garantiza que el sistema de log tenga una única instancia compartida a lo largo de toda la aplicación, con acceso global mediante `getInstance()`.

**EN** — Ensures the logging system has a single shared instance throughout the entire application, with global access via `getInstance()`.

```js
// Siempre devuelve la misma instancia / Always returns the same instance
const loggerA = SystemLogger.getInstance();
const loggerB = SystemLogger.getInstance();
console.log(loggerA === loggerB); // true
```

---

### 3. Observer — Notificación de Demoras

**ES** — Cuando el administrador marca un vuelo como demorado, el sistema notifica automáticamente a todos los componentes suscritos (tablero de pasajeros y panel de alertas) sin acoplamiento directo entre ellos.

**EN** — When the administrator marks a flight as delayed, the system automatically notifies all subscribed components (passenger board and alert panel) without direct coupling between them.

```js
// Suscripción / Subscription
flightSystem.subscribe((updatedFlight) => {
  console.log(`Vuelo ${updatedFlight.id}: ${updatedFlight.status}`);
});

// Disparo de notificación / Trigger notification
flightSystem.toggleDelay("AR1024"); // Notifica a todos los observers
```

---

## 🗂️ Estructura del proyecto / Project Structure

```
airline-checkin/
│
├── index.html                          ← HTML base (Vite entry point)
├── package.json                        ← Dependencias y scripts
├── vite.config.js                      ← Configuración del bundler
│
└── src/
    ├── main.jsx                        ← Punto de entrada React
    ├── App.jsx                         ← Componente raíz / orquestador
    ├── index.css                       ← Estilos globales
    │
    ├── patterns/                       ← 📐 Patrones de diseño
    │   ├── strategy/
    │   │   ├── CheckInStrategy.js      ← Clase base (interfaz)
    │   │   ├── OnlineCheckIn.js        ← Estrategia 1
    │   │   ├── AppCheckIn.js           ← Estrategia 2
    │   │   ├── KioskCheckIn.js         ← Estrategia 3
    │   │   ├── CounterCheckIn.js       ← Estrategia 4
    │   │   └── index.js                ← Barrel export
    │   ├── singleton/
    │   │   ├── SystemLogger.js         ← Logger único
    │   │   └── index.js
    │   └── observer/
    │       ├── FlightSubject.js        ← Sujeto observable
    │       └── index.js
    │
    └── components/                     ← 🖼️ Componentes UI
        ├── CheckInPanel.jsx            ← Columna izquierda
        ├── FlightBoard.jsx             ← Columna central (pasajero)
        └── AdminPanel.jsx              ← Columna derecha (admin)
```

---

## 🚀 Instalación y uso / Installation & Usage

### Requisitos previos / Prerequisites

- [Node.js](https://nodejs.org/) v20 o superior
- npm v10 o superior

### Pasos / Steps

```bash
# 1. Clonar el repositorio / Clone the repository
git clone https://github.com/tu-usuario/airline-checkin.git

# 2. Entrar a la carpeta / Enter the folder
cd airline-checkin

# 3. Instalar dependencias / Install dependencies
npm install

# 4. Ejecutar en modo desarrollo / Run in development mode
npm run dev
```

Abrí tu navegador en / Open your browser at → **http://localhost:5173**

### Scripts disponibles / Available scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Compilación para producción → `dist/` |
| `npm run preview` | Vista previa del build de producción |

---

## 🛠️ Tecnologías / Tech Stack

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 18.3 | Framework UI |
| [Vite](https://vitejs.dev/) | 5.4 | Bundler y servidor de desarrollo |
| JavaScript | ES2022 | Lenguaje principal |

---

## 📚 Contexto académico / Academic Context

**ES** — Proyecto desarrollado para el *Taller de Aplicación* de la materia Diseño de Software. El objetivo es demostrar la aplicación práctica de tres patrones de la GoF en un sistema funcional con interfaz gráfica.

**EN** — Project developed for the *Application Workshop* in the Software Design course. The goal is to demonstrate the practical application of three GoF patterns in a functional system with a graphical interface.

---

## 📄 Licencia / License

Distribuido bajo licencia MIT. Ver `LICENSE` para más información.  
*Distributed under the MIT License. See `LICENSE` for more information.*