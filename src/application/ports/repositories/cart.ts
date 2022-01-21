import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from "typeorm";
import { CustomerDTO } from "./customer";
import { CartItemDTO } from '.';

@Entity("carts")
export class CartDTO {
    @PrimaryGeneratedColumn()
    id: string;
    @Column("int")
    totalQuantity: number;
    @Column()
    totalPrice: string;
    @OneToMany(() => CartItemDTO, item => item.cart)
    items?: CartItemDTO[];
    @OneToOne(() => CustomerDTO, customer => customer.cart)
    customer?: CustomerDTO;
};

