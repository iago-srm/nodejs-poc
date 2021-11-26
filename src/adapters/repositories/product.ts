import { IProductRepository } from "@application";
import { IBaseCollection, IDatabase } from "./base-repository";

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  specialOffer: string;
  discount: number;
};

export class ProductRepository implements IProductRepository {
  private readonly collection: IBaseCollection<Product>;
  constructor(db: IDatabase) {
    this.collection = db.getCollection("products");
  }
  getProducts() {
    return this.collection.getAll();
  }
}
