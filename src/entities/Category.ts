import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";
import { Workspace } from "./Workspace";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  owner: User;
  created_at: Date;
  updated_at: Date;
  workspace: Workspace;
}

@Entity("categories")
export class Category implements ICategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.categories, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.categories, {
    nullable: false,
  })
  workspace: Workspace;

  @Column({ type: "timestamp", nullable: true })
  deleted_at: Date | null;
}
