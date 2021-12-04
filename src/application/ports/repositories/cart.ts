export type CartItemDTO = {
  productId: string;
  quantity: number;
}

export type CartDTO = {
  id: string;
  customerId: string;
  totalQuantity: number;
  totalPrice: string;
  items: CartItemDTO[];
};

export type getCartParams = {
  cartId: string;
}

export interface ICartRepository {
  getCart: (args: getCartParams) => Promise<CartDTO>;
  insertNewCart: (args: CartDTO) => Promise<CartDTO>;
  editCart: (args: CartDTO) => Promise<CartDTO>;
}