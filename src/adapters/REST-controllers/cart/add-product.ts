import { IAddToCartUseCase } from '@application/use-cases';
import { IHTTPController, IHTTPControllerDescriptor } from '../ports';

const addProductControllerFactory = ({
    editCartUseCase,
}: {
    editCartUseCase: IAddToCartUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (params, body) => {
        const cartId = params.cartId;
        const productId = body.productId;
        const newQuantity = Number.parseInt(body.newQuantity, 10);
        const customerId = body.customerId;

        if (isNaN(newQuantity))
            throw new Error('Quantidade informada não é um número.');

        await editCartUseCase.execute({
            cartId,
            productId,
            newQuantity,
            customerId,
        });

        return {
            response: '',
            statusCode: 201,
        };
    };

    return {
        controller: fn,
        method: 'post',
        path: [
            { resource: 'cart', isParams: false },
            { resource: 'cartId', isParams: true },
        ],
    };
};

export default addProductControllerFactory;
