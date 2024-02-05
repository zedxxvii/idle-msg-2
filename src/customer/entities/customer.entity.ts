import { Exclude, classToPlain, instanceToPlain } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity(
    {
        
    }
)
export class Customer {
    /**
     * this decorator will help to auto generate id for the table.
     */
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: true })
    name?: string;

    @Column({ type: 'varchar', length: 15 , unique: true})
    username: string;

    @Column({ type: 'varchar', length: 40, nullable: true , unique: true})
    email?: string;

    @Column({ type: 'varchar' })
    @Exclude({ toPlainOnly: true })
    password?: string;

    @Column({ default: 0 })
    balance: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    toJSON() {
        return instanceToPlain(this);
      }
}
