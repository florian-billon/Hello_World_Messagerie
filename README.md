<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Hello World - Real Time Messaging Platform

Une plateforme de messagerie en temps réel construite avec **Next.js 16** (frontend) et **Rust/Axum** (backend).

## 🏗️ Architecture

```
hello-world/
├── backend/          # API Rust avec Axum
│   ├── src/
│   │   └── main.rs   # Endpoints REST API
│   └── Cargo.toml
├── frontend/         # Application Next.js
│   ├── app/
│   │   ├── components/   # Composants React
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Chat.tsx
│   │   │   └── MembersSidebar.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── public/       # Assets statiques
└── README.md
```

## 🚀 Démarrage rapide

### Backend (Rust)

```bash
cd backend
cargo run
```

Le serveur démarre sur `http://localhost:3001`

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

L'application démarre sur `http://localhost:3000`

## 📡 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/servers` | Liste tous les serveurs |
| POST | `/servers` | Crée un serveur |
| GET | `/servers/{id}` | Récupère un serveur |
| PUT | `/servers/{id}` | Modifie un serveur |
| DELETE | `/servers/{id}` | Supprime un serveur |

## 🛠️ Stack technique

### Frontend
- **Next.js 16** - Framework React
- **React 19** - UI Library
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling utility-first

### Backend
- **Rust** - Langage système performant
- **Axum** - Framework web async
- **Tokio** - Runtime async
- **Serde** - Serialization/Deserialization

## 📝 License

MIT
>>>>>>> 871b0d0 (Init: Rust backend + Next (TS) + Tailwind frontend)
