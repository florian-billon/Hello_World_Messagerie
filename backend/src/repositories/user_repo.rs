use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{UpdateMePayload, User, UserResponse, UserStatus};

pub async fn get_user_by_id(db: &PgPool, user_id: Uuid) -> Result<Option<User>, sqlx::Error> {
    let user = sqlx::query_as!(
        User,
        r#" SELECT id, email, password_hash, username, avatar_url,
               status as "status: UserStatus",
               created_at FROM users
        WHERE id = $1 "#,
        user_id
    )
    .fetch_optional(db)
    .await?;
    Ok(user)
}

pub async fn update_user_by_id(db: &PgPool, user_id: Uuid, payload: UpdateMePayload) -> Result<Option<User>, sqlx::Error> {
    let user = sqlx::query_as!(
        User,
        r#"UPDATE users SET
          username   = COALESCE($2, username),
          avatar_url = COALESCE($3, avatar_url),
          status     = COALESCE($4, status)
        WHERE id = $1
        RETURNING id, email, password_hash, username, avatar_url,
                  status as "status: UserStatus",
                  created_at
        "#,
        user_id,
        payload.username,
        payload.avatar_url,
        payload.status as Option<UserStatus>,
    )
    .fetch_optional(db)
    .await?;
    Ok(user)
}
