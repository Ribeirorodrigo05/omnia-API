import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Workspace } from "./Workspace";

export enum UserRole {
  ADMIN = "admin",
  LEADER = "leader",
  MEMBER = "member",
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  occupation: UserOccupation;
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

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @Column()
  active: boolean;

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;

  @Column({ type: "enum", enum: UserOccupation })
  occupation: UserOccupation;

  @OneToMany(() => Workspace, (workspace) => workspace.owner)
  workspaces: Workspace[];
}
