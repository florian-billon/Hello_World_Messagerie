"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      // Rediriger vers login après inscription réussie
      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[rgba(20,20,20,0.9)] backdrop-blur-xl rounded-2xl border-2 border-[#4FDFFF] shadow-[0_0_40px_rgba(79,223,255,0.15)] p-8 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Rejoindre <span className="text-[#FF3333] drop-shadow-[0_0_10px_rgba(255,51,51,0.5)]">HELLO WORLD</span>
        </h1>
        <p className="text-white/60">Créez votre compte pour commencer</p>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-[#4FDFFF] text-sm font-medium mb-2 tracking-wide">
            NOM D&apos;UTILISATEUR
          </label>
          <input
            id="username"
            type="text"
            required
            minLength={3}
            maxLength={32}
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#4FDFFF]/30 rounded-lg text-white placeholder-white/40 focus:border-[#4FDFFF] focus:shadow-[0_0_15px_rgba(79,223,255,0.3)] outline-none transition-all"
            placeholder="Votre pseudo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-[#4FDFFF] text-sm font-medium mb-2 tracking-wide">
            EMAIL
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#4FDFFF]/30 rounded-lg text-white placeholder-white/40 focus:border-[#4FDFFF] focus:shadow-[0_0_15px_rgba(79,223,255,0.3)] outline-none transition-all"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-[#4FDFFF] text-sm font-medium mb-2 tracking-wide">
            MOT DE PASSE
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#4FDFFF]/30 rounded-lg text-white placeholder-white/40 focus:border-[#4FDFFF] focus:shadow-[0_0_15px_rgba(79,223,255,0.3)] outline-none transition-all"
            placeholder="••••••••"
          />
          <p className="text-white/40 text-xs mt-1">Minimum 8 caractères</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-[#4FDFFF] text-sm font-medium mb-2 tracking-wide">
            CONFIRMER LE MOT DE PASSE
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#4FDFFF]/30 rounded-lg text-white placeholder-white/40 focus:border-[#4FDFFF] focus:shadow-[0_0_15px_rgba(79,223,255,0.3)] outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-2 bg-[#FF3333] hover:bg-[#FF5555] border-2 border-[#4FDFFF] text-white font-bold rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(79,223,255,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Création...
            </span>
          ) : (
            "CRÉER MON COMPTE"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="text-[#4FDFFF] hover:text-white transition-colors font-medium"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

