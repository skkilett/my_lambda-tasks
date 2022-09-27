import { Timestamp } from "./timestamp-interface";

interface Price {
    [index: number]: number;
}
export interface ResInterface {
    cryptoName: string;
    marketName?: string;
    timestamp?: Timestamp;
    price: Price;
}
