import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './role.entity';

@Entity({name: 'merchants'})
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // name: string;

  // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // created: Date;

  // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // updated: Date;

  // @Column({ type: 'simple-array', default: ['active'] })
  // status: string[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4(); // Asignar un UUID cuando se crea una nueva instancia
    }
  }
}