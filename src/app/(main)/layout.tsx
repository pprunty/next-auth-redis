// /app/(site)/layout.tsx
import Header from './header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-6 z-[100] pt-3 md:pt-6 min-h-screen max-w-2xl m-auto">
      <Header />
      {children}
    </main>
  );
}
