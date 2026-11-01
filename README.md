# Snake Arena 🐍 — EAT. GROW. DOMINATE.

An ultra-premium, production-grade 2D arcade survival game engineered with **Phaser 3**, **Vite**, **Web Audio API**, and **browser LocalStorage**.

![Snake Arena Preview](public/favicon.svg)

---

## 🎨 Ultra-Premium Design System

Snake Arena features a bespoke aesthetic inspired by luxury technology hardware, esports interfaces, and high-end gaming clients:

### Color Palette
- **Main Background:** `#080B0A`
- **Secondary Surface:** `#101512`
- **Elevated Surfaces:** `#151C17`
- **Surface Hover:** `#1B241E`
- **Primary Interactive Accent (Neon Lime):** `#B7FF38`
- **Auxiliary Accent (Bright Green):** `#69F542`
- **Mode Accent (Cyan):** `#47E5DB`
- **Mode Accent (Purple):** `#B79AFF`
- **Solar Warning (Danger/Flame):** `#FF5C28`
- **Prestige Currency (Gold):** `#FFE066`
- **Primary Text:** `#F4F7F2`
- **Secondary Text:** `#929C94`
- **Muted Technical Text:** `#5E6860`
- **Perimeter Borders:** `rgba(255, 255, 255, 0.08)` / Active: `rgba(183, 255, 56, 0.35)`

### Typography & Structure
- Clean geometric sans-serif with uppercase technical tracking.
- Tabular numerals (`tabular-nums`) for jitter-free score counters, timers, and credit balances.
- Crisp 4px-8px corner radii; restrained negative space and subtle neon lime illumination.

---

## 🕹️ Architecture & Game Systems

- **Tactical Arcade Launcher:** Dual-interface architecture featuring an integrated web client and a Phaser 3 hardware-accelerated 2D canvas running at a rock-solid 60 FPS.
- **Frame-Rate Independent Physics:** Delta time accumulator ensures smooth, identical movement across 60Hz, 120Hz, or high-refresh mobile screens.
- **Direction-Buffering Logic:** Eliminates accidental 180° neck-snapping collisions.
- **3 Operational Scenarios:**
  - **Survival (Classic):** Full perimeter lethality and body collision danger.
  - **Time Attack:** 60-second high-velocity sprint with live countdown timer.
  - **Zen Mode:** Infinite perimeter continuity (wrap-around edges) with chassis collision enabled.
- **Dynamic Combo Multipliers:**
  - Eating food within 3.5s chains multipliers from `x2` to `x8` with pitch-shifted synth chimes.
- **Power Surge Protocols:**
  - ⚡ **Speed Boost (5.0s):** 40% step acceleration with cyan motion-blur trails.
  - 🛡️ **Hex Shield (10.0s):** Orbital energy barrier that absorbs 1 fatal collision.
  - 🧲 **Credit Magnet (8.0s):** Vacuums all bonus credits within a 3-tile perimeter.
- **8 Procedural Serpentine Chassis:**
  - *Classic Green* (Default)
  - *Neon Cyber* (200 CR)
  - *Fire Snake* (300 CR)
  - *Ice Snake* (300 CR)
  - *Galaxy Snake* (500 CR)
  - *Golden Snake* (800 CR)
  - *Toxic Slime* (600 CR)
  - *Shadow Snake* (1000 CR)
- **Zero-Dependency Synthesized Web Audio:** Custom oscillators generate dynamic sound effects for consumption, power surge initiation, shield fractures, and level completion.
- **Persistent Local Vault:** 100% private, serverless client storage under `snake_arena_data`.

---

## 🚀 Local Development & Production

```bash
# Navigate to the project root
cd "c:\Users\Acer\Downloads\Mobile Devices\snake-arena"

# Run development server
npm run dev

# Run comprehensive system unit tests
npm test

# Build production distribution
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Free Static Hosting

### Cloudflare Pages
1. Push repository to GitHub or GitLab.
2. Connect in **Cloudflare Dashboard** > **Workers & Pages**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Deploy instantly worldwide with zero hosting costs and free SSL.

### Vercel
1. Import repository into **Vercel**.
2. Framework preset will automatically recognize **Vite**.
3. Output Directory: `dist`
4. Click **Deploy**.

---

## ⌨️ Controls Reference

| Function | Desktop Binding | Mobile / Tablet Gesture |
| :--- | :--- | :--- |
| **Steer Up** | `W` or `↑` | Swipe Up or Tap `▲` |
| **Steer Down** | `S` or `↓` | Swipe Down or Tap `▼` |
| **Steer Left** | `A` or `←` | Swipe Left or Tap `◀` |
| **Steer Right** | `D` or `→` | Swipe Right or Tap `▶` |
| **Tactical Pause** | `Space` or `Esc` | Tap On-Screen Pause Button |
| **Confirm / Retry**| `Enter` | Tap Primary CTA Button |
| **Fullscreen** | `Fullscreen` Tool | Tap `⛶ FULLSCREEN` Button |

---

## 📄 License

MIT License. Free to deploy, modify, and distribute.
