import { ConnectionOptions, Connection, getConnection, createConnection } from "typeorm";
import 'reflect-metadata';
import { User } from "../entity/index";

export const config: ConnectionOptions = {
  database: "passfolio",
  type: "mysql",
  name: "passfolio",
  port: 3306,
  host: "127.0.0.1",
  username: "root",
  password: "damilolo10",
  synchronize: true,
  logging: false,
  entities: [
    User
  ],
};

export const connect = async() => {
  let connection: Connection;

  try {
    connection = getConnection(config.name);
  }catch(error) {
    connection = await createConnection(config);
  }
  return connection;
}