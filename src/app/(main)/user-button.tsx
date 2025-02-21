import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { auth } from '../../auth';
import { SignIn } from './auth-components';

export default async function UserButton() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm sm:inline-flex">
        {session.user.email}
      </span>
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={
            session.user.image ??
            `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 100000) + 1}&randomizeIds=true`
          }
          alt={session.user.name ?? 'User'}
        />
        <AvatarFallback>{session.user.name?.charAt(0) ?? 'U'}</AvatarFallback>
      </Avatar>
    </div>
  );
}
