import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import Group from './Group';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: false, length: 50 })
  public name!: string;

  @Column({ nullable: false, length: 128 })
  public password!: string;

  @Column({ nullable: true })
  public lastLoggedIn!: Date;

  @ManyToOne(() => Group, (group) => group.users)
  public group!: Group;

  @CreateDateColumn()
  public readonly createdAt?: Date;

  @UpdateDateColumn()
  public readonly updatedAt?: Date;

  @DeleteDateColumn()
  public readonly deleteddAt?: Date;
}

export default User;
