import { InvalidParametersError } from '@common/errors';
import { USD } from '@domain';
import { Cart, CartItem } from '.';
import { Product } from '../product';

describe('Cart entity', () => {
    test('Default values in constructor', () => {
        const sut = new Cart({});
        expect(sut.getTotalPrice()).toStrictEqual(new USD(0));
        expect(sut.getTotalQuantity()).toBe(0);
        expect(sut.getItems()).toStrictEqual([]);
    });

    test('Instantiating passing values', () => {
        const cartItems = [
            new CartItem({
                product: new Product({ id: '1', price: new USD(100) }),
                quantity: 7,
            }),
        ];
        const sut = new Cart({
            totalPrice: new USD(700),
            totalQuantity: 7,
            items: cartItems,
        });
        expect(sut.getTotalPrice()).toStrictEqual(new USD(700));
        expect(sut.getTotalQuantity()).toBe(7);
        expect(sut.getItems()).toStrictEqual(cartItems);
    });

    test('Instantiating with inconsistent values throws InvalidParametersError.', () => {
        const cartItems = [
            new CartItem({
                product: new Product({ id: '7' }),
                quantity: 8,
            }),
        ];
        const makeSut = () =>
            new Cart({
                totalPrice: new USD(100),
                totalQuantity: 7,
                items: cartItems,
            });
        expect(makeSut).toThrow(InvalidParametersError);
    });

    describe('SUT.insertItems', () => {
        test('when cart is empty', () => {
            const sut = new Cart({});
            const newItem = new CartItem({
                product: new Product({ id: '1' }),
                quantity: 2,
            });
            sut.insertProducts(newItem);
            expect(sut.getItems()).toStrictEqual([newItem]);
        });

        test('when cart is not empty and new products are added', () => {
            const oldItems: CartItem[] = [
                new CartItem({
                    product: new Product({ id: '1' }),
                    quantity: 2,
                }),
            ];
            const sut = new Cart({
                items: oldItems,
            });
            const newItem = new CartItem({
                product: new Product({ id: '2' }),
                quantity: 2,
            });

            const allItems = [...oldItems, newItem];
            sut.insertProducts(newItem);
            expect(sut.getItems()).toStrictEqual(allItems);
        });

        test('when cart is not empty and and existing product is added', () => {
            const oldItems: CartItem[] = [
                new CartItem({
                    product: new Product({ id: '1' }),
                    quantity: 2,
                }),
            ];
            const sut = new Cart({
                items: oldItems,
            });
            const newItems = new CartItem({
                product: new Product({ id: '1' }),
                quantity: 2,
            });
            const allItems: CartItem[] = [
                new CartItem({
                    product: new Product({ id: '1' }),
                    quantity: 4,
                }),
            ];
            sut.insertProducts(newItems);
            expect(sut.getItems()).toStrictEqual(allItems);
        });

        test('total price is calculated correctly after inserting in empty cart', () => {
            const cart = new Cart({});
            const newItems = [
                new CartItem({
                    product: new Product({ id: '1', price: new USD(10) }),
                    quantity: 2,
                }),
                new CartItem({
                    product: new Product({ id: '2', price: new USD(20) }),
                    quantity: 2,
                }),
            ];
            newItems.forEach((item) => cart.insertProducts(item));
            expect(cart.getTotalPrice()).toStrictEqual(new USD(60));
        });

        test('total price is calculated correctly after inserting in cart that had the same product', () => {
            const cart = new Cart({
                items: [
                    new CartItem({
                        product: new Product({ id: '1', price: new USD(10) }),
                        quantity: 1,
                    }),
                ],
            });
            const newItems = [
                new CartItem({
                    product: new Product({ id: '1', price: new USD(10) }),
                    quantity: 2,
                }),
                new CartItem({
                    product: new Product({ id: '2', price: new USD(20) }),
                    quantity: 2,
                }),
            ];
            newItems.forEach((item) => cart.insertProducts(item));
            expect(cart.getTotalPrice()).toStrictEqual(new USD(70));
        });

        test('total price is calculated correctly after inserting in cart that had the different products', () => {
            const cart = new Cart({
                items: [
                    new CartItem({
                        product: new Product({ id: '3', price: new USD(10) }),
                        quantity: 1,
                    }),
                ],
            });
            const newItems = [
                new CartItem({
                    product: new Product({ id: '1', price: new USD(10) }),
                    quantity: 2,
                }),
                new CartItem({
                    product: new Product({ id: '2', price: new USD(20) }),
                    quantity: 2,
                }),
            ];
            newItems.forEach((item) => cart.insertProducts(item));
            expect(cart.getTotalPrice()).toStrictEqual(new USD(70));
        });
    });
});
