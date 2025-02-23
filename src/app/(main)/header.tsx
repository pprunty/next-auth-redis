import Link from 'next/link';
import Image from 'next/image';
import UserButton from './user-button';
import ThemeSwitcher from '@/app/components/theme-toggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/icon.webp" alt="Logo" width={35} height={35} />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </header>
  );
}
