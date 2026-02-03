pub mod auth;
pub mod servers;
pub mod user;

use axum::Router;
use crate::AppState;

pub fn app_routes() -> Router<AppState> {
    Router::new()
        .merge(auth::routes())
        .merge(user::routes())
        .merge(servers::routes())
}