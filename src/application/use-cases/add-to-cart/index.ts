import { 
    IUseCaseFactory, 
    IUseCase, 
    ICartRepository, 
    IProductRepository, 
    ProductDTO,
    CartDTO
} from '../../ports';
import { Cart, Product, CartItem, USD, Customer } from '@domain';
import { CartItemsFactory } from './cart-items-factory';
import { isTemplateExpression } from 'typescript';
// import { serializeProduct, serializeCart } from '../../serializers';

type InputParams = {
    items: {
        productId: string;
        quantity: number;
    }[]
    cartId: string;
    customerId: string;
}

type Return = void;
type Dependencies = {
    cartRepository: ICartRepository;
    productRepository: IProductRepository;
}
export type IAddToCartUseCase = IUseCase<InputParams, Return>;

export type IAddToCartUseCaseFactory = IUseCaseFactory<Dependencies,InputParams,Return>;

// TODO: add possibility of different currencies
const AddToCartUseCaseFactory: IAddToCartUseCaseFactory = ({cartRepository, productRepository}) => {
    return { 
        execute: async (inputs) => {
            const cartDTO = await cartRepository.getCart({cartId: inputs.cartId});
            try{
                await productRepository.getProductsByIds(inputs.items.map(item => item.productId));
            } catch {
                throw new Error("Um dos produtos não foi encontrado");
            }

            const newCartItems: CartItem[] = CartItemsFactory(inputs.items);
            
            const cart = new Cart({
                totalPrice: new USD(cartDTO.totalPrice),
                totalQuantity: cartDTO.totalQuantity,
                items: CartItemsFactory(cartDTO.items)
            });

            cart.insertProducts(newCartItems);

            const newCartDTO: CartDTO = {
                id: cartDTO.id,
                customerId: cartDTO.customerId,
                totalPrice: cart.getTotalPrice().toString(),
                totalQuantity: cart.getTotalQuantity(),
                items: cart.getItems().map(item => ({
                    quantity: item.getQuantity(), 
                    productId: item.getProduct().id
                }))
            };
            await cartRepository.editCart(newCartDTO);
            /**
             * There should be a better pattern to implement this. Instead of fetching from db each product individually,
             * This code fetches all existing products and then all new products.
             * Then I need to restablish the relation between the product and its quantity. That`s what this function is for.
             */
            // const productToCartItem = (productsDTO: ProductDTO[],) => {

            // }
            // const serializeDTOs = (productDTOs: ProductDTO[], cartItems: CartItem[]) => {
            //     for(let item of cartDTO.items) {
            //         const productDTO = productDTOs.find(product => product.id === item.id);
            //         if(productDTO) {
            //             const product = new Product({...productDTO});
            //             cartItems.push(new CartItem({
            //                 quantity: item.quantity,
            //                 product
            //             }));
            //         } else {
            //             throw new Error();
            //         }
            //     }
            // }

            // const existingCartItems: CartItem[] = [];
            // serializeDTOs(existingProductsDTO, existingCartItems);

            // const newCartItems: CartItem[] = [];
            // serializeDTOs(newProductsDTO, newCartItems);

            // for(let item of inputs.items) {
            //     const productDTO = newProductsDTO.find(product => product.id === item.id);
            //     if(productDTO) {
            //         const product = new Product({...productDTO});
            //         newCartItems.push(new CartItem({
            //             quantity: item.quantity,
            //             product
            //         }));
            //     } else {
            //         throw new Error();
            //     }
            // }
            // const cart = new Cart({
            //     ...cartDTO,
            //     items: existingCartItems
            // });
            // cart.insertProducts(newCartItems);

            
           
        }
    }
}

export default AddToCartUseCaseFactory;
