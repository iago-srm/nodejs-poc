import { IProductRepository, ProductDTO } from "@application";
import { IBaseCollection, IDatabase } from "../ibase-repository";


class ProductRepository implements IProductRepository {

  private readonly collection: IBaseCollection<ProductDTO>;
  
  constructor(database: IDatabase) {
    this.collection = database.getCollection("products");
  }
  
  getProducts() {
    return this.collection.getAll();
  }

  getProductById(id: string) {
    return this.collection.getOneById(id);
  }
}

export default ProductRepository;