import { IListProductsUseCase } from "@application";
import { IController } from "../ports";

const ProductGetFactory = (listProductsUseCase: IListProductsUseCase) => {
  const fn: IController = async () => {
    const products = await listProductsUseCase.execute();

    return {
      response: products,
      statusCode: 201,
    };
  };

  return fn;
};

export default ProductGetFactory;
