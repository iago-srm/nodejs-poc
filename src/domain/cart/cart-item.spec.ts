import { Product } from '@domain';
import { CartItem } from '.';
import { InvalidCartItemQuantityError } from '@common/errors';

describe('Cart item entity', () => {
    test('Default values in constructor', () => {
        const sut = new CartItem({});
        expect(sut.getProduct()).toStrictEqual(new Product({}));
        expect(sut.getQuantity()).toBe(0);
    });

    test('Instantiating passing values', () => {
        const product = new Product({ id: '1' });
        const quantity = 2;
        const sut = new CartItem({
            product,
            quantity,
        });
        expect(sut.getProduct()).toStrictEqual(product);
        expect(sut.getQuantity()).toBe(quantity);
    });

    test('Trying to instantiate with invalid quantities throws InvalidCartItemQuantityError', () => {
        const product = new Product({ id: '1' });
        const quantity = -1;
        const makeSut = () =>
            new CartItem({
                product,
                quantity,
            });
        expect(makeSut).toThrow(InvalidCartItemQuantityError);
    });
});
