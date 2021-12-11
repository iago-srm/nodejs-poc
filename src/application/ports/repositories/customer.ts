export type CustomerDTO = {
    id: string;
    cartId: string;
};

export interface ICustomerRepository {
    getCustomerById: (id: string) => Promise<CustomerDTO>;
}
