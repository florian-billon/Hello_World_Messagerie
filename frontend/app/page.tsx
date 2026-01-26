import { Sidebar, Chat, MembersSidebar } from "./components";

export default function Home() {
  return (
    <main className="relative w-screen h-screen">
      {/* Main flex layout */}
      <div className="flex w-full h-screen">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Chat */}
        <Chat />

        {/* Right Sidebar */}
        <MembersSidebar />
      </div>
    </main>
  );
}
