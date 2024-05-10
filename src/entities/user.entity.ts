import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './role.entity';
import { Merchant } from './merchant.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique:true})
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ type: 'simple-array', default: ['active'] })
  status: string[];

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @OneToOne(() => Merchant)
  @JoinColumn()
  merchant: Merchant;

  constructor() {
    if (!this.id) {
      this.id = uuidv4(); // Asignar un UUID cuando se crea una nueva instancia
    }
  }
}