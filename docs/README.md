# Documentation du Projet

## UML - Modèle de données

Le fichier `UML/classes.puml` contient le diagramme de classes PlantUML définissant la structure de données de l'application RTC (Real Time Chat).

### Entités principales

- **User** : Utilisateur de l'application avec authentification
- **Server** : Serveur/Communauté créé par un utilisateur
- **ServerMember** : Relation entre User et Server avec rôle (Owner/Admin/Member)
- **Channel** : Canal de communication dans un serveur
- **ChannelMessage** : Message envoyé dans un canal
- **Invite** : Code d'invitation pour rejoindre un serveur

### Relations

- Un User peut être propriétaire de plusieurs Servers
- Un User peut être membre de plusieurs Servers (via ServerMember)
- Un Server contient plusieurs Channels
- Un Channel contient plusieurs ChannelMessages
- Un Server peut avoir plusieurs Invites

