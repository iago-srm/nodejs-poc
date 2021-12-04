import { Cart, CartItem, Product } from '@domain';

describe("Cart entity", () => {

    test("Default values in constructor work correctly", () => {
        const sut = new Cart({});
        expect(sut.getCustomer()).toBe({});
        expect(sut.getTotalPrice()).toBe(0);
        expect(sut.getTotalQuantity()).toBe(0);
        expect(sut.getItems()).toBe([]);
    });

    test("SUT.insertItems", () => {
        test("when cart is empty", () => {
            const sut = new Cart({});
            const newItems: CartItem[] = [
                new CartItem({product: new Product({id: '1'}), quantity: 2})
            ];
            sut.insertProducts(newItems);
            expect(sut.getItems()).toBe(newItems); 
        });

        test("when cart is not empty and new products are added", () => {
            const oldItems: CartItem[] = [
                new CartItem({product: new Product({id: '1'}), quantity: 2})
            ];
            const sut = new Cart({
                items: oldItems
            });
            const newItems: CartItem[] = [
                new CartItem({product: new Product({id: '2'}), quantity: 2})
            ];
            const allItems = [...oldItems, ...newItems];
            sut.insertProducts(newItems);
            expect(sut.getItems()).toBe(allItems); 
        });

        test("when cart is not empty and and existing product is added", () => {
            const oldItems: CartItem[] = [
                new CartItem({product: new Product({id: '1'}), quantity: 2})
            ];
            const sut = new Cart({
                items: oldItems
            });
            const newItems: CartItem[] = [
                new CartItem({product: new Product({id: '1'}), quantity: 2})
            ];
            const allItems: CartItem[] = [
                new CartItem({product: new Product({id: '2'}), quantity: 4})
            ];
            sut.insertProducts(newItems);
            expect(sut.getItems()).toBe(allItems); 
        });
    });

});