import Image from "next/image";

export default function Home() {
  // Classe réutilisable pour tes boutons "Action" avec animations
  const actionBtn = "p-[10px] bg-[#a00000] border-2 border-[#4fdfff] text-white font-bold cursor-pointer rounded-lg text-[13px] transition-all duration-300 hover:bg-[#c00000] hover:shadow-[0_0_12px_rgba(79,223,255,0.8)] hover:scale-[1.02] active:scale-[0.98]";

  return (
    <main className="flex w-full h-screen gap-2 p-2">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-[260px] p-5 bg-[rgba(20,20,20,0.85)] backdrop-blur-[12px] flex flex-col border-r-2 border-[#4fdfff] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Image
          src="/logo.png"
          alt="Hello World logo"
          width={150}
          height={150}
          className="max-w-full mb-5 drop-shadow-[0_0_10px_rgba(79,223,255,0.5)]"
        />
        <button className={actionBtn}>+ NEW MESSAGE</button>

        <nav className="mt-4">
          <h4 className="text-[12px] tracking-wider uppercase text-[#4fdfff] mt-[15px] mb-[6px] font-bold">HISTORIQUE</h4>
          <ul className="list-none">
            <li className="text-[14px] my-[6px] text-white/80 hover:text-white transition-colors">Messages:</li>
          </ul>
          <ul className="list-none">
            <li className="text-[14px] my-[6px] text-white/80 hover:text-white transition-colors">Servers:</li>
          </ul>
        </nav>

        {/* BOTTOM BUTTONS */}
        <div className="mt-auto flex flex-col gap-[10px]">
          <button className={actionBtn}>JOIN SERVER</button>
          <button className={actionBtn}>CREATE SERVER</button>
        </div>
      </aside>

      {/* CENTER CHAT (WRAPPER FOR CENTRING) */}
      <div className="flex-1 flex justify-center items-stretch p-0">
        <section className="w-full max-w-[1100px] flex flex-col bg-[rgba(20,20,20,0.85)] backdrop-blur-[12px] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <header className="p-5 border-b-2 border-[#4fdfff] text-[16px]">
            <h1 className="text-white font-bold">
              Welcome to <span className="text-[#ff3b3b] font-bold drop-shadow-[0_0_8px_rgba(255,59,59,0.6)]">HELLO WORLD</span> messaging platform
            </h1>
          </header>

          <div className="flex-1 flex items-center justify-center tracking-[3px]">
            <p className="text-white/40 text-2xl font-bold uppercase animate-pulse">CONVERSATION</p>
          </div>

          <footer className="p-[15px] border-t-2 border-[#4fdfff]">
            <input 
              type="text" 
              placeholder="ENTER A MESSAGE" 
              className="w-full p-3 bg-[rgba(31,31,31,0.9)] border-2 border-[#4fdfff] text-white font-bold outline-none rounded-lg placeholder:text-white/50 focus:outline-2 focus:outline-[#ff0000] focus:shadow-[0_0_12px_rgba(79,223,255,0.6)] transition-all duration-300"
            />
          </footer>
        </section>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="w-[260px] p-5 bg-[rgba(20,20,20,0.85)] backdrop-blur-[12px] flex flex-col border-l-2 border-[#4fdfff] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-[12px] tracking-wider uppercase text-[#4fdfff] mt-[15px] mb-[6px] font-bold">MEMBERS</h3>
        <ul className="list-none">
          <li className="text-[14px] my-[6px] text-white/80 hover:text-white transition-colors cursor-pointer">Member 1</li>
          <li className="text-[14px] my-[6px] text-white/80 hover:text-white transition-colors cursor-pointer">Member 2</li>
        </ul>

        <h3 className="text-[12px] tracking-wider uppercase text-[#4fdfff] mt-[15px] mb-[6px] font-bold">CONTACT</h3>
        <button className={actionBtn}>Details</button>
      </aside>
    </main>
  );
}