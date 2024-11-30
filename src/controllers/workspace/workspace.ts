import { Router } from "express";
import { workspaceService } from "../../services/workspace/workspace";
import { authenticateToken } from "../../middlewares/authentication/authentication";

const workspaceRouter = Router();

workspaceRouter.post(
  "/create",
  authenticateToken,
  async (request, response) => {
    const res = await workspaceService.createWorkspace(request.body);

    response.status(res.status).json({
      message: res.message,
    });
  }
);

workspaceRouter.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({ message: "ID do workspace é obrigatório." });
      return;
    }

    const result = await workspaceService.deleteWorkspace(id);

    if (result) {
      response.status(200).json({ message: "Workspace deletado com sucesso!" });
    } else {
      response.status(404).json({ message: "Workspace não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao deletar o workspace:", error.message);
    response
      .status(500)
      .json({ message: "Erro interno do servidor.", error: error.message });
  }
});

export default workspaceRouter;
