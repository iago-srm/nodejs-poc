import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { CartDTO } from "./cart";

@Entity("customers")
export class CustomerDTO {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    cartId: string;
    @OneToOne(() => CartDTO, cart => cart.customer)
    cart?: CartDTO;
};

