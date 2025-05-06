import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../../utils/hash";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

class AuthenticationService {
  /**
   * Realiza o login de um usuário.
   * @param email E-mail do usuário.
   * @param password Senha do usuário.
   * @returns Token JWT ou erro.
   */
  async login(email: string, password: string): Promise<string> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas.");
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }
}

export const authenticationService = new AuthenticationService();
