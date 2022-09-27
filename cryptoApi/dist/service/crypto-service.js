"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
exports.default = new class CryptoService {
    getCryptoByMarketName(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketName = reqData.marketName;
            const cryptoName = reqData.cryptoName;
            if (reqData.hasOwnProperty('timestamp')) {
                const startTime = reqData.timestamp.startTime;
                const endTime = reqData.timestamp.endTime;
                const queryWithTimestamp = `SELECT ${marketName} as price FROM crypto WHERE timestamp BETWEEN '${startTime}' AND '${endTime}' AND cryptoName = ${cryptoName}`;
                const data = yield db_1.default.Connect()
                    .then(connection => {
                    const result = db_1.default.Query(connection, queryWithTimestamp);
                    return result;
                });
                return data;
            }
            else {
                const query = `SELECT ${marketName} as price FROM crypto WHERE timestamp = (SELECT MAX(timestamp) FROM crypto WHERE cryptoName = ${cryptoName})AND cryptoName = ${cryptoName}`;
                const data = yield db_1.default.Connect()
                    .then(connection => {
                    const result = db_1.default.Query(connection, query);
                    return result;
                });
                return data;
            }
        });
    }
    getCryptoByName(reqData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cryptoName = reqData.cryptoName;
            if (reqData.hasOwnProperty('timestamp')) {
                const startTime = reqData.timestamp.startTime;
                const endTime = reqData.timestamp.endTime;
                const queryWithTimestamp = `SELECT averagePrice as price FROM crypto WHERE timestamp BETWEEN '${startTime}' AND '${endTime}' AND cryptoName = ${cryptoName}`;
                const data = yield db_1.default.Connect()
                    .then(connection => {
                    const result = db_1.default.Query(connection, queryWithTimestamp);
                    return result;
                });
                return data;
            }
            else {
                const query = `SELECT averagePrice as price FROM crypto WHERE timestamp = (SELECT MAX(timestamp) FROM crypto WHERE cryptoName = ${cryptoName})AND cryptoName = ${cryptoName}`;
                const data = yield db_1.default.Connect()
                    .then(connection => {
                    const result = db_1.default.Query(connection, query);
                    return result;
                });
                return data;
            }
        });
    }
};
