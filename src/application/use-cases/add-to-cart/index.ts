import { 
    IUseCaseFactory, 
    IUseCase, 
    ICartRepository, 
    IProductRepository, 
    ProductDTO
} from '../../ports';
import { Cart, Product, CartItem } from '@domain';
// import { serializeProduct, serializeCart } from '../../serializers';

type InputParams = {
    products: {
        id: string;
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

const AddToCartUseCaseFactory: IAddToCartUseCaseFactory = ({cartRepository, productRepository, customerRepository}) => {
    return { 
        execute: async (inputs) => {
            const cartDTO = await cartRepository.getCart({cartId: inputs.cartId});
            const existingProductsDTO: ProductDTO[] = await productRepository.getProductsByIds(cartDTO.items.map(p => p.id));
            const newProductsDTO = await productRepository.getProductsByIds(inputs.products.map(p => p.id));

            const existingCartItems: CartItem[] = [];
            for(let item of cartDTO.items) {
                const productDTO = existingProductsDTO.find(product => product.id === item.id);
                if(productDTO) {
                    const product = new Product({...productDTO});
                    existingCartItems.push(new CartItem({
                        quantity: item.quantity,
                        product
                    }));
                } else {
                    throw new Error();
                }
            }
            const newProducts: Product[] = newProductsDTO.map(p => new Product(p));

            const cart = new Cart({
                ...cartDTO,
                items: existingCartItems
            });
            cart.insertProducts(newProducts);

            // const existingProductsDTO = await productRepository.getProductsByIds(cartDTO.productIds);
            const costumerDTO = await customerRepository.getCustomerById(inputs.customerId);
            
           
        }
    }
}

export default AddToCartUseCaseFactory;
