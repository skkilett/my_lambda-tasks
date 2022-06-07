import Router from 'express';
import AuthController from './controller.js'
import {body} from 'express-validator'
import authMiddleware from './middlewares/auth-middleware.js';

const router = new Router();

router.post('/sign_up', async (req, res, next)=>{
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 30}),
  await AuthController.registration(req, res, next);
}); 

router.post('/login', async (req, res, next)=>{
  await AuthController.login(req, res, next);
}); 

router.post('/refresh', async (req, res, next)=>{
  await AuthController.refresh(req, res, next);
}); 

router.get(`/me[0-9]`, authMiddleware, async (req, res)=>{
  await AuthController.getUserInf(req, res);
}); 


export default router;