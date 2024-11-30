import { AppDataSource } from "../../../data-source";
import { IUser, User } from "../../entities/User";
import { hashPassword } from "../../utils/hash";

class UserService {
  async createUser({
    active,
    created_at,
    email,
    id,
    role,
    name,
    updated_at,
    password,
    occupation,
  }: IUser): Promise<string> {
    const user = {
      active,
      created_at,
      email,
      id,
      role,
      name,
      updated_at,
      password,
      occupation,
    };
    user.password = await hashPassword(password);
    try {
      const userRepository = AppDataSource.getRepository(User);
      await userRepository.save(user);
      return "ok";
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const result = await userRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error.message);
      throw new Error(error.message);
    }
  }
}

export const userService = new UserService();
