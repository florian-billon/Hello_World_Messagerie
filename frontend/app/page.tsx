"use client";
import { useState } from "react";
import Image from "next/image";
import { logout } from "@/lib/auth/actions";
import { useServers, useChannels, useMessages, useMembers, useAuth } from "@/hooks";

/**
 * Page principale - Design Original Cyberpunk
 * Layout: LEFT SIDEBAR (260px) | CENTER CHAT | RIGHT SIDEBAR (260px)
 */
export default function Home() {
  const { user } = useAuth();
  const {
    servers,
    selectedServer,
    selectServer,
    createServer,
    loading: serversLoading,
    error: serversError,
  } = useServers();

  const { channels, selectedChannel, selectChannel, createChannel, loading: channelsLoading, error: channelsError } = useChannels(
    selectedServer?.id ?? null
  );

  const { messages, sendMessage, loading: messagesLoading, error: messagesError } = useMessages(selectedChannel?.id ?? null);
  const { members } = useMembers(selectedServer?.id ?? null);

  const [showCreateServer, setShowCreateServer] = useState(false);
  const [newServerName, setNewServerName] = useState("");
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [messageInput, setMessageInput] = useState("");

  // Style des boutons action (rouge + bordure cyan)
  const actionBtn = "w-full p-[10px] bg-[#a00000] border-2 border-[#4fdfff] text-white font-bold cursor-pointer rounded-lg text-[13px] uppercase transition-all duration-300 hover:bg-[#c00000] hover:shadow-[0_0_12px_rgba(79,223,255,0.8)] hover:scale-[1.02] active:scale-[0.98]";

  // Handlers
  const handleCreateServer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServerName.trim()) return;
    const server = await createServer(newServerName.trim());
    if (server) {
      setNewServerName("");
      setShowCreateServer(false);
    }
  };

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelName.trim()) return;
    await createChannel(newChannelName.trim());
    setNewChannelName("");
    setShowCreateChannel(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    await sendMessage(messageInput.trim());
    setMessageInput("");
  };

  if (serversLoading) {
    return (
      <main className="flex w-full h-screen gap-2 p-2 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[#4fdfff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#4fdfff] font-mono text-sm tracking-widest animate-pulse">
            INITIALIZING SYSTEM...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full h-screen gap-2 p-2">
      
      {/* ========== LEFT SIDEBAR - ORIGINAL STYLE ========== */}
      <aside className="w-[260px] p-5 bg-[rgba(20,20,20,0.85)] backdrop-blur-[12px] flex flex-col border-r-2 border-[#4fdfff] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-fade-in" style={{ animationDelay: '0.1s' }}>
        
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Hello World logo"
          width={150}
          height={150}
          className="max-w-full mb-5 drop-shadow-[0_0_10px_rgba(79,223,255,0.5)] mx-auto"
        />

        {/* User info */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-black/30 rounded-lg border border-[#4fdfff]/30">
          <div className="w-8 h-8 rounded-full bg-[#4fdfff]/20 border border-[#4fdfff]/50 flex items-center justify-center">
            <span className="text-[#4fdfff] text-xs font-bold">
              {user?.username?.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.username || "Guest"}</p>
            <p className="text-[10px] text-[#4fdfff] font-mono">CONNECTED</p>
          </div>
          <button
            onClick={() => logout()}
            className="p-1.5 text-[#ff3333] hover:bg-[#ff3333]/20 rounded transition-colors"
            title="Deconnexion"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-[10px] mb-4">
          <button onClick={() => setShowCreateServer(true)} className={actionBtn}>
            + CREATE SERVER
          </button>
        </div>

        {/* Servers & Channels list */}
        <nav className="flex-1 overflow-y-auto">
          <h4 className="text-[12px] tracking-wider uppercase text-[#4fdfff] mt-[15px] mb-[6px] font-bold">
            SERVERS ({servers.length})
          </h4>
          
          {servers.length === 0 ? (
            <p className="text-[14px] text-white/40 italic">No server yet</p>
          ) : (
            <ul className="list-none space-y-1">
              {servers.map((server) => (
                <li key={server.id}>
                  <button
                    onClick={() => selectServer(server)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      selectedServer?.id === server.id
                        ? "bg-[#4fdfff]/20 text-[#4fdfff] border border-[#4fdfff]/50"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-[14px] font-bold">{server.name}</span>
                  </button>

                  {/* Channels sous le serveur sélectionné */}
                  {selectedServer?.id === server.id && (
                    <div className="ml-3 mt-1 border-l-2 border-[#4fdfff]/30 pl-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-white/50 uppercase tracking-wider">Channels</span>
                        <button
                          onClick={() => setShowCreateChannel(true)}
                          className="text-[#4fdfff] hover:text-white text-xs"
                        >
                          +
                        </button>
                      </div>
                      {channelsLoading ? (
                        <p className="text-[12px] text-white/40">Loading...</p>
                      ) : channelsError ? (
                        <p className="text-[12px] text-[#ff3333]">{channelsError}</p>
                      ) : channels.length === 0 ? (
                        <p className="text-[12px] text-white/40 italic">No channel</p>
                      ) : (
                        channels.map((channel) => (
                          <button
                            key={channel.id}
                            onClick={() => selectChannel(channel)}
                            className={`w-full text-left px-2 py-1 rounded text-[13px] transition-all flex items-center gap-1 ${
                              selectedChannel?.id === channel.id
                                ? "text-[#4fdfff] bg-[#4fdfff]/10"
                                : "text-white/60 hover:text-white/90"
                            }`}
                          >
                            <span className="text-white/40">#</span>
                            {channel.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </nav>
      </aside>

      {/* ========== CENTER CHAT - ORIGINAL STYLE ========== */}
      <div className="flex-1 flex justify-center items-stretch p-0">
        <section className="w-full max-w-[1100px] flex flex-col bg-[rgba(20,20,20,0.85)] backdrop-blur-[12px] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-fade-in" style={{ animationDelay: '0.2s' }}>
          
          {/* Header */}
          <header className="p-5 border-b-2 border-[#4fdfff]">
            <h1 className="text-white font-bold text-[16px]">
              {selectedChannel ? (
                <>
                  <span className="text-white/40">#</span> {selectedChannel.name}
                  <span className="text-white/40 ml-3 text-sm font-normal">in {selectedServer?.name}</span>
                </>
              ) : selectedServer ? (
                <>
                  <span className="text-[#ff3b3b]">{selectedServer.name}</span>
                  <span className="text-white/40 ml-3 text-sm font-normal">- Select a channel</span>
                </>
              ) : (
                <>
                  Welcome to <span className="text-[#ff3b3b] font-bold drop-shadow-[0_0_8px_rgba(255,59,59,0.6)]">HELLO WORLD</span> messaging platform
                </>
              )}
            </h1>
          </header>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4">
            {!selectedChannel ? (
              <div className="h-full flex items-center justify-center tracking-[3px]">
                <div className="text-center">
                  <p className="text-[#ff3b3b] text-4xl font-bold italic tracking-[6px] mb-4 animate-pulse drop-shadow-[0_0_20px_rgba(255,59,59,0.4)]">
                    HELLO WORLD
                  </p>
                  <p className="text-white/40 text-2xl font-bold uppercase">
                    {selectedServer ? "SELECT A CHANNEL" : "SELECT A SERVER"}
                  </p>
                </div>
              </div>
            ) : messagesLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-[#4fdfff] animate-pulse">Loading messages...</p>
              </div>
            ) : messagesError ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-[#ff3333]">{messagesError}</p>
              </div>
            ) : Array.isArray(messages) && messages.length > 0 ? (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4fdfff]/30 to-[#ff3333]/20 border-2 border-[#4fdfff]/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#4fdfff] font-bold">
                        {msg.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#4fdfff]">
                          {msg.username}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          {new Date(msg.created_at).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-white leading-relaxed break-words">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#4fdfff]/10 border-2 border-[#4fdfff]/30 flex items-center justify-center mb-4">
                  <span className="text-4xl text-[#4fdfff]">#</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Welcome to #{selectedChannel.name}
                </h4>
                <p className="text-white/40 text-sm">
                  This is the beginning. Send a message!
                </p>
              </div>
            )}
          </div>

          {/* Message input */}
          {selectedChannel && (
            <footer className="p-[15px] border-t-2 border-[#4fdfff]">
              <form onSubmit={handleSendMessage}>
                <input 
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message #${selectedChannel.name}`}
                  className="w-full p-3 bg-[rgba(31,31,31,0.9)] border-2 border-[#4fdfff] text-white font-bold outline-none rounded-lg placeholder:text-white/50 focus:shadow-[0_0_12px_rgba(79,223,255,0.6)] transition-all duration-300"
                />
              </form>
            </footer>
          )}
        </section>
      </div>

      {/* ========== RIGHT SIDEBAR - MEMBERS ========== */}
      <aside className="w-[260px] p-5 bg-[rgba(20,20,20,0.85)] backdrop-blur-[12px] flex flex-col border-l-2 border-[#4fdfff] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-fade-in" style={{ animationDelay: '0.3s' }}>
        
        <h3 className="text-[12px] tracking-wider uppercase text-[#4fdfff] mt-[15px] mb-[6px] font-bold">
          MEMBERS {selectedServer && `(${members.length})`}
        </h3>

        {!selectedServer ? (
          <p className="text-[14px] text-white/40 italic">Select a server</p>
        ) : members.length === 0 ? (
          <p className="text-[14px] text-white/40 italic">No members</p>
        ) : (
          <>
            {/* Owners */}
            {members.filter((m) => m.role === "Owner").length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] text-[#ff3333] font-bold mb-2 tracking-wider uppercase">
                  OWNER
                </p>
                {members
                  .filter((m) => m.role === "Owner")
                  .map((member) => (
                    <div
                      key={member.user_id}
                      className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff3333]/30 to-[#4fdfff]/20 border-2 border-[#ff3333]/50 flex items-center justify-center">
                          <span className="text-[#ff3333] text-xs font-bold">U</span>
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[rgba(20,20,20,0.85)] rounded-full" />
                      </div>
                      <span className="text-sm text-white/80 truncate">
                        {member.user_id.slice(0, 8)}...
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {/* Regular members */}
            {members.filter((m) => m.role !== "Owner").length > 0 && (
              <div>
                <p className="text-[10px] text-white/50 font-bold mb-2 tracking-wider uppercase">
                  MEMBERS
                </p>
                {members
                  .filter((m) => m.role !== "Owner")
                  .map((member) => (
                    <div
                      key={member.user_id}
                      className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-[#4fdfff]/10 border border-[#4fdfff]/30 flex items-center justify-center">
                          <span className="text-[#4fdfff] text-xs font-bold">U</span>
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-500 border-2 border-[rgba(20,20,20,0.85)] rounded-full" />
                      </div>
                      <span className="text-sm text-white/60 truncate">
                        {member.user_id.slice(0, 8)}...
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}

        {/* Server info section */}
        {selectedServer && (
          <div className="mt-auto pt-4 border-t border-[#4fdfff]/30">
            <h3 className="text-[12px] tracking-wider uppercase text-[#4fdfff] mb-2 font-bold">
              SERVER INFO
            </h3>
            <p className="text-[14px] text-white/80">{selectedServer.name}</p>
            <p className="text-[10px] text-white/40 font-mono mt-1">
              ID: {selectedServer.id.slice(0, 8)}...
            </p>
          </div>
        )}
      </aside>

      {/* ========== MODAL CREATE SERVER ========== */}
      {showCreateServer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCreateServer(false)} />
          <div className="relative bg-[rgba(20,20,20,0.98)] border-2 border-[#4fdfff] rounded-xl p-6 w-full max-w-md shadow-[0_0_40px_rgba(79,223,255,0.3)]">
            <h2 className="text-xl font-bold text-center text-white mb-1">CREATE SERVER</h2>
            <p className="text-center text-white/50 text-sm mb-6">
              Your server will be your discussion space
            </p>
            {serversError && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
                {serversError}
              </div>
            )}
            <form onSubmit={handleCreateServer}>
              <label className="block text-[10px] font-bold text-[#4fdfff] tracking-widest uppercase mb-2">
                SERVER NAME
              </label>
              <input
                type="text"
                value={newServerName}
                onChange={(e) => setNewServerName(e.target.value)}
                placeholder="My Server"
                autoFocus
                className="w-full px-4 py-3 bg-black/50 border-2 border-[#4fdfff]/50 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#4fdfff] focus:shadow-[0_0_10px_rgba(79,223,255,0.3)] mb-6 transition-all"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateServer(false)}
                  className="flex-1 py-2.5 text-white/60 hover:text-white hover:underline transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newServerName.trim()}
                  className={actionBtn}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL CREATE CHANNEL ========== */}
      {showCreateChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCreateChannel(false)} />
          <div className="relative bg-[rgba(20,20,20,0.98)] border-2 border-[#4fdfff] rounded-xl p-6 w-full max-w-md shadow-[0_0_40px_rgba(79,223,255,0.3)]">
            <h2 className="text-xl font-bold text-center text-white mb-1">CREATE CHANNEL</h2>
            <p className="text-center text-white/50 text-sm mb-6">
              in {selectedServer?.name}
            </p>
            <form onSubmit={handleCreateChannel}>
              <label className="block text-[10px] font-bold text-[#4fdfff] tracking-widest uppercase mb-2">
                CHANNEL NAME
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">#</span>
                <input
                  type="text"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  placeholder="general"
                  autoFocus
                  className="w-full pl-8 pr-4 py-3 bg-black/50 border-2 border-[#4fdfff]/50 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#4fdfff] focus:shadow-[0_0_10px_rgba(79,223,255,0.3)] mb-6 transition-all"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateChannel(false)}
                  className="flex-1 py-2.5 text-white/60 hover:text-white hover:underline transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newChannelName.trim()}
                  className={actionBtn}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
