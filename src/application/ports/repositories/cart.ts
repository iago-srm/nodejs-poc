type addProductsParams = {
    productIds: [string];
    cartId: string;
}

export interface ICartRepository {
    addProducts: (inputs: addProductsParams) => Promise<void>;
}