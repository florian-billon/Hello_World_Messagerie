const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    status: "ONLINE" | "OFFLINE" | "DND" | "INVISIBLE";
    avatar_url?: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  status: "ONLINE" | "OFFLINE" | "DND" | "INVISIBLE";
  avatar_url?: string;
  created_at: string;
}

class AuthAPI {
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  async signup(credentials: RegisterCredentials): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erreur lors de l'inscription");
    }

    return res.json();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erreur de connexion");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data;
  }

  async logout(): Promise<void> {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: this.getHeaders(),
    });

    localStorage.removeItem("token");

    if (!res.ok) {
      console.warn("Logout request failed, but token was removed locally");
    }
  }

  async getCurrentUser(): Promise<User> {
    const res = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error("Non authentifié");
    }

    return res.json();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authAPI = new AuthAPI();

