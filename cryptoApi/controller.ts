import { Request, Response } from 'express';
import CryptoService from './service/crypto-service'
import { ReqInterface } from "./interfaces/request-interface";

export default new class CryptoController {

  async getCrypto(req: Request, res: Response) {
    const reqData: ReqInterface = req.body;
    if (reqData.hasOwnProperty('marketName')) {
      return await CryptoService.getCryptoByMarketName(reqData);
    }
    else {
      return await CryptoService.getCryptoByName(reqData);
    }
    
  }

}