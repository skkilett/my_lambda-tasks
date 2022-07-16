declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        DB_NAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_USER: string;
      }
    }
  }
  
  export {}

