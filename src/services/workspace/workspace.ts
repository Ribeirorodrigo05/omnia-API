import { AppDataSource } from "../../../data-source";
import { Workspace } from "../../entities/Workspace";

class WorkspaceService {
  async createWorkspace({ name, description, creator }) {
    const workspace = {
      name,
      description,
      created_by: creator,
    };
    try {
      const workspaceRepository = AppDataSource.getRepository(Workspace);
      await workspaceRepository.save(workspace);
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
