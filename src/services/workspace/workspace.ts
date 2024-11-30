import { AppDataSource } from "../../../data-source";
import { User } from "../../entities/User";
import { IWorkspace, Workspace } from "../../entities/Workspace";

interface CreateWorkspaceParams {
  name: string;
  description: string;
  creatorId: string;
}

class WorkspaceService {
  async createWorkspace({
    name,
    description,
    creatorId,
  }: CreateWorkspaceParams) {
    const userRepository = AppDataSource.getRepository(User);
    const owner = await userRepository.findOneBy({ id: creatorId });

    if (!owner) {
      throw new Error("Usuário não encontrado");
    }

    try {
      const workspaceRepository = AppDataSource.getRepository(Workspace);
      await workspaceRepository.save({
        name,
        owner,
        description,
      });
      return {
        status: 200,
        message: "ok",
      };
    } catch (error) {
      console.error("Error in create workspace");
      return {
        status: 504,
        message: error.message,
      };
    }
  }

  async deleteWorkspace(id: string): Promise<boolean> {
    try {
      const workspaceRepository = AppDataSource.getRepository(Workspace);
      const result = await workspaceRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      console.error("Erro ao deletar o workspace:", error.message);
      throw new Error(error.message);
    }
  }
}

export const workspaceService = new WorkspaceService();
