import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Workspace } from "./Workspace";
import { Category } from "./Category";

export enum UserRole {
  ADMIN = "admin",
  LEADER = "leader",
  MEMBER = "member",
}

export interface IUser {
  id: number;
  publicId: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  occupation: UserOccupation;
  status: UserStatus;
}

export enum UserOccupation {
  PRODUCT_MANAGER = "Product Manager",
  PRODUCT_DESIGNER = "Product Designer",
  PRODUCT_ANALYST = "Product Analyst",
  FRONTEND_DEVELOPER = "Front-end Developer",
  BACKEND_DEVELOPER = "Back-end Developer",
  FULLSTACK_DEVELOPER = "Fullstack Developer",
  DEVOPS_ENGINEER = "DevOps Engineer",
  QA_ENGINEER = "QA Engineer",
  MARKETING_MANAGER = "Marketing Manager",
  UX_RESEARCHER = "UX Researcher",
  UX_WRITER = "UX Writer",
  DATA_SCIENTIST = "Data Scientist",
  OTHER = "Other",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "uuid", unique: true, generated: "uuid" })
  publicId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: "enum", enum: UserRole, nullable: true })
  role: UserRole;

  @Column({ type: "enum", enum: UserOccupation, nullable: true })
  occupation: UserOccupation;

  @OneToMany(() => Workspace, (workspace) => workspace.owner)
  workspaces: Workspace[];

  @OneToMany(() => Category, (category) => category.owner)
  categories: Category[];

  @Column({ type: "timestamp", nullable: true })
  deleted_at: Date | null;

  @Column({ type: "enum", enum: UserStatus })
  status: UserStatus;
}
