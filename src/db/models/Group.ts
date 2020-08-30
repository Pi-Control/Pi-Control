import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from './User';
import Right from './Right';

@Entity()
class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: false, length: 50 })
  public name!: string;

  @Column({ default: false })
  public isAdmin!: boolean;

  @OneToMany(() => User, (user) => user.group)
  public users!: User;

  @ManyToMany(() => Right)
  @JoinTable()
  public rights!: Right[];

  @CreateDateColumn()
  public readonly createdAt?: Date;

  @UpdateDateColumn()
  public readonly updatedAt?: Date;

  @DeleteDateColumn()
  public readonly deleteddAt?: Date;
}

export default Group;
