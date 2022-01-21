import {
    CartDTO,
    CartItemDTO,
    CustomerDTO,
    ProductDTO
} from '.';

export interface ICartRepository {
    getCartById: (id: string) => Promise<CartDTO>;
    insertNewCart: (args: CartDTO) => Promise<CartDTO>;
    editCart: (args: CartDTO) => Promise<CartDTO>;
}

export interface ICustomerRepository {
    getCustomerById: (id: string) => Promise<CustomerDTO>;
}

export interface IProductRepository {
    getProducts: () => Promise<ProductDTO[]>;
    // getProductsByIds: (ids: string[]) => Promise<ProductDTO[]>;
    getProductById: (id: string) => Promise<ProductDTO>;
  }