// import Image from 'next/image';
import SessionData from '@/app/components/session-data';
import { auth } from '../../auth';

export default async function Home() {
  const session = await auth();
  return (
    <div className="items-center justify-items-center min-h-screen">
      <SessionData session={session} />
    </div>
  );
}
