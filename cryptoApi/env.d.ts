declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        DB_NAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_USER: string;
        COIN_MARKET_CAP_URL: string;
        COIN_BASE_URL: string;
        COIN_STATS_URL: string;
        COIN_PAPRIKA_URL: string;
      }
    }
  }
  
  export {}

