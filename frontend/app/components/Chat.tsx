export function Chat() {
  return (
    <div className="flex-1 flex justify-center items-stretch py-10 text-white">
      <section className="w-full max-w-[1100px] flex flex-col bg-black/35 min-h-[calc(100vh-5rem)]">
        {/* Header */}
        <header className="p-5 border-b-2 border-cyberCyan text-base">
          <h1>
            Welcome to{" "}
            <span className="text-[#ff3b3b] font-bold">HELLO WORLD</span>{" "}
            messaging platform
          </h1>
        </header>

        {/* Messages area */}
        <div className="flex-1 flex items-center justify-center tracking-[3px] opacity-60">
          <p>CONVERSATION</p>
        </div>

        {/* Input */}
        <footer className="p-4 border-t-2 border-cyberCyan">
          <input
            type="text"
            placeholder="ENTER A MESSAGE"
            className="w-full p-3 bg-black/60 border-2 border-cyberCyan text-white outline-none placeholder:text-white/50 focus:shadow-[0_0_8px_rgba(79,223,255,0.4)]"
          />
        </footer>
      </section>
    </div>
  );
}
