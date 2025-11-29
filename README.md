# Panchakarma Therapy Booking Application

A React + Tailwind CSS + Framer Motion booking application for Panchakarma therapy services.

## Installation

### 1. Install Node.js dependencies

```bash
npm install
```

This will install all required packages:
- **react** & **react-dom** - React framework
- **framer-motion** - Animation library
- **tailwindcss** - Utility-first CSS framework
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - Vite plugin for React
- **postcss** & **autoprefixer** - CSS processing

### 2. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Project Structure

```
├── frontend/
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   ├── index.css               # Tailwind imports
│   └── components/
│       ├── Header.jsx
│       ├── Hero.jsx
│       ├── AboutUs.jsx
│       ├── TherapiesCarousel.jsx
│       ├── TherapyCard.jsx
│       ├── LoginSelection.jsx
│       ├── Footer.jsx
│       ├── data/
│       │   └── therapies.js
│       └── hooks/
│           └── useTherapies.js
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## Integration Points

All components include TODO comments for cursor agent integration:
- `handleBook(therapyId?)` → `cursorAgent.openBooking({ therapyId })`
- `handleViewSchedule()` → `cursorAgent.openSchedule()`
- `handleLogin(role)` → `cursorAgent.authLogin({ role })`
- `fetchTherapies()` → `cursorAgent.fetchTherapies()`

"# mumbai-hacks-2025" 
