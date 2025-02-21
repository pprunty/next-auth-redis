import Link from 'next/link';
import UserButton from './user-button';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2">
      <h1 className="text-lg font-mono">
        <Link href="/">next-auth-redis</Link>
      </h1>
      <UserButton />
    </header>
  );
}
