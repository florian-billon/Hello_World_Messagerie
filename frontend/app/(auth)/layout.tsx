export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background with blur effect */}
      <div className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat brightness-[0.4] contrast-[1.1] -z-10" />
      
      {/* Auth card */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

