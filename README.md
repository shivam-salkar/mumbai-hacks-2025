<div align="center">

  <a href="#">
    <img src="https://img.shields.io/badge/Status-MVP_Complete-success?style=for-the-badge&logo=adguard&logoColor=white" alt="Status MVP" />
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Hackathon-Mumbai_Hacks-8A2BE2?style=for-the-badge&logo=rocket&logoColor=white" alt="Mumbai Hacks" />
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=git&logoColor=white" alt="License MIT" />
  </a>

  <br />
  <br />

  <img src="demo/soujanya-landing-page.jpg" alt="Soujanya Banner" width="100%" style="border-radius: 10px; box-shadow: 0px 4px 20px rgba(0,0,0,0.5);" />

  <br />

  <h1 style="font-size: 3rem; margin-bottom: -10px;">SOUJANYA</h1>
  <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=25&pause=1000&color=2DD4BF&center=true&vCenter=true&width=500&lines=Ayurvedic+Healing+Reimagined.;Immersive+Panchakarma+Booking.;AI-Powered+Symptom+Analysis.;Built+in+24+Hours." alt="Typing SVG" /></a>

  <p align="center">
    <b>Lightweight. Immersive. Modern.</b><br />
    A minimalist solution orchestrating the Panchakarma therapy experience.
  </p>

</div>

---

## ⚡ The 24-Hour Vision (Hackathon Context)

> **"We didn't just want to build a form; we wanted to build an atmosphere."**

**Soujanya** was conceptualized and engineered during a rapid **18-hour sprint** for **Mumbai Hacks**. While this release is an MVP, the architecture is designed for scalability. We focused on "Progressive Disclosure", showing the user only what they need, when they need it.

| Timeline | Milestone | Status |
| :--- | :--- | :--- |
| **0-6 hrs** | UI/UX Design & Component Architecture | ✅ |
| **6-12 hrs** | React Logic, Routing & Auth Context | ✅ |
| **12-18 hrs** | AI Integration (Stubs) & Micro-interactions | ✅ |
| **Future** | Backend Integration & Payment Gateways | ⏳ |

---

## 🎨 Tech Stack

We leveraged a modern, performance-first stack to ensure 60fps animations and instant load times.

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,git,vscode,figma&theme=dark" />
  </a>
</div>

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS + PostCSS
- **Animations:** Framer Motion
- **Icons:** Lucide-react
- **Architecture:** Component-based, Service-layer pattern

---

## 🔮 Key Features

### 🩺 For the Patient
- **Ambient Landing Experience:** Parallax effects, custom cursors, and dark-themed visuals to induce calmness.
- **AI Symptom Assistant:** A dedicated interface demonstrating how NLP can guide patients to the right therapy (Client + API stub).
- **Seamless Booking:** Date/Time selection with immediate availability checks.
- **Health Metrics:** Visualize therapy progress and vital stats.

### 🛠️ Technical Highlights
- **Service Layer Abstraction:** All API calls are centralized in `services/api.js` for easy swap-out.
- **Mock Auth Context:** A client-side demonstration of secure route protection.
- **Responsive Design:** Mobile-first approach ensuring the app feels native on phones.

---

## 📸 Demo & Screenshots

| Landing Page | Booking Flow |
| :---: | :---: |
| <img src="demo/soujanya-landing-page.jpg" width="100%" /> | <img src="demo/soujanya-booking-ui.jpg" width="100%" /> |

| AI Assistant | Practitioner Dashboard |
| :---: | :---: |
| <img src="demo/soujanya-ai-assistant.jpg" width="100%" /> | <img src="demo/soujanya-practitioner-dashboard.jpg" width="100%" /> |

---

## 🧩 Architecture & Data Flow

We used a modular architecture to separate UI from logic. Here is how the Booking Flow operates under the hood:

```mermaid
graph LR
    A[User Selects Therapy] --> B{Check Auth};
    B -- No --> C[Login Page];
    B -- Yes --> D[Booking Component];
    D --> E[Check Availability];
    E -- API Stub --> F[Mock Slots];
    F --> D;
    D --> G[Confirm Booking];
    G -- POST --> H[Update Dashboard];