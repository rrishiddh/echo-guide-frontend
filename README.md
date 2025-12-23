# Echo Guide — Frontend 

A modern, responsive and interactive frontend application for **Echo Guide**, built with **Next.js, TypeScript, and Tailwind CSS**.  
The application delivers a smooth audio-guide experience with rich UI components, animations, and secure payment integration.

---

##  Project Overview

Echo Guide is a user-focused platform designed to provide guided audio experiences with an intuitive and visually appealing interface. The frontend emphasizes performance, accessibility, and usability, ensuring a seamless experience across all devices.

The application leverages modern web technologies such as **Next.js App Router**, **Radix UI**, and **Stripe** to deliver dynamic content, interactive components, and secure payments. With a scalable component architecture and clean design system, Echo Guide is built for growth and maintainability.

Whether you're a user exploring guided content or an admin managing experiences, the frontend offers a polished and engaging workflow.

---

##  Features

### Core Functionality
-  **Fully Responsive Design** — Optimized for mobile, tablet, and desktop
-  **Modern UI Components** — Built using Radix UI & Tailwind CSS
-  **High Performance** — Next.js SSR & optimized rendering
-  **Secure Payments** — Stripe Checkout integration
-  **API Integration** — Seamless communication with backend services

### Interactive Elements
- Dynamic dashboards and charts
- Audio guide listings and detail views
- Interactive modals, dialogs, and tabs
- Form validation and feedback
- Smooth transitions and animations

---

##  Tech Stack

- **Framework**: Next.js v16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Animations**: Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Payments**: Stripe
- **HTTP Client**: Axios
- **Deployment**: Vercel

---

##  Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rrishiddh/echo-guide-frontend.git
cd echo-guide-frontend
```

### 2. Install Dependencies

```bash
npm install
```

---

##  Environment Setup

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

For production:

```env
NEXT_PUBLIC_API_URL=https://echo-guide-backend.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-production-stripe-key
```

---

## ▶ Running the Application

### Development

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

##  Project Structure

```text
src/
├── app/                     # App Router pages
│   ├── auth/                # Authentication pages
│   ├── dashboard/           # User dashboard
│   ├── guides/              # Audio guides
│   ├── checkout/            # Stripe checkout
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # Reusable UI components (Radix)
│   ├── layout/              # Header, Footer, Navigation
│   ├── charts/              # Dashboard charts
│   └── common/              # Shared components
├── lib/
│   ├── api.ts               # Axios instance
│   ├── utils.ts             # Utility helpers
│   └── constants.ts         # App constants
├── hooks/                   # Custom React hooks
├── styles/                  # Global styles
└── types/                   # TypeScript definitions
```

---

##  Customization

### UI & Styling
- Modify theme colors in `tailwind.config.ts`
- Update animations in individual components
- Replace icons using Lucide React

### API Integration
- Update API base URL in `.env.local`
- Backend handled by:
  ```
  https://github.com/rrishiddh/echo-guide-backend
  ```

---

##  Dependencies

### Core Dependencies
- **next**: 16.0.7
- **react**: 19.2.0
- **react-dom**: 19.2.0
- **typescript**: ^5
- **tailwindcss**: ^4

### UI & Animation
- **@radix-ui/react-*** 
- **motion**
- **lucide-react**
- **recharts**
- **sonner**

### Payments
- **@stripe/react-stripe-js**
- **@stripe/stripe-js**

### Utilities
- **axios**
- **clsx**
- **class-variance-authority**
- **date-fns**
- **tailwind-merge**

---

##  Scripts

```bash
# Development
npm run dev

# Production
npm run build
npm run start

# Linting
npm run lint
```

---

## Deployment

### Vercel 

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add environment variables
4. Deploy !

---

## Links

### Live Applications

- **Frontend Live URL**  
  https://echo-guide-client.vercel.app/

- **Backend API (Health Check)**  
  https://echo-guide-backend.vercel.app/health

---

### GitHub Repositories

- **Frontend**  
  https://github.com/rrishiddh/echo-guide-frontend

- **Backend**  
  https://github.com/rrishiddh/echo-guide-backend

