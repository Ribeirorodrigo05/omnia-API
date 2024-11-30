import { Router, Request, Response } from "express";
import { authenticationService } from "../../services/login/login";

const loginRouter = Router();

loginRouter.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      response.status(400).json({ message: "Email e senha são obrigatórios." });
      return;
    }

    const token = await authenticationService.login(email, password);

    response.status(200).json({ token });
    return;
  } catch (error) {
    console.error("Erro no login:", error.message);

    if (error.message === "Credenciais inválidas.") {
      response.status(401).json({ message: error.message });
      return;
    }

    response.status(500).json({ message: "Erro interno do servidor." });
    return;
  }
});

export default loginRouter;
