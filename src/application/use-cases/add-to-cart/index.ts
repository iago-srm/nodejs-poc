import { IUseCaseFactory, IUseCase, ICartRepository } from '../../ports';

type InputParams = {
    productIds: [string];
    cartId: string;
}

type Return = void;

export type IAddToCartUseCase = IUseCase<InputParams, Return>;
export type IAddToCartUseCaseFactory = IUseCaseFactory<ICartRepository,InputParams,Return>;

export const AddToCartUseCaseFactory: IAddToCartUseCaseFactory = (cartRepository) => {
    return { 
        execute: async (inputs) => {
            await cartRepository.addProducts(inputs);
        }
    }
}
