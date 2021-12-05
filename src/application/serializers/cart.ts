import { CartDTO } from "@application"
import { Cart, Customer, Product, USD } from "@domain"
import { CartItemsFactory } from "./cart-items-factory";

export const serializeCart = {
    dtoToEntity: (dto: CartDTO) => {
        return new Cart({
            id: dto.id,
            // customer: new Customer({id: dto.customerId}),
            totalPrice: new USD(dto.totalPrice),
            totalQuantity: dto.totalQuantity,
            items: CartItemsFactory(dto.items)
        });
    },

    entityToDTO: (cart: Cart) => {
        const dto: CartDTO = {
            id: cart.id,
            // customerId: cart.getCustomer().id,
            totalPrice: cart.getTotalPrice().toString(),
            totalQuantity: cart.getTotalQuantity(),
            items: cart.getItems().map(item => ({
                quantity: item.getQuantity(), 
                productId: item.getProduct().id
            }))
        };
        return dto;
    }
}