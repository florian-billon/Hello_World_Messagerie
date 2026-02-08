pub mod auth;
pub mod channels;
pub mod invites;
pub mod messages;
pub mod servers;
pub mod invite;

use axum::Router;

use crate::AppState;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .merge(servers::routes())
        .merge(channels::routes())
        .merge(messages::routes())
        .merge(invites::routes())
        .merge(invite::routes())
}
