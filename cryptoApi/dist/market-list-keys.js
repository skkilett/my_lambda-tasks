"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class MarketReqParams {
    constructor() {
        this.MarketList = new Map([
            ["CoinMarketCap", "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"],
            ["CoinBase", "https://developers.coinbase.com/api/v2?javascript#introduction"],
            ["CoinStats", "https://documenter.getpostman.com/view/5734027/RzZ6Hzr3"],
            ["Kucoin", "https://docs.kucoin.com/#general"],
            ["CoinPaprika", "https://api.coinpaprika.com/"]
        ]);
        this.MarketKeys = new Map([
            ["CoinMarketCap", "7522bf7b-04e3-4eda-975d-742cdf9cbae3"],
            ["CoinBase", "https://developers.coinbase.com/api/v2?javascript#introduction"],
            ["CoinStats", "https://documenter.getpostman.com/view/5734027/RzZ6Hzr3"],
            ["Kucoin", "https://docs.kucoin.com/#general"],
            ["CoinPaprika", "https://api.coinpaprika.com/"]
        ]);
    }
};
