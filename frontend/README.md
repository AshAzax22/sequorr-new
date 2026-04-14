# Sequorr Frontend

Welcome to the frontend of **Sequorr**, a modern web application built with a focus on immersive user experiences, 3D graphics, and fluid animations.

## 🚀 Tech Stack

The frontend is built using a powerful and modern stack:

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **Fluid Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **State & Utilities**: 
  - `react-hot-toast` for notifications.
  - `face-api.js` for intelligent facial detection/analysis.
  - `ogl` and `postprocessing` for advanced high-performance visual effects.

## 📂 Project Structure

```text
frontend/
├── public/              # Static assets (fonts, icons)
├── src/
│   ├── assets/          # Project-wide images and media
│   ├── components/      # Reusable UI building blocks
│   │   ├── react-bits/  # Specialized high-performance UI components
│   │   └── ...          # Domain-specific components (Navbar, Footer, etc.)
│   ├── pages/           # High-level route views (Home, About, Blog, etc.)
│   ├── App.jsx          # Main application shell and routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global design tokens and styles
├── .env                 # Environment configuration (VITE_BACKEND_API_URL)
└── vite.config.js       # Build and development configuration
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the `frontend` root and add your backend API URL:
   ```env
   VITE_BACKEND_API_URL=your_api_url_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

- `npm run dev`: Start the development server with Hot Module Replacement (HMR).
- `npm run build`: Create an optimized production build in the `dist/` directory.
- `npm run lint`: Run ESLint to identify and fix code style issues.
- `npm run preview`: Locally preview the production build.

---

### Core Principles
- **Aesthetics First**: Every component is designed to be visually stunning and highly interactive.
- **Performance**: Leveraging Vite for fast builds and optimized 3D rendering for smooth frame rates.
- **Responsiveness**: Fully adaptive layouts ensuring a premium experience on mobile, tablet, and desktop.
