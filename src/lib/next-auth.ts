// lib/nextAuth.ts
export async function fetchNextAuthData() {
  const res = await fetch('https://next-auth-redis.vercel.app/');
  if (!res.ok) {
    throw new Error('Error fetching data from next-auth-redis');
  }
  const data = await res.json();
  return data;
}
