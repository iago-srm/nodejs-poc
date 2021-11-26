export interface IProductRepository {
  getProducts: () => Promise<any[]>;
}
