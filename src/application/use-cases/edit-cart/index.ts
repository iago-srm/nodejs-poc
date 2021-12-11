import {
    IUseCaseFactory,
    IUseCase,
    ICartRepository,
    IProductRepository,
    ICustomerRepository,
    ProductDTO,
    CartDTO,
} from '../../ports';
import { Cart, Product, CartItem, USD, Customer } from '@domain';
import { serializeCart } from '../../serializers';
import {
    DatabaseError,
    ProductNotFoundError,
    ObjectNotFoundError,
    CartNotFoundError,
    CartDoesNotBelongToCustomerError,
} from '@common/errors';

export type InputParams = {
    productId: string;
    newQuantity: number;
    cartId: string;
    customerId: string;
};
type Return = CartDTO;
type Dependencies = {
    cartRepository: ICartRepository;
    productRepository: IProductRepository;
    customerRepository: ICustomerRepository;
};

export type IAddToCartUseCase = IUseCase<InputParams, Return>;
export type IAddToCartUseCaseFactory = IUseCaseFactory<
    Dependencies,
    InputParams,
    Return
>;

// TODO: add possibility of different currencies
const EditCartUseCaseFactory: IAddToCartUseCaseFactory = ({
    cartRepository,
    productRepository,
    customerRepository,
}) => {
    return {
        execute: async (inputs) => {
            let cartDTO: CartDTO;
            let productDTO: ProductDTO;
            try {
                cartDTO = await cartRepository.getCartById(inputs.cartId);
            } catch (e) {
                if (e instanceof ObjectNotFoundError)
                    throw new CartNotFoundError();
                throw e;
            }
            const customerDTO = await customerRepository.getCustomerById(
                inputs.customerId
            );
            try {
                productDTO = await productRepository.getProductById(
                    inputs.productId
                );
            } catch (e) {
                if (e instanceof ObjectNotFoundError)
                    throw new ProductNotFoundError();
                throw e;
            }

            const cart = serializeCart.dtoToEntity(cartDTO);
            const customer = new Customer({
                id: customerDTO.id,
                cart: new Cart({ id: customerDTO.cartId }),
            });

            if (!customer.isOwnCart(cart)) {
                throw new CartDoesNotBelongToCustomerError();
            }
            const product = new Product({ ...productDTO });
            const newCartItem: CartItem = new CartItem({
                product,
                quantity: inputs.newQuantity,
            });
            cart.insertProducts(newCartItem);

            const newCartDTO = serializeCart.entityToDTO(cart);

            try {
                await cartRepository.editCart(newCartDTO);
            } catch (e) {
                throw new DatabaseError();
            }

            return newCartDTO;
        },
    };
};

export default EditCartUseCaseFactory;
