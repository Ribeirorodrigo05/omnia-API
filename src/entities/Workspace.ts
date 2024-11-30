import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  owner: User;
  created_at: Date;
  updated_at: Date;
}

@Entity()
export class Workspace implements IWorkspace {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.workspaces, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
