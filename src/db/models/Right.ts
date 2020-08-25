import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
class Right extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: false, length: 50 })
  public name!: string;
}

export default Right;
