import OrderService from './service.js';

export default new class OrderController{
  async getOrderInf(req, res){
    const language = req.body.language;
    const fileType = req.body.filetype;
    const count = req.body.count;

    return OrderService.resJson(language,fileType,count);
  }
} 

