import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()

export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column("decimal", {
    default: 100.000,
    precision: 6,
    scale: 3,
  })
  credit: number;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isPlainPasswordValid(plainPassword: string) {
    return bcrypt.compareSync(plainPassword, this.password);
  }
}