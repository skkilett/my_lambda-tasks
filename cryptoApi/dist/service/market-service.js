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
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../db"));
const cryptoMap = new Map;
exports.default = new class MarketService {
    parseCoinMarketCapData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < data.length; i++) {
                const symbol = data[i].symbol;
                const price = data[i].quote.USD.price;
                yield this.putDataIntoCryptoMap(symbol, price, 'CoinMarketCap');
            }
        });
    }
    getDataFromCoinMarketCap() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios_1.default.get(process.env.COIN_MARKET_CAP_URL, {
                headers: {
                    'X-CMC_PRO_API_KEY': '7522bf7b-04e3-4eda-975d-742cdf9cbae3'
                }
            });
            yield this.parseCoinMarketCapData(data.data.data);
        });
    }
    getDataFromCoinStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios_1.default.get(process.env.COIN_STATS_URL, {
                headers: {}
            });
            yield this.parseCoinStatsData(data.data.coins);
        });
    }
    parseCoinStatsData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < data.length; i++) {
                const symbol = data[i].symbol;
                const price = data[i].price;
                yield this.putDataIntoCryptoMap(symbol, price, 'CoinStats');
            }
        });
    }
    getDataFromCoinPaprika() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios_1.default.get(process.env.COIN_PAPRIKA_URL, {
                headers: {}
            });
            yield this.parseCoinPaprikaData(data.data);
        });
    }
    parseCoinPaprikaData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < data.length; i++) {
                const symbol = data[i].symbol;
                const price = data[i].quotes.USD.price;
                yield this.putDataIntoCryptoMap(symbol, price, 'CoinPaprika');
            }
        });
    }
    getAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getDataFromCoinMarketCap();
            yield this.getDataFromCoinStats();
            yield this.getDataFromCoinPaprika();
        });
    }
    findAveragePriceOfMarkets(CoinMarketCapPrice, CoinStatsPrice, CoinPaprikaPrice, mapSize) {
        return (CoinMarketCapPrice + CoinStatsPrice + CoinPaprikaPrice) / mapSize;
    }
    parseCryptoMapElement(marketPrice, cryptoSymbol) {
        const name = cryptoSymbol;
        let CoinMarketCapPrice = marketPrice.get('CoinMarketCap');
        if (!CoinMarketCapPrice) {
            CoinMarketCapPrice = 0;
        }
        let CoinStatsPrice = marketPrice.get('CoinStats');
        if (!CoinStatsPrice) {
            CoinStatsPrice = 0;
        }
        let CoinPaprikaPrice = marketPrice.get('CoinPaprika');
        if (!CoinPaprikaPrice) {
            CoinPaprikaPrice = 0;
        }
        const mapSize = marketPrice.size;
        const averagePrice = this.findAveragePriceOfMarkets(CoinMarketCapPrice, CoinStatsPrice, CoinPaprikaPrice, mapSize);
        const query = `INSERT INTO crypto (cryptoName, CoinMarketCap, CoinStats, CoinPaprika, averagePrice)
      VALUES ("${name}", "${CoinMarketCapPrice}", "${CoinStatsPrice}", "${CoinPaprikaPrice}", "${averagePrice}")`;
        return query;
    }
    putDataInDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getAllData();
            yield db_1.default.Connect()
                .then(connection => {
                cryptoMap.forEach((marketPrice, cryptoSymbol) => __awaiter(this, void 0, void 0, function* () {
                    db_1.default.Query(connection, this.parseCryptoMapElement(marketPrice, cryptoSymbol));
                }));
            });
            cryptoMap.clear();
        });
    }
    putDataIntoCryptoMap(symbol, price, marketName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cryptoMap.has(symbol)) {
                cryptoMap.get(symbol).set(marketName, price);
            }
            else {
                const marketPriceMap = new Map;
                marketPriceMap.set(marketName, price);
                cryptoMap.set(symbol, marketPriceMap);
            }
        });
    }
    updateData() {
        try {
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield this.putDataInDB();
            }), 30000);
        }
        catch (e) {
            console.log(e);
        }
    }
};
