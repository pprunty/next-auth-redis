import Image from 'next/image';
import { auth } from '../../auth';
import { SignIn, SignOut } from './auth-components';

import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

export default async function UserButton() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm sm:inline-flex">
        {session.user.email}
      </span>
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name ?? 'User'}
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <InitialsAvatar
          name={session.user.name || session.user.email || 'User'}
        />
      )}
      <SignOut className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" />
    </div>
  );
}
