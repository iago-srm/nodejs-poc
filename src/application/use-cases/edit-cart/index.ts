import { 
    IUseCaseFactory, 
    IUseCase, 
    ICartRepository, 
    IProductRepository, 
    ICustomerRepository,
    ProductDTO,
    CartDTO
} from '../../ports';
import { Cart, Product, CartItem, USD, Customer } from '@domain';
import { serializeProduct, serializeCart } from '../../serializers';

type InputParams = {
    productId: string;
    newQuantity: number;
    cartId: string;
    customerId: string;
}
type Return = CartDTO;
type Dependencies = {
    cartRepository: ICartRepository;
    productRepository: IProductRepository;
    customerRepository: ICustomerRepository;
}

export type IAddToCartUseCase = IUseCase<InputParams, Return>;
export type IAddToCartUseCaseFactory = IUseCaseFactory<Dependencies,InputParams,Return>;

// TODO: add possibility of different currencies
const EditCartUseCaseFactory: IAddToCartUseCaseFactory = ({cartRepository, productRepository, customerRepository}) => {
    return { 
        execute: async (inputs) => {
            const cartDTO = await cartRepository.getCart({cartId: inputs.cartId});
            const customerDTO = await customerRepository.getCustomer({customerId: inputs.customerId});
            let productDTO: ProductDTO;
            try{
                productDTO = await productRepository.getProductById(inputs.productId);
            } catch {
                throw new Error("Produto não encontrado");
            }

            const cart = serializeCart.dtoToEntity(cartDTO);
            const customer = new Customer({
                id: customerDTO.id,
                cart: new Cart({id: customerDTO.cartId})
            });

            if(!customer.isOwnCart(cart)) {
                throw new Error("Este carrinho não pertence a este cliente");
            }
            const product = new Product({...productDTO});
            const newCartItem: CartItem = new CartItem({
                product,
                quantity: inputs.newQuantity
            });
            cart.insertProducts(newCartItem);

            const newCartDTO = serializeCart.entityToDTO(cart);

            await cartRepository.editCart(newCartDTO);
            return newCartDTO;
        }
    }
}

export default EditCartUseCaseFactory;
