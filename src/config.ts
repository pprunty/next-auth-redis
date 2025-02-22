const config = {
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://tmplate.xyz',
  pwaIcon: '/icon.webp',
};

export default config;
