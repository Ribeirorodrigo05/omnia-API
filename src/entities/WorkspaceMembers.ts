import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { User } from "./User";
import { Workspace } from "./Workspace";

export enum WorkspaceRole {
  MEMBER = "member",
  ADMIN = "admin",
  Guest = "guest",
}

@Entity()
export class WorkspaceMembers {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.members, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workspace_id" })
  workspace: Workspace;

  @ManyToOne(() => User, (user) => user.workspaces, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "enum", enum: WorkspaceRole, default: WorkspaceRole.MEMBER })
  role: WorkspaceRole;

  @CreateDateColumn()
  added_at: Date;
}
