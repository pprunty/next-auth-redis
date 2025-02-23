const config = {
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://next-auth-redis.vercel.app/',
  pwaIcon: '/icon.webp',
};

export default config;
