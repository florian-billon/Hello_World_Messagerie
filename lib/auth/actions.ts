"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * URL de l'API Backend Rust (Port 3001 configuré dans main.rs)
 */
const API_URL = process.env.API_URL || "http://localhost:3001";

/**
 * Connexion d'un utilisateur existant
 */
export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Priorité au message d'erreur du backend (ex: "Invalid password")
      return { error: data.message || data.error || "Identifiants invalides" };
    }

    // Stockage sécurisé du JWT dans les cookies
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true, // Protection contre les failles XSS
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 heures
      path: "/",
    });

    return { user: data.user, success: true };
  } catch (error) {
    console.error("Login fetch error:", error);
    return { error: "Le serveur backend est injoignable sur le port 3001." };
  }
}

/**
 * Inscription d'un nouvel utilisateur dans NeonDB
 */
export async function signup(username: string, email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Capture précise des erreurs NeonDB (ex: "Email already taken")
      return { error: data.message || data.error || "Échec de l'inscription" };
    }

    // Initialisation de la session immédiatement après l'inscription
    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }

    return { user: data.user, success: true };
  } catch (error) {
    console.error("Signup fetch error:", error);
    return { error: "Connexion impossible : vérifiez que le backend Rust est actif (cargo run)." };
  }
}

/**
 * Déconnexion et nettoyage du cookie
 */
export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    // Appel au backend pour invalider la session côté serveur
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.warn("Could not notify backend of logout");
    }
  }

  // Suppression du cookie local
  cookieStore.delete("token");
  
  // Redirection forcée vers la page de login
  redirect("/login");
}

/**
 * Récupère l'utilisateur actuel via le token stocké
 */
export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const res = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    return null;
  }
}