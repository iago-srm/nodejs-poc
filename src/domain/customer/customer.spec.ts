import { CartDoesNotBelongToCustomerError } from '@common/errors';
import { Cart, USD } from '@domain';
import { Customer } from '.';

describe('Customer entity', () => {
    test('Default values in constructor', () => {
        const sut = new Customer({});
        expect(sut.id).toBe('');
        expect(sut.getCart()).toStrictEqual(new Cart({}));
    });

    test('Instantiating passing values', () => {
        const cart = new Cart({ id: '2' });
        const id = '1';
        const sut = new Customer({
            id,
            cart,
        });

        expect(sut.id).toBe(id);
        expect(sut.getCart()).toStrictEqual(cart);
    });

    test('customer.isOwnCart throws CartDoesNotBelongToCustomerError if asked if another cart belongs', () => {
        const customer = new Customer({
            cart: new Cart({ id: '1' }),
        });

        expect(() => customer.isOwnCart('2')).toThrow(
            CartDoesNotBelongToCustomerError
        );
    });
});
