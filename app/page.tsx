import Image from "next/image";
import { getUser, logout } from "@/lib/auth/actions"; // Importation des actions
import { redirect } from "next/navigation";

export default async function Home() {
  // 1. Récupération de l'utilisateur via le token dans les cookies
  const user = await getUser();

  // 2. Si aucun utilisateur n'est connecté, redirection vers le login
  if (!user) {
    redirect("/auth/register"); // Ou /login selon votre préférence
  }

  const actionBtn = "p-[10px] bg-[#a00000] border-2 border-[#4fdfff] text-black font-bold cursor-pointer rounded-[4px] text-[13px] transition-all duration-200 hover:bg-[#c00000] hover:shadow-[0_0_8px_rgba(79,223,255,0.6)]";

  return (
    <main className="flex w-full h-screen bg-[#121212] text-white">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-[260px] p-5 bg-white/10 flex flex-col border-r-2 border-[#4fdfff]">
        <Image
          src="/logo.png"
          alt="Hello World logo"
          width={150}
          height={150}
          className="max-w-full mb-5"
        />
        
        {/* Affichage du pseudo de l'utilisateur */}
        <div className="mb-6 p-3 border border-[#4fdfff] bg-black/40 rounded">
          <p className="text-[10px] text-[#4fdfff] uppercase tracking-widest">Connecté en tant que</p>
          <p className="text-lg font-bold text-[#ff3b3b]">{user.username}</p>
        </div>

        <button className={actionBtn}>+ NEW MESSAGE</button>

        <nav className="flex-1">
          <h4 className="text-[12px] tracking-[1px] mt-[15px] mb-[6px]">HISTORIQUE</h4>
          <ul className="list-none text-white/60">
            <li className="text-[14px] my-[6px]">Canaux récents...</li>
          </ul>
        </nav>

        {/* BOTTOM BUTTONS */}
        <div className="mt-auto flex flex-col gap-[10px]">
          <button className={actionBtn}>CREATE SERVER</button>
          
          {/* Bouton de déconnexion utilisant l'action logout */}
          <form action={logout}>
            <button type="submit" className="w-full text-xs text-white/40 hover:text-white underline transition-all">
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      {/* CENTER CHAT */}
      <div className="flex-1 flex justify-center items-stretch p-0">
        <section className="w-full max-w-[1100px] flex flex-col bg-white/5">
          <header className="p-5 border-b-2 border-[#4fdfff] flex justify-between items-center">
            <h1 className="text-lg">
              Welcome to <span className="text-[#ff3b3b] font-bold text-xl uppercase">Hello World</span>
            </h1>
            <span className="text-[#4fdfff] text-xs animate-pulse">● Serveur Online</span>
          </header>

          <div className="flex-1 flex items-center justify-center tracking-[3px] opacity-40">
            <p className="text-xl">SÉLECTIONNEZ UNE CONVERSATION</p>
          </div>

          <footer className="p-[15px] border-t-2 border-[#4fdfff]">
            <input 
              type="text" 
              placeholder={`ÉCRIRE EN TANT QUE ${user.username.toUpperCase()}...`} 
              className="w-full p-3 bg-black/20 border-2 border-[#4fdfff] text-white font-bold outline-none focus:bg-black/40 transition-all"
            />
          </footer>
        </section>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="w-[260px] p-5 bg-white/10 flex flex-col border-l-2 border-[#4fdfff]">
        <h3 className="text-[12px] tracking-[1px] mt-[15px] mb-[6px] text-[#4fdfff]">MEMBRES EN LIGNE</h3>
        <ul className="list-none">
          <li className="text-[14px] my-[6px] flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {user.username} (Vous)
          </li>
        </ul>
      </aside>
    </main>
  );
}