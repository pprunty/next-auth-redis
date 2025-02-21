// /app/auth/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="p-6 min-h-screen">{children}</main>;
}
