import config from '../config';

export async function fetchUserProfile(id: string) {
  // Use an environment variable for your site’s URL or default to localhost
  const baseUrl = config.url;
  console.log(baseUrl);
  const res = await fetch(`${baseUrl}/api/users/${id}`);
  if (!res.ok) {
    throw new Error(`Error fetching user profile for id ${id}`);
  }
  const data = await res.json();
  return data.user;
}

// lib/nextAuth.ts
export async function fetchNextAuthData() {
  const res = await fetch('https://next-auth-redis.vercel.app/');
  if (!res.ok) {
    throw new Error('Error fetching data from next-auth-redis');
  }
  const data = await res.json();
  return data;
}
