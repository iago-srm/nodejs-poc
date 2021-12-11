import EditCartUseCaseFactory from './index';
import {
    IUseCaseFactory,
    IUseCase,
    ICartRepository,
    IProductRepository,
    ICustomerRepository,
    ProductDTO,
    CartDTO,
    CustomerDTO,
} from '../../ports';
import { Cart, Product, CartItem, USD, Customer } from '@domain';
import {
    DatabaseError,
    ProductNotFoundError,
    ObjectNotFoundError,
    CartNotFoundError,
    CartDoesNotBelongToCustomerError,
} from '@common/errors';
import { InputParams } from '..';

const makeSUT = (args: {
    cartRepository?: ICartRepository;
    productRepository?: IProductRepository;
    customerRepository?: ICustomerRepository;
}) => {
    return EditCartUseCaseFactory({
        cartRepository: args.cartRepository || {
            getCartById: jest.fn(),
            insertNewCart: jest.fn(),
            editCart: jest.fn(),
        },
        productRepository: args.productRepository || {
            getProducts: jest.fn(),
            getProductById: jest.fn(),
        },
        customerRepository: args.customerRepository || {
            getCustomerById: jest.fn(),
        },
    });
};

const testDataBuilder = {
    getCustomerDTO: ({ id = '1', cartId = '1' }): CustomerDTO => {
        return {
            id,
            cartId,
        };
    },

    getCartDTO: ({
        id = '1',
        totalPrice = '1USD',
        totalQuantity = 1,
        items = [],
    }): CartDTO => {
        return {
            id,
            totalPrice,
            totalQuantity,
            items,
        };
    },

    getSUTInput: ({
        productId = '1',
        newQuantity = 1,
        cartId = '1',
        customerId = '1',
    }): InputParams => {
        return {
            productId,
            newQuantity,
            cartId,
            customerId,
        };
    },
};
describe('Edit cart use case', () => {
    it('Should call cartRepository.getCart exactly once', () => {
        const cartRepository = {
            getCartById: jest.fn(),
            insertNewCart: jest.fn(),
            editCart: jest.fn(),
        };
        const sut = makeSUT({ cartRepository });
        sut.execute({
            productId: '1',
            newQuantity: 1,
            customerId: '1',
            cartId: '1',
        });
        expect(cartRepository.getCartById).toHaveBeenCalledTimes(1);
    });

    it('Should call customerRepository.getCustomer exactly once', () => {
        const customerRepository = {
            getCustomerById: jest.fn(),
        };
        const sut = makeSUT({ customerRepository });
        sut.execute({
            productId: '1',
            newQuantity: 1,
            customerId: '1',
            cartId: '1',
        });
        expect(customerRepository.getCustomerById).toHaveBeenCalledTimes(1);
    });

    it('Should call productRepository.getProductById exactly once', () => {
        const productRepository = {
            getProducts: jest.fn(),
            getProductById: jest.fn(),
            getProductsByIds: jest.fn(),
        };
        const sut = makeSUT({ productRepository });
        sut.execute({
            productId: '1',
            newQuantity: 1,
            customerId: '1',
            cartId: '1',
        });
        expect(productRepository.getProductById).toHaveBeenCalledTimes(1);
    });

    it('Should throw ProductNotFoundError if getProductById throws ObjectNotFoundError', () => {
        const productRepository = {
            getProductById: jest.fn(() => {
                throw new ObjectNotFoundError();
            }),
            getProducts: jest.fn(),
            getProductsByIds: jest.fn(),
        };
        const sut = makeSUT({ productRepository });
        expect(sut.execute).toThrow(ProductNotFoundError);
    });

    it('Should rethrow error if getProductById throws any other error', () => {
        const error = new Error('this is a different error');
        const productRepository = {
            getProductById: jest.fn(() => {
                throw error;
            }),
            getProducts: jest.fn(),
            getProductsByIds: jest.fn(),
        };
        const sut = makeSUT({ productRepository });
        expect(sut.execute).toThrow(error);
    });

    it('Should throw CartNotFoundError if getCartById throws ObjectNotFoundError', () => {
        const cartRepository = {
            getCartById: jest.fn(() => {
                throw new ObjectNotFoundError();
            }),
            insertNewCart: jest.fn(),
            editCart: jest.fn(),
        };
        const sut = makeSUT({ cartRepository });
        expect(sut.execute).toThrow(CartNotFoundError);
    });

    it('Should rethrow error if getCartById throws any other error', () => {
        const error = new Error('this is a different error');
        const cartRepository = {
            getCartById: jest.fn(() => {
                throw error;
            }),
            insertNewCart: jest.fn(),
            editCart: jest.fn(),
        };
        const sut = makeSUT({ cartRepository });
        expect(sut.execute).toThrow(error);
    });

    it('Should throw a CartDoesNotBelongToCustomerError if cart does not belong to customer', async () => {
        const customerRepository = {
            getCustomerById: jest.fn<Promise<CustomerDTO>, [string]>(
                () =>
                    new Promise((res) =>
                        res(
                            testDataBuilder.getCustomerDTO({
                                id: '1',
                                cartId: '2',
                            })
                        )
                    )
            ),
        };
        const cartRepository = {
            getCartById: jest.fn<Promise<CartDTO>, [string]>(
                () =>
                    new Promise((res) =>
                        res(testDataBuilder.getCartDTO({ id: '1' }))
                    )
            ),
            insertNewCart: jest.fn(),
            editCart: jest.fn(),
        };

        const sut = makeSUT({
            customerRepository,
            cartRepository,
        });

        expect(sut.execute).toThrow(CartDoesNotBelongToCustomerError);
    });

    it('Should return a cart.', () => {});
});
