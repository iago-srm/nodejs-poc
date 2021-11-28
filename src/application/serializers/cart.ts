import { CartDTO } from "@application"
import { Cart, Product } from "@domain"

export const serializeCart: (dto: CartDTO) => Cart = (dto) => {
    return new Cart({
        ...dto,
    })
}