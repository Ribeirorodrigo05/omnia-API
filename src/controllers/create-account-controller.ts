import { Body, ConflictException, Controller, HttpCode, Post } from "@nestjs/common";
import { hash } from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body;

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
