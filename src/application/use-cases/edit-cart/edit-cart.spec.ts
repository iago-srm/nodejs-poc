import EditCartUseCaseFactory from './index';
import {
    ICartRepository,
    IProductRepository,
    ICustomerRepository,
    CartDTO,
    CustomerDTO,
    ProductDTO
} from '../../ports';
import {
    ProductNotFoundError,
    ObjectNotFoundError,
    CartNotFoundError,
    CartDoesNotBelongToCustomerError,
} from '@common/errors';
import { InputParams } from '..';
import { 
    testDataHelper
} from '@common/test-helpers';



const testDataBuilder = () => {
    const cartRepository = {
        getCartById: jest.fn(() => new Promise<CartDTO>((res,_) => res({id: '1', totalPrice: '1', totalQuantity: 0, items: []}))),
        insertNewCart: jest.fn(),
        editCart: jest.fn(),
    };
    const productRepository = {
        getProducts: jest.fn(),
        getProductById: jest.fn(() => new Promise<ProductDTO>((res,_) => res({
            id: '1',
            description: 'descr',
            imageUrl: 'url',
            discount: 9,
            specialOffer: 'special',
            name: 'name',
            category: 'category'
        }))),
    };
    const customerRepository = {
        getCustomerById: jest.fn(() => new Promise<CustomerDTO>((res,_) => res({id: '1', cartId: '1'})))
    };
    const makeSUT = (args: {
        cartRepository?: ICartRepository;
        productRepository?: IProductRepository;
        customerRepository?: ICustomerRepository;
    }) => {
        return EditCartUseCaseFactory({
            cartRepository: args.cartRepository || cartRepository,
            productRepository: args.productRepository || productRepository,
            customerRepository: args.customerRepository || customerRepository
        });
    };
    const getSUTInput = (
        productId = '1',
        newQuantity = 1,
        cartId = '1',
        customerId = '1',
    ): InputParams => {
        return {
            productId,
            newQuantity,
            cartId,
            customerId,
        };
    };
    const clearMocks = () => {
        const repositories = [customerRepository, cartRepository, productRepository];
        for (let repository of repositories) {
            for(let mockFn in repository) {
                repository[mockFn].mockClear();
            }
        }
    }
    return {
        makeSUT,
        getSUTInput,
        customerRepository,
        cartRepository,
        productRepository,
        clearMocks
    }
};
describe('Edit cart use case', () => {
    const dataBuilder = testDataBuilder();
    it('Should call cartRepository.getCartById exactly once', () => {

        const sut = dataBuilder.makeSUT({});
        sut.execute(dataBuilder.getSUTInput());
        const mockFunction = dataBuilder.cartRepository.getCartById;
        expect(mockFunction).toHaveBeenCalledTimes(1);
        dataBuilder.clearMocks();
    });

    it('Should call customerRepository.getCustomerById exactly once', () => {

        const sut = dataBuilder.makeSUT({});
        sut.execute(dataBuilder.getSUTInput());
        const mockFunction = dataBuilder.customerRepository.getCustomerById;
        expect(mockFunction).toHaveBeenCalledTimes(1);
        dataBuilder.clearMocks();

    });

    it('Should call productRepository.getProductById exactly once', () => {
        const sut = dataBuilder.makeSUT({});
        sut.execute(dataBuilder.getSUTInput());
        const mockFunction = dataBuilder.productRepository.getProductById;
        expect(mockFunction).toHaveBeenCalledTimes(1);
        dataBuilder.clearMocks();

    });

    it('Should throw ProductNotFoundError if getProductById throws ObjectNotFoundError', () => {
        const productRepository = {
            getProductById: jest.fn(() => {
                throw new ObjectNotFoundError();
            }),
            getProducts: jest.fn(),
            getProductsByIds: jest.fn(),
        };
        const sut = dataBuilder.makeSUT({ productRepository });
        return expect(sut.execute(dataBuilder.getSUTInput())).rejects.toThrow(ProductNotFoundError);
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
        const sut = dataBuilder.makeSUT({ productRepository });
        return expect(sut.execute(dataBuilder.getSUTInput())).rejects.toThrow(error);
    });

    it('Should throw CartNotFoundError if getCartById throws ObjectNotFoundError', () => {
        const cartRepository = {
            getCartById: jest.fn(() => {
                throw new ObjectNotFoundError();
            }),
            insertNewCart: jest.fn(),
            editCart: jest.fn(),
        };
        const sut = dataBuilder.makeSUT({ cartRepository });
        return expect(sut.execute(dataBuilder.getSUTInput())).rejects.toThrow(CartNotFoundError);
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
        const sut = dataBuilder.makeSUT({ cartRepository });
        return expect(sut.execute(dataBuilder.getSUTInput())).rejects.toThrow(error);
    });

    it.skip('Should throw a CartDoesNotBelongToCustomerError if cart does not belong to customer', async () => {
        const customerRepository = {
            getCustomerById: jest.fn<Promise<CustomerDTO>, [string]>(
                () =>
                    new Promise((res) =>
                        res(
                            testDataHelper.getCustomerDTO({
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
                        res(testDataHelper.getCartDTO({ id: '1' }))
                    )
            ),
            insertNewCart: jest.fn(),
            editCart: jest.fn(),
        };

        const sut = dataBuilder.makeSUT({
            customerRepository,
            cartRepository,
        });

        return expect(sut.execute(dataBuilder.getSUTInput())).rejects.toThrow(CartDoesNotBelongToCustomerError);
    });

    it.skip('Should return a cart with the inserted products.', () => {
        const sut = dataBuilder.makeSUT({});
    });
});
