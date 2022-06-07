import { ObjectId } from 'mongodb';
const tokenSchema =  {
  required: [ "user", "refreshToken"],
  properties: {
    user: { bsonType: ObjectId},
    refreshToken: { bsonType: "string" }
  }
}


export default tokenSchema;