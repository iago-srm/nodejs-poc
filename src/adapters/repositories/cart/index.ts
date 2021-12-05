import { ICartRepository, CartDTO, getCartParams } from "@application";
import { IBaseCollection, IDatabase } from "../ibase-repository";

class CartRepository implements ICartRepository {

  private readonly collection: IBaseCollection<CartDTO>;
  
  constructor(database: IDatabase) {
    this.collection = database.getCollection("carts");
  }
  insertNewCart(args: CartDTO) {
    return this.collection.insertOne(args);
  }

  getCart(args: getCartParams) {
    return this.collection.getOneById(args.cartId);
  }

  editCart(args) {
    return this.collection.editOne(args.id, args);
  }
}

export default CartRepository;