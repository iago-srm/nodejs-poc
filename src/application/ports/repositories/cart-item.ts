import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from "typeorm";
import { CartDTO } from ".";

@Entity("cartItems")
export class CartItemDTO {
    @PrimaryGeneratedColumn()
    id?: string;
    @Column()
    productId: string;
    @Column("int")
    quantity: number;
    @ManyToOne(() => CartDTO, cart => cart.items)
    cart?: CartDTO
};