import UserService from "./service/user-service.js"
import ApiError from './exceptions/api-error.js';
import {validationResult} from 'express-validator';

export default new class AuthController{
  async registration(req, res, next){ 
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const {email, password} = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 5 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next){ 
    try {
      const {email, password} = req.query;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 5 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next){
    try {
      const authorization = req.headers.authorization;
      const refreshToken = authorization.split(' ')[1];
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 5 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUserInf(req, res, next) {
    try {
        const user = await UserService.getUserInf(req, res);
        return res.json(user);
    } catch (e) {
        next(e);
    }
  }

}