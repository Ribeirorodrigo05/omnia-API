import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import {
  IWorkspace,
  Workspace,
  WorkspaceStatus,
} from "../../entities/Workspace";

interface CreateWorkspaceParams {
  name: string;
  description: string;
  creatorId: string;
  status: WorkspaceStatus;
}

class WorkspaceService {
  async createWorkspace({
    name,
    description,
    creatorId,
    status,
  }: CreateWorkspaceParams) {
    const userRepository = AppDataSource.getRepository(User);
    const owner = await userRepository.findOneBy({ publicId: creatorId });

    if (!owner) {
      throw new Error("Usuário não encontrado");
    }

    try {
      const workspaceRepository = AppDataSource.getRepository(Workspace);
      await workspaceRepository.save({
        name,
        owner,
        description,
        status,
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

  async getWorkspaces(id: string): Promise<IWorkspace> {
    try {
      const workspaceRepository = AppDataSource.getRepository(Workspace);
      const workspace = await workspaceRepository.findOneBy({ id });
      return workspace;
    } catch (error) {
      console.error("Error in get workspaces:", error.message);
      throw new Error(error.message);
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
