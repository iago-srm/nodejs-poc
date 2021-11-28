import { IUseCaseFactory, IUseCase, IProductRepository } from "../../ports";

type InputParams = void;

type Return = any[];

export type IListProductsUseCase = IUseCase<InputParams, Return>;
export type IListProductsUseCaseFactory = IUseCaseFactory<
  IProductRepository,
  InputParams,
  Return
>;

const ListProductsUseCaseFactory: IListProductsUseCaseFactory = (
  productRepository
) => {
  return {
    execute: () => productRepository.getProducts(),
  };
};

export default ListProductsUseCaseFactory;