
export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  specialOffer: string;
  discount: number;
};

export interface IProductRepository {
  getProducts: () => Promise<ProductDTO[]>;
  getProductsByIds: (ids: string[]) => Promise<ProductDTO[]>;
  getProductById: (id: string) => Promise<ProductDTO>;
}
