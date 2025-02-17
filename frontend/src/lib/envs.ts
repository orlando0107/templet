export const MyEnvs = {
  NODE_ENV: process.env.NODE_ENV,
  BACKEND: process.env.NEXT_PUBLIC_API_URL as string,
  NEXTJS: process.env.NEXT_PUBLIC_APP_URL as string,
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_FROM: process.env.EMAIL_FROM,
  SERVER_HOST: process.env.EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
  SECRET_PASSWORD: process.env.SECRET_PASSWORD as string,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

console.log("Variables de Entorno", MyEnvs.NODE_ENV)
