import { CartItem, Product } from '@domain';

export const CartItemsFactory = (args: {
    productId: string;
    quantity: number;
}[] = []
): CartItem[] => {
    let cartItems: CartItem[] = [];
    for(let item of args) {
        let cartItem: CartItem;
        const product = new Product({id: item.productId});
        try {
            cartItem = new CartItem({
                product,
                quantity: item.quantity
            });
        } catch {
            throw new Error("Quantidade de produto inválida.")
        }
        cartItems.push(cartItem);
    }
    return cartItems;
}