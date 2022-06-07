import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Connection from '../db/conn.js'

dotenv.config();

export default new class TokenService{
  generateTokens(payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '20s'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '5h'});
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken){
    const tokenData = await Connection.db.collection('tokens').findOne({user: userId});
    if (tokenData) {
      Connection.db.collection('tokens').updateOne(
        {user: userId},
        {$set: {refreshToken: refreshToken}});
    }
    const token = await Connection.db.collection('tokens').insertOne({
      user: userId,
      refreshToken: refreshToken
    })
    return token;
  }
  validateAccessToken(token) {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return userData;
    } catch (e) {
        return null;
    }
  }

  validateRefreshToken(token) {
    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return userData;
    } catch (e) {
        return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await Connection.db.collection('tokens').findOne({refreshToken});
    return tokenData;
  }
  
}