import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { hash } from "bcrypt";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = createAccountBodySchema.parse(body);

    const emailAlreadyExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new ConflictException("User with same email already exists.");
    }

    const hashedPassword = await hash(password, 8);

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
