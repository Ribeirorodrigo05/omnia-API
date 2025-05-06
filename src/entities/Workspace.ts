import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { WorkspaceMembers } from "./WorkspaceMembers";

export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  owner: User;
  created_at: Date;
  updated_at: Date;
  status: WorkspaceStatus;
}

export enum WorkspaceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Entity()
export class Workspace implements IWorkspace {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn({})
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.workspaces, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @OneToMany(() => Category, (category) => category.workspace)
  categories: Category[];

  @Column({ type: "timestamp", nullable: true })
  deleted_at: Date | null;

  @Column({ type: "enum", enum: WorkspaceStatus })
  status: WorkspaceStatus;

  @OneToMany(
    () => WorkspaceMembers,
    (workspaceMembers) => workspaceMembers.workspace
  )
  members: WorkspaceMembers[];
}
