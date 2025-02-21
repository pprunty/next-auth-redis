import { signIn, signOut } from '../../auth';

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <button type="submit" {...props}>
        Sign In
      </button>
    </form>
  );
}

export function SignOut(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className="w-full"
    >
      <button type="submit" className="w-full p-0" {...props}>
        Sign Out
      </button>
    </form>
  );
}
