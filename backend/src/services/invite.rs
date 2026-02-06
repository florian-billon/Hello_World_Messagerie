use crate::{AppState, Error, Result, models::ServerMember};
use uuid::Uuid;

use crate::models::{CreateInvitePayload, InviteResponse, MemberRole};

fn gen_code(len: usize) -> String {
    use rand::{distributions::Alphanumeric, Rng};
    rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(len)
        .map(char::from)
        .collect()
}

pub async fn create_invite(
    state: &AppState,
    server_id: Uuid,
    creator_id: Uuid,
    payload: CreateInvitePayload,
) -> Result<InviteResponse> {
    let mut code = gen_code(10);
    for _ in 0..5 {
        if state.invite_repo.find_by_code(&code).await?.is_none() {
            break;
        }
        code = gen_code(10);
    }

    let invite = state
        .invite_repo
        .create(
            server_id,
            creator_id,
            &code,
            payload.max_uses,
            payload.expires_at,
        )
        .await?;

    Ok(invite.into())
}

pub async fn get_invite_by_code(state: &AppState, code: &str) -> Result<InviteResponse> {
    let invite = state
        .invite_repo
        .find_by_code(code)
        .await?
        .ok_or(Error::InternalError {
            message: "Invite not found".into(),
        })?;

    Ok(invite.into())
}

pub async fn accept_invite(state: &AppState, user_id: Uuid, code: &str) -> Result<Vec<ServerMember>> {
    let invite = state
        .invite_repo
        .find_by_code(code)
        .await?
        .ok_or(Error::InternalError {
            message: "Invite not found".into(),
        })?;

    let existing_member = state
        .server_repo
        .find_member(invite.server_id, user_id)
        .await?;

    if existing_member.is_none() {
        state
            .server_repo
            .add_member(invite.server_id, user_id, MemberRole::Member)
            .await?;
    }

    state.invite_repo.increment_use(invite.id).await?;

    let members = state.server_repo.list_members(invite.server_id).await?;
    Ok(members)
}
