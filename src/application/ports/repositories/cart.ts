export type CartItemDTO = {
    productId: string;
    quantity: number;
};

export type CartDTO = {
    id: string;
    // customerId: string;
    totalQuantity: number;
    totalPrice: string;
    items: CartItemDTO[];
};

export interface ICartRepository {
    getCartById: (id: string) => Promise<CartDTO>;
    insertNewCart: (args: CartDTO) => Promise<CartDTO>;
    editCart: (args: CartDTO) => Promise<CartDTO>;
}
