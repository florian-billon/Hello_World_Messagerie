use axum::{routing::{get, post}, Router};
use crate::{handlers::servers, AppState};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/servers", post(servers::create_server).get(servers::list_servers))
        .route(
            "/servers/{id}",
            get(servers::get_server)
                .put(servers::update_server)
                .delete(servers::delete_server),
        )
}