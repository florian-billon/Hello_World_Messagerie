# Hello World - Real Time Messaging Platform

Une plateforme de messagerie en temps réel construite avec **Next.js 16** (frontend) et **Rust/Axum** (backend).

## 🏗️ Architecture

```
hello-world/
├── backend/          # API Rust avec Axum
│   ├── src/
│   │   └── main.rs   # Endpoints REST API
│   ├── Cargo.toml
│   └── Cargo.lock
├── frontend/         # Application Next.js
│   ├── app/
│   │   ├── auth/         # Page d'authentification
│   │   │   └── page.tsx
│   │   ├── components/   # Composants React
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── MembersSidebar.tsx
│   │   │   └── index.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── public/       # Assets statiques
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.ts
│   └── eslint.config.ts
└── README.md
```

## 🚀 Démarrage rapide

### Prérequis

- **Rust** (dernière version stable)
- **Node.js** 18+ et **npm**

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
