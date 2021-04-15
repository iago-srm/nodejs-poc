import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    COMMON = "common",
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
      type: "enum",
      enum: UserRole,
      default: UserRole.COMMON
  })
  role: UserRole

  @CreateDateColumn({type: "timestamp"})
  createdAt?: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt?: Date;
}