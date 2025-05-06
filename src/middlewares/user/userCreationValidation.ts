import { Request, Response, NextFunction } from "express";
import { UserOccupation, UserRole, UserStatus } from "../../entities/User";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  status: z.nativeEnum(UserStatus),
});

export function userCreationValidation(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const validatedData = UserSchema.parse(request.body);
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
