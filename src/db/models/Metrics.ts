import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

export class Metric extends BaseEntity {
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
export class CpuMetric extends Metric {}

@Entity()
export class MemoryMetric extends Metric {}
