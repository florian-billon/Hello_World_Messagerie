"use client";

/**
 * Redirige vers la page de login en supprimant le token
 */
export function handleAuthError() {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/login";
}

/**
 * Vérifie si un message d'erreur correspond à une erreur d'authentification
 */
export function isAuthError(errorMessage: string): boolean {
  return (
    errorMessage.includes("Authentication") ||
    errorMessage.includes("Invalid token") ||
    errorMessage.includes("Missing authorization")
  );
}

/**
 * Extrait le message d'erreur d'une exception
 */
export function getErrorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

