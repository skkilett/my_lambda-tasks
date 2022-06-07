import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';
import userSchema from './user-schema.js'
import tokenSchema from './token-schema.js'
dotenv.config();
export default new class Connection {

  db = null;
  url = process.env.DB_URL;
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }


  async connectToMongo(){
    if(this.db)  return this.db;
    const client = await MongoClient.connect(this.url,this.options);
    this.db = client.db("Cluster0");
    await this.createCollections();
    return this.db;
  }
  async createCollections(){
    const collectionOfUsersExists = await this.db.listCollections({name: 'users'});
    if (!collectionOfUsersExists) {
      await this.db.createCollection('users', {validator:{$jsonSchema: userSchema}});
    }
    const collectionOfTokensExists = await this.db.listCollections({name: 'tokens'});
    if (!collectionOfTokensExists) {
      await this.db.createCollection('tokens', {validator:{$jsonSchema: tokenSchema}});
    }
  }
}