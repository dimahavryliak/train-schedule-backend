import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  departure: string;

  @Column()
  arrival: string;

  @Column()
  date: Date;
}
