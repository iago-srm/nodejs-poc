  export type CustomerDTO = {
    id: string;
    cartId: string;
  };
  
  export type getCustomerParams = {
    customerId: string;
  }
  
  export interface ICustomerRepository {
    getCustomer: (args: getCustomerParams) => Promise<CustomerDTO>;
  }