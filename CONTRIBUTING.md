# 🤝 Guide de contribution - Hello World RTC

## 👥 Équipe

| Membre | Rôle | Focus |
|--------|------|-------|
| **Florian** | Frontend Lead | Next.js, UI/UX, WebSocket client |
| **Bilel** | Backend Lead | Rust/Axum, API REST, WebSocket server |
| **Romeo** | Database Lead | PostgreSQL, MongoDB, migrations |
| **[Toi]** | Architecture | Docs, structure, intégration |

---

## 🌿 Stratégie de branches

```
main (production)
 │
 └── develop (intégration)
      │
      ├── feature/auth        ← Authentification JWT
      ├── feature/servers     ← Gestion serveurs/canaux
      ├── feature/messages    ← Messages + WebSocket
      └── feature/ui          ← Interface utilisateur
```

### Règles

| Branche | Usage | Merge vers |
|---------|-------|------------|
| `main` | Production stable | ❌ Direct push interdit |
| `develop` | Intégration features | `main` via PR |
| `feature/*` | Développement | `develop` via PR |

### Workflow

1. **Créer une feature** : `git checkout develop && git checkout -b feature/xxx`
2. **Commiter souvent** : `git commit -m "feat: description"`
3. **Push régulièrement** : `git push -u origin feature/xxx`
4. **Pull Request** : Vers `develop` quand terminé
5. **Review** : Au moins 1 approval avant merge

---

## 📝 Convention de commits

```
<type>: <description>

Types:
- feat:     Nouvelle fonctionnalité
- fix:      Correction de bug
- docs:     Documentation
- style:    Formatage (pas de changement de code)
- refactor: Refactoring
- test:     Ajout de tests
- chore:    Maintenance (deps, config)
```

**Exemples :**
```bash
git commit -m "feat: add JWT authentication endpoint"
git commit -m "fix: resolve CORS issue on /servers"
git commit -m "docs: update API endpoints in README"
```

---

## 🛠️ Stack technique

### Backend (Rust)
```
backend/
├── Cargo.toml
└── src/
    ├── main.rs          ← Entry point + Axum router
    ├── handlers/        ← HTTP handlers
    ├── services/        ← Business logic
    ├── models/          ← Data structures
    └── db/              ← PostgreSQL + MongoDB
```

### Frontend (Next.js)
```
frontend/
├── package.json
└── app/
    ├── layout.tsx       ← Root layout
    ├── page.tsx         ← Home page
    ├── (auth)/          ← Login/Register
    └── (app)/           ← Dashboard
```

### Bases de données

| BDD | Utilisation | Port |
|-----|-------------|------|
| **PostgreSQL** | Users, Servers, Channels, Roles | 5432 |
| **MongoDB** | Messages (historique) | 27017 |

⚠️ **IMPORTANT** : On utilise PostgreSQL + MongoDB, PAS MySQL !

---

## 🚀 Commandes utiles

### Backend
```bash
cd backend
cargo run                    # Lancer le serveur (port 3001)
cargo test                   # Lancer les tests
cargo clippy                 # Linter Rust
```

### Frontend
```bash
cd frontend
npm install                  # Installer les dépendances
npm run dev                  # Lancer le dev server (port 3000)
npm run build                # Build production
```

### Git
```bash
git fetch origin             # Récupérer les branches distantes
git pull origin develop      # Mettre à jour develop
git rebase develop           # Rebaser sa feature sur develop
```

---

## ✅ Checklist avant PR

- [ ] Code compile sans erreur
- [ ] Tests passent
- [ ] Pas de `console.log` / `println!` de debug
- [ ] Commits atomiques avec messages clairs
- [ ] Documentation mise à jour si nécessaire
- [ ] Branch rebasée sur `develop` récent

---

## 📅 Planning

| Date | Milestone |
|------|-----------|
| **Semaine 1** | Setup + Auth + BDD |
| **Semaine 2** | Servers + Channels |
| **Semaine 3** | Messages + WebSocket |
| **Semaine 4** | UI/UX + Tests + Polish |

---

## 💬 Communication

- **Visio quotidienne** : 18h00
- **Push régulier** : Minimum 1x/jour
- **Docs partagés** : Google Docs (voir lien Teams)

