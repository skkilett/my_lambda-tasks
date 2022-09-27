import { Timestamp } from "./timestamp-interface";

export interface ReqInterface {
    cryptoName: string;
    marketName?: string;
    timestamp?: Timestamp;
    
}

