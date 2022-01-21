import { InvalidDiscountError } from '@common/errors';
import { USD } from '@domain';
import { Product } from '.';

describe('Product entity', () => {
    test('Default values in constructor', () => {
        const sut = new Product({});
        expect(sut.getDiscount()).toBe(0);
        expect(sut.getPrice()).toStrictEqual(new USD(0));
    });

    test('Instantiating passing values', () => {
        const sut = new Product({
            description: 'description',
            price: new USD(7),
        });

        expect(sut.getDescription()).toBe('description');
        expect(sut.getPrice()).toStrictEqual(new USD(7));
    });
    test('Instantiating Product with invalid discount value throws InvalidDiscountError', () => {
        const makeSut = () =>
            new Product({
                discount: 101,
            });
        expect(makeSut).toThrow(InvalidDiscountError);
    });
});
