const userSchema =  {
  required: [ "email", "password"],
  properties: {
    email: { bsonType: "string" },
    password: { bsonType: "string" }
  }
}


export default userSchema;