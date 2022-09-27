import JSONValue from "../types/json-type";
import { Request, Response } from 'express';
import axios from "axios";
import DbConnection from '../db'
import { DbTableInterface } from "../interfaces/db-table-interface";


const cryptoMap = new Map<string, Map<string, number>>;


export default new class MarketService {

  async parseCoinMarketCapData(data: any) {
    for (let i = 0; i < data.length; i++) {
      const symbol: string = data[i].symbol;
      const price: number = data[i].quote.USD.price;
      await this.putDataIntoCryptoMap(symbol, price, 'CoinMarketCap')
    }
  }

  async getDataFromCoinMarketCap(){
    const data = await axios.get(process.env.COIN_MARKET_CAP_URL, {
      headers: {
        'X-CMC_PRO_API_KEY': '7522bf7b-04e3-4eda-975d-742cdf9cbae3'!
      }
    });
    await this.parseCoinMarketCapData(data.data.data);
  }

  

  async getDataFromCoinStats(){
    const data = await axios.get(process.env.COIN_STATS_URL, {
      headers: {
      }
    });
    await this.parseCoinStatsData(data.data.coins);
  }

  async parseCoinStatsData(data: any){
    for (let i = 0; i < data.length; i++) {
      const symbol: string = data[i].symbol;
      const price: number = data[i].price;
      await this.putDataIntoCryptoMap(symbol, price, 'CoinStats')
    }
  }

  


  async getDataFromCoinPaprika() {
    const data = await axios.get(process.env.COIN_PAPRIKA_URL, {
      headers: {
      }
    });
    await this.parseCoinPaprikaData(data.data);
  }

  async parseCoinPaprikaData(data: any){
    for (let i = 0; i < data.length; i++) {
      const symbol: string = data[i].symbol;
      const price: number = data[i].quotes.USD.price;
      await this.putDataIntoCryptoMap(symbol, price, 'CoinPaprika')
    }
  }

  async getAllData() {
    await this.getDataFromCoinMarketCap();
    await this.getDataFromCoinStats();
    await this.getDataFromCoinPaprika();
    
  }

  findAveragePriceOfMarkets(CoinMarketCapPrice: number, CoinStatsPrice: number, CoinPaprikaPrice: number, mapSize: number) {
    return (CoinMarketCapPrice + CoinStatsPrice + CoinPaprikaPrice)/mapSize;
  }

  parseCryptoMapElement(marketPrice: Map<string, number>, cryptoSymbol: string){
    const name: string = cryptoSymbol;
    let CoinMarketCapPrice: number | undefined = marketPrice.get('CoinMarketCap');
    if (!CoinMarketCapPrice) {
      CoinMarketCapPrice = 0;
    }
    let CoinStatsPrice: number | undefined = marketPrice.get('CoinStats');
    if (!CoinStatsPrice) {
      CoinStatsPrice = 0;
    }
    let CoinPaprikaPrice: number | undefined = marketPrice.get('CoinPaprika');
    if (!CoinPaprikaPrice) {
      CoinPaprikaPrice = 0;
    }
    const mapSize: number = marketPrice.size;
    const averagePrice: number = this.findAveragePriceOfMarkets(CoinMarketCapPrice, CoinStatsPrice, CoinPaprikaPrice, mapSize);
    const query: string = 
      `INSERT INTO crypto (cryptoName, CoinMarketCap, CoinStats, CoinPaprika, averagePrice)
      VALUES ("${name}", "${CoinMarketCapPrice}", "${CoinStatsPrice}", "${CoinPaprikaPrice}", "${averagePrice}")`
    return query;
  }
  
  async putDataInDB(){
    await this.getAllData();
    await DbConnection.Connect()
    .then(connection => {
      cryptoMap.forEach(async (marketPrice, cryptoSymbol) => {
        DbConnection.Query<DbTableInterface>(connection, this.parseCryptoMapElement(marketPrice, cryptoSymbol))
      })
    }) 
    cryptoMap.clear();
  }


  async putDataIntoCryptoMap(symbol: string, price: number, marketName: string){
    if(cryptoMap.has(symbol)) {
      cryptoMap.get(symbol)!.set(marketName, price);
      
    }else {
      const marketPriceMap = new Map<string, number>;
      marketPriceMap.set(marketName, price);
      cryptoMap.set(symbol, marketPriceMap);
    }
  }
  

  updateData() {
    try {
      setInterval(async() => {
        await this.putDataInDB();
      }, 30000);
    } catch (e) {
      console.log(e);
    }
  }
}