import { 
    IAddToCartUseCase
} from '@application';
import { IController } from '../ports';

const CartPostFactory = (addToCartUseCase: IAddToCartUseCase) => {
    const fn: IController = async (params, body) => {
        const cartId = params.cartId;
        const productId = body.productId;
        const newQuantity = body.newQuantity;
        const customerId = body.customerId;
    
        await addToCartUseCase.execute({
            cartId,
            productId,
            newQuantity,
            customerId
        })
    
        return {
            response: "",
            statusCode: 201
        };
    }
        
    return fn;
}

export default CartPostFactory;