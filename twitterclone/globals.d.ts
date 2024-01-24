declare module "jsonwebtoken" {
  export interface JwtPayload {
    id: number;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "dev" | "prod";
      JWT_SECRET: string;
      BCRYPT_WORK_FACTOR: string;
      TEST_BCRYPT_WORK_FACTOR: string;
    }
  }
}

export {};
