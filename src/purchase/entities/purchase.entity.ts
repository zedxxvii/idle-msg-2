import { Customer } from 'src/customer/entities/customer.entity';
import { Item } from 'src/item/entities/item.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer, customer => customer.id)
    customer: Customer;

    @ManyToOne(type => Item, item => item.id)
    item: Item;

    @Column({default: false})
    isPaid: boolean;

    @Column()
    gameID: String;

    @Column()
    payment_ref: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}
