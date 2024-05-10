import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Merchant } from './merchant.entity';


@Entity({name: 'sensedia_data_queues'})
export class Sensedia_Data_Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text'})
  payload: string;

  @Column()
  reference_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ type: 'simple-array', default: ['active'] })
  status: string[];

  @OneToOne(() => Merchant)
  @JoinColumn()
  merchant: Merchant;

  constructor() {
    if (!this.id) {
      this.id = uuidv4(); // Asignar un UUID cuando se crea una nueva instancia
    }
  }
}