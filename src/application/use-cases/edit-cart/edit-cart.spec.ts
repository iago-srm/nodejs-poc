import EditCartUseCaseFactory from './index';
import { 
    IUseCaseFactory, 
    IUseCase, 
    ICartRepository, 
    IProductRepository, 
    ICustomerRepository,
    ProductDTO,
    CartDTO,
    CustomerDTO
} from '../../ports';
import { Cart, Product, CartItem, USD, Customer } from '@domain';

const makeSUT = (args: {
    cartRepository?: ICartRepository,
    productRepository?: IProductRepository,
    customerRepository?: ICustomerRepository
}) => {
    return EditCartUseCaseFactory({
        cartRepository: args.cartRepository || {
            getCart: jest.fn(),
            insertNewCart: jest.fn(),
            editCart: jest.fn()
        },
        productRepository: args.productRepository || {
            getProducts: jest.fn(),
            getProductById: jest.fn(),
            getProductsByIds: jest.fn()
        },
        customerRepository: args.customerRepository || {
            getCustomer: jest.fn(),
        }
    });
}
describe("Edit cart use case", () => {


    it("Should call cartRepository.getCart exactly once", () => {
        const cartRepository = {
            getCart: jest.fn(),
            insertNewCart: jest.fn(),
            editCart: jest.fn()
        }
        const sut = makeSUT({ cartRepository });
        sut.execute({
            productId: '1',
            newQuantity: 1,
            customerId: '1',
            cartId: '1'
        });
        expect(cartRepository.getCart).toHaveBeenCalledTimes(1);
    });

    it("Should call customerRepository.getCustomer exactly once", () => {
        const customerRepository = {
            getCustomer: jest.fn(),
        }
        const sut = makeSUT({ customerRepository });
        sut.execute({
            productId: '1',
            newQuantity: 1,
            customerId: '1',
            cartId: '1'
        });
        expect(customerRepository.getCustomer).toHaveBeenCalledTimes(1);
    });

    it("Should call productRepository.getProductById exactly once", () => {
        const productRepository = {
            getProducts: jest.fn(),
            getProductById: jest.fn(),
            getProductsByIds: jest.fn()
        }
        const sut = makeSUT({ productRepository });
        sut.execute({
            productId: '1',
            newQuantity: 1,
            customerId: '1',
            cartId: '1'
        });
        expect(productRepository.getProductById).toHaveBeenCalledTimes(1);
    });

    it("Should rethrow error if getProductById throws an error", () => {
        const productRepository = {
            getProductById: jest.fn(() => {throw new Error()}),
            getProducts: jest.fn(),
            getProductsByIds: jest.fn()
        };
        const sut = makeSUT({ productRepository });
        expect(sut.execute).toThrow();
    });

    it("Should throw an error if cart does not belong to customer", async () => {
        const customerRepository = {
            getCustomer: jest.fn<Promise<CustomerDTO>,[string]>(() => new Promise(res => res({id: '1', cartId: '1'})))
        }
        const cartRepository = {
            getCart: jest.fn<Promise<{id: string}>,[string]>(() => new Promise(res => res({id: '2'}))),
            insertNewCart: jest.fn(),
            editCart: jest.fn()
        }
        const customerDTO = await customerRepository.getCustomer('1')
    });
    it("Should return a cart", () => {

    });
});