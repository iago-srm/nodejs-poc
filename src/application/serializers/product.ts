import { ProductDTO } from "@application"
import { Product } from "@domain"

export const serializeProduct: (dto: ProductDTO) => Product = (dto) => {
    return new Product({
        ...dto,
    })
}