import { CartDTO, CustomerDTO } from "@application/ports";
import { IBaseCollection, IDatabase } from '../../adapters/repositories/ibase-repository';

export const testDataHelper = {
    getSpyDatabase: (): IDatabase => {
        return {
            connect: jest.fn(),
            closeConnection: jest.fn(),
            getCollection: jest.fn(() => ({
                getOneById: jest.fn(),
                getAll: jest.fn(),
                insertOne: jest.fn<Promise<any>, any[]>(
                    (obj) => new Promise((resolve) => resolve(obj))
                ),
                updateOne: jest.fn(),
            })),
        };
    },
    getCartDTO: ({
        id = '1',
        totalQuantity = 0,
        totalPrice = '10',
        items = [],
    }): CartDTO => ({
        id,
        totalPrice,
        totalQuantity,
        items
    }),

    getCustomerDTO: ({ id = '1', cartId = '1' }): CustomerDTO => {
        return {
            id,
            cartId,
        };
    },
};