// import { User } from "@domain";
// import { IDatabase } from "src/frameworks";

// const tableName = "users";
// export const UserUseCase = (db: IDatabase) => {
//   return {
//     getUser: (email: string) => db.getOne<User>(tableName, { email }),
//     getAllUsers: () => db.getAll<User>(tableName),
//     insertUser: (user: User | User[]) => db.insert<User>(tableName, user),
//     updateUser: ({ email, password }: { email: string; password: string }) =>
//       db.updateOne<User>(tableName, { email }, { password }),
//     deleteUser: ({ email }: { email: string }) =>
//       db.delete(tableName, { email }),
//   };
// };

// export type IUserUseCase = ReturnType<typeof UserUseCase>;

/**
 * 
 * USE CASES OF AN ECOMMERCE BY ACTOR
 * 
 * [auth service]
 * Create new user
 * User info has changed (name, e-mail)
 * 
 * [admin]
 * Add new product to catalog
 * Edit product info
 * Change product quantity (new shipment of certain product, or ran out)
 * Add FAQ entry
 * Add content and schedule mailing list
 * 
 * [user]
 * Add item to cart
 * Change quantity of item in cart (incl. to 0)
 * List items from cart
 * Change Delivery Address
 * Add payment method
 * Change payment method
 * Procceed with purchase of cart: add cart to purchase history and connect to some payment service. Can pay with mix of wallet and registered payment method. Communicate with shipping service afterwards
retrieve items from the shopping cart and create a new order;
pay for the order;
notify the user if the payment fails;
clear the cart and show the order.
we want to create a new order;
pay for it in a third-party payment system;
if the payment failed, notify the user about it;
if it passed, save the order on the server;
add the order to the local data store to show on the screen.
 * List products by filters (incl. in special offer)
 * Get product details
 * Sign into mailing list
 * Get FAQ
 * Add money to wallet
 * Cancel purchase after payment
 * Return product
 * Send message to admin
 * 
 * ENTITIES
 * [User]
 * id
 * name
 * deliveryAddress
 * 
 * [Product]
 * id
 * Name
 * price
 * description
 * image
 * category
 * specialOffer
 * discount
 * 
 * [Wallet]
 * id
 * client
 * Transactions
 * amount
 * 
 * [Cart]
 * id
 * client
 * products
 * 
 * [Purchase]
 * id
 * cart
 * dateTime
 */

/**
 * [Tests]
 * Use cases receive a spy version (a mock) of the services they use when testing.
 * These mocks implement the actual interfaces that the use cases rely on.
 * The mocks may have auxiliary properties in them to help in testing
 * 
 */