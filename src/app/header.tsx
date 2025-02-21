import UserButton from "./user-button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2">
      <h1 className="text-lg font-mono">next-auth-redis</h1>
      <UserButton />
    </header>
  );
}
