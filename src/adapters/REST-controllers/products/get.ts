// import { IListProductsUseCase } from '@application';
// import { IHTTPController, IHTTPControllerDescriptor } from '../ports';

// const ProductGetFactory = ({
//     listProductsUseCase,
// }: {
//     listProductsUseCase: IListProductsUseCase;
// }): IHTTPControllerDescriptor<IHTTPController> => {
//     const fn: IHTTPController = async () => {
//         const products = await listProductsUseCase.execute();

//         return {
//             response: products,
//             statusCode: 201,
//         };
//     };

//     return {
//         controller: fn,
//         method: 'get',
//         path: [{ resource: 'products', isParams: false }],
//     };
// };

// export default ProductGetFactory;
