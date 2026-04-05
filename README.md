# 💎 Finsight — Personal Finance for Young Professionals

A premium, dark-mode personal finance web experience designed to make financial awareness feel **approachable, clear, and engaging** — not intimidating.

> Built for first-job professionals (22–28) managing salary for the first time.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-00d4aa?style=for-the-badge) ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

### 🏠 Smart Dashboard
- Animated balance counter with monthly sparkline
- Canvas-rendered spending donut chart
- Bento grid layout with goal progress rings & mood indicator
- Recent transaction feed with category-coded icons

### 📊 Spending Insights
- 6-month spending timeline (animated bar chart)
- Category breakdown with proportional color-coded bars
- AI-style smart insight cards (spending spikes, streaks, optimization tips)
- Top merchants ranking

### 🎯 Goal Tracking
- Visual goal cards with animated progress bars
- Streak counters for consistent saving behavior
- Add custom goals with emoji icon picker
- Summary dashboard (active goals, total saved, avg progress)

### 💭 Money Mood — *Unique Feature*
A **weekly 60-second guided financial wellness reflection** that bridges the gap between cold numbers and your emotional relationship with money.

- **Check-in flow**: Rate your feeling → Journal reflection → Completion
- **Wellness score**: 0–100 financial wellness indicator
- **Mood timeline**: Weekly emoji-based mood history
- **Mood × Spending correlation**: Discover how emotions affect spending patterns

### 👤 Profile & Settings
- Account management with connected accounts
- Toggle switches for notifications, dark mode, weekly reminders
- Data export and privacy controls

---

## 🚀 Quick Start

No build tools needed — just open in a browser:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/finsight.git

# Open in browser
open finsight/index.html
```

Or use a local server:
```bash
cd finsight
npx serve .
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Background** | `#050816` (deep navy) |
| **Accent Primary** | `#00d4aa` (teal) |
| **Accent Secondary** | `#667eea` (indigo) |
| **Typography** | DM Sans (headings) + Inter (body) |
| **Cards** | Glassmorphism (`backdrop-filter: blur(20px)`) |
| **Layout** | Bento grid, mobile-first (480px max) |
| **Animations** | CSS keyframes + Canvas API |

---

## 📁 Project Structure

```
finsight/
├── index.html      # SPA shell with all 6 screens
├── styles.css      # Complete design system & components
├── app.js          # Interactive logic, charts, state management
└── README.md
```

---

## 🧠 Design Decisions

| Decision | Rationale |
|---|---|
| Dark mode default | Young professionals browse at night; reduces eye strain, feels premium |
| Bento grid dashboard | Modular, scannable at a glance — inspired by modern fintech apps |
| Glassmorphism cards | Creates depth without heaviness; aligns with 2026 design trends |
| Bottom nav (mobile-first) | Thumb-reachable; familiar pattern for target demographic |
| Emotion-first insights | Differentiates from clinical finance tools; addresses financial anxiety |
| No decimals on overview | Reduces cognitive load; exact amounts in detail views only |

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Vanilla CSS with custom properties, `backdrop-filter`, CSS Grid
- **JavaScript** — Vanilla JS, Canvas API for charts, `localStorage` for persistence
- **No frameworks or dependencies** — Zero build step, instant load

---

## 📱 Screens

1. **Onboarding** — 3-step welcome flow (Welcome → Income → Priorities)
2. **Dashboard** — Financial overview with balance, spending, goals, mood
3. **Insights** — Spending analytics with charts and AI-style nudges
4. **Goals** — Track savings goals with progress bars and streaks
5. **Money Mood** — Weekly wellness reflection with correlation insights
6. **Profile** — Settings, preferences, and account management

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

<p align="center">Made with 💎 by Finsight</p>
