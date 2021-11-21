import { 
    IAddToCartUseCase
} from '@application';
import { IController } from '../ports';

const CartPostFactory = (addToCartUseCase: IAddToCartUseCase) => {
    const fn: IController = async (params, body) => {
        const cartId = params.cartId;
        const productIds = body.products;
    
        await addToCartUseCase.execute({
            cartId,
            productIds
        })
    
        return {
            response: "",
            statusCode: 201
        };
    }
        
    return fn;
}

export default CartPostFactory;