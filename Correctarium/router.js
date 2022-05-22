import Router from 'express';
import OrderController from './controller.js'

const router = new Router();

router.post('/getOrderInf', async (req,res)=>{
  res.send(await OrderController.getOrderInf(req,res));
});

export default router;