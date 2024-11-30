import { Router } from "express";
import { userCreationValidation } from "../../middlewares/user/userCreationValidation";
import { userService } from "../../services/user/userServices";

const userRouter = Router();

userRouter.post(
  "/create",
  userCreationValidation,
  async (request, response) => {
    const res = await userService.createUser(request.body);
    response.json({ message: res });
  }
);

userRouter.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await userService.deleteUser(id);
    if (result) {
      response.status(200).json({ message: "Usuário deletado com sucesso!" });
    } else {
      response.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    response
      .status(500)
      .json({ message: "Erro ao deletar o usuário.", error: error.message });
  }
});

export default userRouter;
