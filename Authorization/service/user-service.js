import Connection from '../db/conn.js'
import * as bcrypt from 'bcrypt'
import TokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exceptions/api-error.js';
import { ObjectId } from 'mongodb';

export default new class UserService{
  async registration (email, password){
    const candidate = await Connection.db.collection('users').findOne({email});
    if (candidate) {
      throw ApiError.BadRequest('User with such email is already exist')
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await Connection.db.collection('users').insertOne({
      email: email,
      password: hashPassword
    })
    const model = await Connection.db.collection('users').findOne({email});
    const userDto = new UserDto(model);
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }

  async login (email, password){
    const user = await Connection.db.collection('users').findOne({email});
    if (!user) {
      throw ApiError.BadRequest('No user with such email')
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password');
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
        throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }
    const user = await Connection.db.collection('users').findOne({_id: new ObjectId(`${userData.id}`)});
    console.log(user);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async getUserInf(req, res){
    const numOfReq = req.url.slice(-1);
    const user = req.user.email;
    return {numOfReq, user};
  }

}