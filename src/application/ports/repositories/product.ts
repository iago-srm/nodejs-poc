import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from "typeorm";

@Entity("products")
export class ProductDTO {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  imageUrl: string;
  @Column()
  category: string;
  @Column()
  specialOffer: string;
  @Column()
  discount: number;
};


