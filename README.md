# AI Productivity Dashboard

A modern, AI-powered productivity dashboard built with React, Vite, and Tailwind CSS. Track tasks, habits, and analyze your productivity patterns with intelligent insights.
DEPLOYMENT LINK:https://ai-productivity-dashboard-react-2lg5mst2d.vercel.app/settings

![React](https://img.shields.io/badge/React-19.2.5-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.10-purple?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.4-38bdf8?style=flat&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **📊 Dashboard** — Overview of your daily productivity with key metrics and AI-generated insights
- **✅ Task Management** — Create, organize, and track tasks with drag-and-drop reordering
- **🎯 Habit Tracking** — Build and monitor daily habits with streak tracking
- **📈 Analytics** — Visualize productivity trends with interactive charts
- **📅 Calendar** — View tasks and habits on a calendar interface
- **⚙️ Settings** — Customize your experience
- **🤖 AI Insights** — Smart recommendations based on your productivity patterns

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router DOM 7 |
| **Animations** | Framer Motion 12 |
| **Charts** | Recharts 3 |
| **Drag & Drop** | @dnd-kit |
| **Icons** | Lucide React |
| **Utilities** | date-fns, clsx, tailwind-merge |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd AI Productivity Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AIInsights.jsx
│   ├── HabitModal.jsx
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   ├── TaskCard.jsx
│   ├── TaskModal.jsx
│   └── ui/             # Base UI components
├── context/             # React Context providers
│   ├── HabitContext.jsx
│   └── TaskContext.jsx
├── hooks/               # Custom React hooks
│   └── useLocalStorage.js
├── pages/               # Page components
│   ├── Analytics.jsx
│   ├── Calendar.jsx
│   ├── Dashboard.jsx
│   ├── Habits.jsx
│   ├── Settings.jsx
│   ├── Tasks.jsx
│   └── NotFound.jsx
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
Created By:M.Umar Afzaal
