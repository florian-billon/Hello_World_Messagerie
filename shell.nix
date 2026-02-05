{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # Rust toolchain
    rustc
    cargo
    rustfmt
    clippy
    
    # PostgreSQL client (pour migrations)
    postgresql
    
    # Node.js (pour le frontend)
    nodejs_20
    
    # Outils de développement
    pkg-config
    openssl
  ];

  # Variables d'environnement pour Rust
  RUST_BACKTRACE = "1";
  
  # Configuration pour PostgreSQL
  shellHook = ''
    echo "🚀 Environnement de développement chargé"
    echo "📦 Rust: $(rustc --version)"
    echo "📦 Cargo: $(cargo --version)"
    echo "📦 Node.js: $(node --version)"
    echo ""
    echo "💡 Commandes disponibles:"
    echo "  - cargo run          : Lancer le backend"
    echo "  - cargo build         : Compiler le backend"
    echo "  - cargo test          : Lancer les tests"
    echo "  - npm install         : Installer les dépendances frontend"
    echo "  - npm run dev         : Lancer le frontend"
  '';
}

