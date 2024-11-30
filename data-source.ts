import { DataSource } from "typeorm";
import { User } from "./src/entities/User";
import { Workspace } from "./src/entities/Workspace";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5005,
  username: "postgres",
  password: "omnia2024",
  database: "omnia",
  synchronize: true,
  logging: false,
  entities: [User, Workspace],
  subscribers: [],
  migrations: [],
});
