import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

export class Metrics extends BaseEntity {
  @Column({ length: 50 })
  type!: string;

  @Column()
  value!: number;

  @Column({ length: 50 })
  unit!: string;

  @PrimaryColumn()
  timestamp!: number;
}

@Entity()
export class CpuMetrics extends Metrics {}

@Entity()
export class MemoryMetrics extends Metrics {}
