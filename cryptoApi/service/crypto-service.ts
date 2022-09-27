import { ReqInterface } from "../interfaces/request-interface";
import DbConnection from '../db'

export default new class CryptoService {
  async getCryptoByMarketName(reqData: ReqInterface) {
    const marketName: string = reqData.marketName!;
    const cryptoName: string = reqData.cryptoName!;
    if (reqData.hasOwnProperty('timestamp')) {
      const startTime: string = reqData.timestamp!.startTime;
      const endTime: string = reqData.timestamp!.endTime;
      const queryWithTimestamp = `SELECT ${marketName} as price FROM crypto WHERE timestamp BETWEEN '${startTime}' AND '${endTime}' AND cryptoName = ${cryptoName}`;
      const data = await DbConnection.Connect()
      .then(connection => {
        const result = DbConnection.Query(connection, queryWithTimestamp);
        return result;
      })
      return data;
    }else {
      const query = `SELECT ${marketName} as price FROM crypto WHERE timestamp = (SELECT MAX(timestamp) FROM crypto WHERE cryptoName = ${cryptoName})AND cryptoName = ${cryptoName}`;
      const data = await DbConnection.Connect()
      .then(connection => {
        const result = DbConnection.Query(connection, query);
        return result;
      })
      return data;  
    }
  }

  async getCryptoByName(reqData: ReqInterface) {
    const cryptoName: string = reqData.cryptoName!;
    if (reqData.hasOwnProperty('timestamp')) {
      const startTime: string = reqData.timestamp!.startTime;
      const endTime: string = reqData.timestamp!.endTime;
      const queryWithTimestamp = `SELECT averagePrice as price FROM crypto WHERE timestamp BETWEEN '${startTime}' AND '${endTime}' AND cryptoName = ${cryptoName}`;
      const data = await DbConnection.Connect()
      .then(connection => {
        const result = DbConnection.Query(connection, queryWithTimestamp);
        return result;
      })
      return data;
    }else {
      const query = `SELECT averagePrice as price FROM crypto WHERE timestamp = (SELECT MAX(timestamp) FROM crypto WHERE cryptoName = ${cryptoName})AND cryptoName = ${cryptoName}`;
      const data = await DbConnection.Connect()
      .then(connection => {
        const result = DbConnection.Query(connection, query);
        return result;
      })  
      return data;
    }
  }


}