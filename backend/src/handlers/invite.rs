use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use uuid::Uuid;

use crate::{AppState, Result};
use crate::ctx::Ctx;
use crate::models::{CreateInvitePayload, InviteResponse};
use crate::services;

pub async fn create_invite(
    State(state): State<AppState>,
    ctx: Ctx,
    Path(server_id): Path<Uuid>,
    Json(payload): Json<CreateInvitePayload>,
) -> Result<Json<InviteResponse>> {
    let invite = services::invite::create_invite(&state, server_id, ctx.user_id(), payload).await?;
    Ok(Json(invite))
}

// public: preview invite
pub async fn get_invite(
    State(state): State<AppState>,
    Path(code): Path<String>,
) -> Result<Json<InviteResponse>> {
    let invite = services::invite::get_invite_by_code(&state, &code).await?;
    Ok(Json(invite))
}

// protected: accept invite
pub async fn accept_invite(
    State(state): State<AppState>,
    ctx: Ctx,
    Path(code): Path<String>,
) -> Result<StatusCode> {
    services::invite::accept_invite(&state, ctx.user_id(), &code).await?;
    Ok(StatusCode::NO_CONTENT)
}