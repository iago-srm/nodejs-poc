import { ICartRepository, CartDTO } from '@application/ports';
import { IBaseCollection, IDatabase } from '../ibase-repository';

class CartRepository implements ICartRepository {
    private readonly collection: IBaseCollection<CartDTO>;

    constructor({ db }: { db: IDatabase }) {
        this.collection = db.getCollection('carts');
    }

    insertNewCart(args: CartDTO) {
        return this.collection.insertOne(args);
    }

    getCartById(id: string) {
        return this.collection.getOneById(id);
    }

    editCart(args) {
        return this.collection.editOne(args.id, args);
    }
}

export default CartRepository;
