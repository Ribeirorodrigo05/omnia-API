import { Request, Response, NextFunction } from "express";

import { z } from "zod";
import { WorkspaceStatus } from "../../entities/Workspace";

const WorkspaceSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().min(2, "Descrição deve ter pelo menos 2 caracteres"),
  creator: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  status: z.nativeEnum(WorkspaceStatus),
});

export function userCreationValidation(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const validatedData = WorkspaceSchema.parse(request.body);
    request.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status(400).json({
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
  }
}
