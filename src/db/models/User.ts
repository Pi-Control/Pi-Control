import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  public readonly createdAt?: Date;

  @DeleteDateColumn()
  public readonly updatedAt?: Date;
}

export default User;
