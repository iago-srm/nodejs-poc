import { ICustomerRepository, CustomerDTO } from '@application/ports';
import { IBaseCollection, IDatabase } from '../ibase-repository';

class CustomerRepository implements ICustomerRepository {
    private readonly collection: IBaseCollection<CustomerDTO>;

    constructor({ db }: { db: IDatabase }) {
        this.collection = db.getCollection('customers');
    }

    getCustomerById(customerId: string) {
        return this.collection.getOneById(customerId);
    }
}

export default CustomerRepository;
