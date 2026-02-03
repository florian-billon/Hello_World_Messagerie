use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{AuthResponse, LoginPayload, SignupPayload, User, UserResponse};
use crate::services::{create_token, hash_password, verify_password};

/// Erreurs d'authentification centralisées
#[derive(Debug, thiserror::Error)]
pub enum AuthError {
    #[error("Cet email est déjà utilisé")]
    EmailExists,
    
    #[error("Identifiants invalides")]
    InvalidCredentials,
    
    #[error("Utilisateur introuvable")]
    UserNotFound,
    
    #[error("Erreur de base de données : {0}")]
    Database(#[from] sqlx::Error),
    
    #[error("Erreur de hachage : {0}")]
    PasswordHash(#[from] bcrypt::BcryptError),
    
    #[error("Erreur JWT : {0}")]
    Jwt(#[from] jsonwebtoken::errors::Error),
}

/// Inscription d'un nouvel utilisateur (SIGNUP)
pub async fn signup(
    pool: &PgPool,
    payload: SignupPayload,
    jwt_secret: &str,
) -> Result<AuthResponse, AuthError> {
    // 1. Vérifier si l'email existe déjà (optimisé avec EXISTS)
    let email_exists = sqlx::query_scalar::<_, bool>(
        "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)"
    )
    .bind(&payload.email)
    .fetch_one(pool)
    .await?;

    if email_exists {
        return Err(AuthError::EmailExists);
    }

    // 2. Hasher le mot de passe
    let password_hash = hash_password(&payload.password)?;

    // 3. Insérer l'utilisateur
    // Note : On utilise uniquement les colonnes présentes dans votre SQL Neon
    let user = sqlx::query_as::<_, User>(
        r#"
        INSERT INTO users (id, email, password_hash, username, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING id, email, password_hash, username, avatar_url, created_at
        "#,
    )
    .bind(Uuid::new_v4())
    .bind(&payload.email)
    .bind(&password_hash)
    .bind(&payload.username)
    .fetch_one(pool)
    .await?;

    // 4. Générer le token JWT
    let token = create_token(user.id, &user.email, jwt_secret)?;

    Ok(AuthResponse {
        user: user.into(),
        token,
    })
}

/// Connexion d'un utilisateur (LOGIN)
pub async fn login(
    pool: &PgPool,
    payload: LoginPayload,
    jwt_secret: &str,
) -> Result<AuthResponse, AuthError> {
    // 1. Récupérer l'utilisateur par email
    let user = sqlx::query_as::<_, User>(
        "SELECT id, email, password_hash, username, avatar_url, created_at FROM users WHERE email = $1",
    )
    .bind(&payload.email)
    .fetch_optional(pool)
    .await?
    .ok_or(AuthError::InvalidCredentials)?;

    // 2. Vérifier le mot de passe
    if !verify_password(&payload.password, &user.password_hash)? {
        return Err(AuthError::InvalidCredentials);
    }

    // 3. Générer le token
    let token = create_token(user.id, &user.email, jwt_secret)?;

    Ok(AuthResponse {
        user: user.into(),
        token,
    })
}

/// Récupère un utilisateur par son ID (ME)
pub async fn get_user_by_id(pool: &PgPool, user_id: Uuid) -> Result<UserResponse, AuthError> {
    let user = sqlx::query_as::<_, User>(
        "SELECT id, email, password_hash, username, avatar_url, created_at FROM users WHERE id = $1",
    )
    .bind(user_id)
    .fetch_optional(pool)
    .await?
    .ok_or(AuthError::UserNotFound)?;

    Ok(user.into())
}

/// Déconnexion
pub async fn logout(_pool: &PgPool, _user_id: Uuid) -> Result<(), AuthError> {
    // Pas de colonne 'status' en base, donc on valide juste l'action.
    // La déconnexion réelle se fait côté frontend en supprimant le cookie.
    Ok(())
}