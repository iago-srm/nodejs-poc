import { CartDTO } from '@application/ports';
import CartRepository from '.';
import { IBaseCollection, IDatabase } from '../ibase-repository';
import { testDataHelper } from '@common/test-helpers';

describe('Methods in cart repository', () => {
    
    test("CartRepository gets instantiated with 'carts' collection", () => {
        const databaseSpy = testDataHelper.getSpyDatabase();
        new CartRepository({ db: databaseSpy });
        expect(databaseSpy.getCollection).toHaveBeenCalledTimes(1);
        expect(databaseSpy.getCollection).toHaveBeenCalledWith('carts');
    });

    /**
     * Can't figure this out: getCollection sets a private collection field in the sut.
     * This field is an object, whose methods are called by the public methods in the sut.
     * How do I test that these methods of the private field object are being called correctly?
     *
     *
     */

    test('CartRepository.insertNewCart returns the cart object that was inserted.', async () => {
        const databaseSpy = testDataHelper.getSpyDatabase();
        const testDTO = testDataHelper.getCartDTO({});

        const cartRepository = new CartRepository({ db: databaseSpy });
        const insertedCart = await cartRepository.insertNewCart(testDTO);

        expect(insertedCart).toStrictEqual(testDTO);
    });
    // test("CartRepository.insertNewCart calls cart collection's insertOne with the same parameters", () => {
    //     const databaseSpy = testDataHelper.getSpyDatabase();
    //     const testDTO = testDataHelper.getCartDTO({});

    //     const cartRepository = new CartRepository({ db: databaseSpy });
    //     cartRepository.insertNewCart(testDTO);

    //     expect(databaseSpy.collection.insertOne).toHaveBeenCalledTimes(
    //         1
    //     );
    //     expect(databaseSpy.getCollection('').insertOne).toHaveBeenCalledWith(
    //         testDTO
    //     );
    // });

    // test("CartRepository.getCartById calls cart collection's getOneById with the same id", () => {
    //     const databaseSpy = testDataHelper.getSpyDatabase();
    //     const testId = '678';

    //     const cartRepository = new CartRepository({ db: databaseSpy });
    //     cartRepository.getCartById(testId);

    //     expect(databaseSpy.getCollection('').getOneById).toHaveBeenCalledTimes(
    //         1
    //     );
    //     expect(databaseSpy.getCollection('').getOneById).toHaveBeenCalledWith(
    //         testId
    //     );
    // });
});
