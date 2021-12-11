import { ProductDTO } from '../ports';
import { Product } from '@domain';

export const serializeProduct: (dto: ProductDTO) => Product = (dto) => {
    return new Product({
        ...dto,
    });
};
