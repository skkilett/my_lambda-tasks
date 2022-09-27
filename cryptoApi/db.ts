import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();




export default new class DbConnection {

  params = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
  }

  Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
      const connection = mysql.createConnection(this.params);
        connection.connect((error: any) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(connection);
        });
    });

  Query = async <T>(connection: mysql.Connection, query: string) =>
    new Promise<T>((resolve, reject) => {
      connection.query(query, connection, (error: any, result: any) => {
        if (error) {
          reject(error);
          return;
        }
    
        resolve(result);
      });
  });        

}