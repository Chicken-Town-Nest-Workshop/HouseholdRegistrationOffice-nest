// token.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('token_table')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  token_id: number;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ length: 50, nullable: false })
  token_type: string;

  @Column({ length: 255, nullable: false })
  token_value: string;

  @Column({ nullable: false })
  expiration_time: Date;

  @Column({ type: 'uuid', nullable: false, default: () => 'uuid_generate_v4()' })
  one_time_token: string;

  @Column({ type: 'boolean', nullable: false })
  one_time_token_disable: boolean;
}
