import Router from 'express';
import GetLocationController from './controller.js'
const router = new Router();

router.get('/userLocation', async (req,res)=>{
  res.send(await GetLocationController.getLocation(req,res));
});

export default router;