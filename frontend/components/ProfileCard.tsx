"use client";

import { useState } from "react";
import { User, updateMe, UpdateProfilePayload } from "@/lib/api-server";

interface ProfileCardProps {
  user: User;
  onClose: () => void;
  onUpdate?: (user: User) => void;
}

type UserStatus = "online" | "offline" | "dnd" | "invisible";

const statusColors: Record<UserStatus, string> = {
  online: "bg-green-500",
  offline: "bg-gray-500",
  dnd: "bg-red-500",
  invisible: "bg-gray-400",
};

const statusLabels: Record<UserStatus, string> = {
  online: "En ligne",
  offline: "Hors ligne",
  dnd: "Ne pas déranger",
  invisible: "Invisible",
};

export default function ProfileCard({ user, onClose, onUpdate }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    avatar_url: user.avatar_url || "",
    status: (user.status?.toLowerCase() || "online") as UserStatus,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStatus = (user.status?.toLowerCase() || "online") as UserStatus;
  const memberSince = new Date(user.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload: UpdateProfilePayload = {};
      if (editData.username !== user.username) payload.username = editData.username;
      if (editData.avatar_url !== (user.avatar_url || "")) payload.avatar_url = editData.avatar_url || undefined;
      if (editData.status !== currentStatus) payload.status = editData.status;

      if (Object.keys(payload).length > 0) {
        const updatedUser = await updateMe(payload);
        onUpdate?.(updatedUser);
      }
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Card */}
      <div className="relative w-full max-w-[340px] bg-[#232428] rounded-lg overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease]">
        
        {/* Banner */}
        <div className="h-[60px] bg-gradient-to-r from-[#5865f2] to-[#4fdfff]" />
        
        {/* Avatar */}
        <div className="relative px-4">
          <div className="absolute -top-8 left-4">
            <div className="relative">
              <div className="w-[80px] h-[80px] rounded-full bg-[#232428] p-1">
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#5865f2] to-[#4fdfff] flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              {/* Status badge */}
              <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-[3px] border-[#232428] ${statusColors[currentStatus]}`} />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="pt-12 px-4 pb-4">
          {/* Username section */}
          <div className="bg-[#111214] rounded-lg p-3 mb-3">
            {isEditing ? (
              <div className="space-y-3">
                {/* Username edit */}
                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    Nom d&apos;utilisateur
                  </label>
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-[#1e1f22] border border-[#3f4147] rounded text-white text-sm focus:outline-none focus:border-[#5865f2]"
                  />
                </div>
                
                {/* Avatar URL edit */}
                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    URL Avatar
                  </label>
                  <input
                    type="text"
                    value={editData.avatar_url}
                    onChange={(e) => setEditData({ ...editData, avatar_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full mt-1 px-3 py-2 bg-[#1e1f22] border border-[#3f4147] rounded text-white text-sm focus:outline-none focus:border-[#5865f2] placeholder:text-white/30"
                  />
                </div>
                
                {/* Status edit */}
                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    Statut
                  </label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value as UserStatus })}
                    className="w-full mt-1 px-3 py-2 bg-[#1e1f22] border border-[#3f4147] rounded text-white text-sm focus:outline-none focus:border-[#5865f2]"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white">{user.username}</h2>
                <p className="text-sm text-white/60">@{user.username.toLowerCase().replace(/\s+/g, "")}</p>
              </>
            )}
          </div>
          
          {/* Divider */}
          <div className="h-px bg-[#3f4147] my-3" />
          
          {/* Info section */}
          <div className="bg-[#111214] rounded-lg p-3 space-y-3">
            {/* Status display */}
            <div>
              <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                Statut
              </h4>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${statusColors[currentStatus]}`} />
                <span className="text-sm text-white">{statusLabels[currentStatus]}</span>
              </div>
            </div>
            
            {/* Member since */}
            <div>
              <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                Membre depuis
              </h4>
              <p className="text-sm text-white">{memberSince}</p>
            </div>
            
            {/* Email */}
            <div>
              <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                Email
              </h4>
              <p className="text-sm text-white/80">{user.email}</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-4 flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      username: user.username,
                      avatar_url: user.avatar_url || "",
                      status: currentStatus,
                    });
                    setError(null);
                  }}
                  className="flex-1 py-2 px-4 rounded bg-[#4e5058] hover:bg-[#6d6f78] text-white text-sm font-medium transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2 px-4 rounded bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? "..." : "Sauvegarder"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2 px-4 rounded bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Modifier le profil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

