
# Soujanya — Panchakarma Therapy Booking (MVP)

Soujanya is a lightweight, beautiful single-page React application built as a hackathon MVP to showcase an Ayurvedic Panchakarma therapy booking experience. The UI focuses on immersive visuals, smooth micro-interactions, and a simple booking flow that can be connected to a backend service.

Key principles: elegant, dark-themed design; minimal, readable components; mobile-first progressive interactions.

---

## Demo & Media

- Screenshot / GIF: (attach under `./assets/screenshots/`)
- Demo video: (attach and link here)

Placeholder for images:

![Screenshot placeholder](./assets/screenshots/hero.png)

---

## TL;DR

- Tech: React + Vite + Tailwind CSS + Framer Motion + lucide-react
- Pages: Home, Patient Login, Practitioner Login, Patient Dashboard
- Core features: browse therapies, AI symptom assistant (client + API stub), book appointment flow (date/time selection + availability check), appointments management, health metrics tracker.

This project was implemented as a hackathon prototype in 18 hours for the event **Mumbai Hacks** by: Samarjeet Singh, Shivam Salkar, Aryan Darekar.

---

## Features

- Landing experience with parallax, ambient background and custom cursor
- Therapies catalog with lightweight cards and smooth transitions
- Patient Dashboard
	- View upcoming / past / cancelled appointments
	- Book therapy with date/time selection and availability checks (API stubs)
	- AI symptom checker (client + API stub to demonstrate flow)
	- Health metrics and therapy progress notes
- Simple auth context (client-only mock for demo) and routing
- Clean component structure and service layer ready for backend integration

---

## Suggested free APIs for integrations (MVP helpers)

These are optional services you can plug into the backend when implementing server-side features:

- AI recommendations: Hugging Face Inference API (free tier) or OpenAI (paid) for NLP-based symptom analysis. Use small text-generation models for lightweight inference.
- Calendar & availability: use Google Calendar API or a simple Firebase/Firestore schedule store for practitioner availability.
- Email / notifications: SendGrid (free tier) or Mailgun for booking confirmations.

Note: The frontend includes API client stubs in `frontend/services/api.js` that you can replace with real endpoints.

---

## Local development

Prerequisites: Node.js (16+) and npm.

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm run preview
```

If PostCSS/Tailwind throws errors during install, try a clean reinstall:

```powershell
# from project root (Windows PowerShell)
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
npm cache clean --force
npm install
```

---

## Project structure (important files)

```
index.html
package.json
vite.config.js
tailwind.config.js
postcss.config.js
frontend/
	├─ main.jsx             # app entry
	├─ App.jsx              # routes + auth provider
	├─ index.css            # global styles + font
	├─ pages/
	|   ├─ Home.jsx
	|   ├─ patient_login.jsx
	|   ├─ practioner_login.jsx
	|   └─ PatientDashboard.jsx
	├─ components/         # UI building blocks (Hero, Therapies, SplitSection...)
	├─ context/            # AuthContext (client-side mock)
	└─ services/           # api.js (stubs), BookingService.js
```

---

## How buttons & flows are wired

- Home CTA buttons route to login or dashboard pages via `react-router-dom`.
- The booking flow is implemented in `components/dashboard/BookTherapySection.jsx` and uses `services/api.js` stubs:
	- `checkPractitionerAvailability(therapyId, date)` → returns mock slots
	- `bookAppointment(bookingData)` → returns a mock confirmed appointment
- App-level auth state (mock) is in `frontend/context/AuthContext.jsx` and protects the dashboard route.

---

## Extending with a backend

Recommended minimal endpoints the backend should provide:

- `POST /api/auth/login` and `POST /api/auth/signup` — authenticate users and return a token
- `GET /api/therapies` — list therapies
- `POST /api/practitioners/availability` — return available slots for therapy + date
- `POST /api/appointments` — create appointment (and return confirmation)
- `GET /api/patients/:id/appointments` — list patient's appointments

Plug these endpoints into `frontend/services/api.js` — the file contains TODOs and mock implementations to guide you.

---

## Roadmap / Ideas

- Practitioner dashboard + schedule management (admin view)
- Real AI model orchestration (secure server-side calls to OpenAI/HF)
- Payment integration (Stripe) and refunds
- SMS & push notifications for reminders
- Multi-language support (i18n)

---

## Contribution

This repository was created as a hackathon prototype. If you want to contribute features, please open an issue or a PR and describe the intended change. Keep changes scoped to single features and include a short test or instruction to verify.

---

## License

This repository does not include a license file by default. If you want to open-source it, consider adding an `LICENSE` (MIT or Apache-2.0).

---

## Hackathon credit

Built for Mumbai Hacks in a rapid 18-hour sprint by:

- Samarjeet Singh
- Shivam Salkar
- Aryan Darekar

---

If you want, I can also add a short `CONTRIBUTING.md`, or scaffold a simple Express backend with these endpoints and a SQLite file to prototype the backend quickly.


