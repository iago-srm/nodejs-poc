export * from './cart';
export * from './customer';
export * from './product';
export * from './currency';

/**
 * Use cases diferentes querem instanciar as mesmas entidades com parâmetros diferentes.
 * Como lidar?
 * Solução de agora: criar uma Factory pra cada use-case.

* When modelling entities, should the cart entity have a Customer property AND the customer
 * property have a cart entity, or just one or the other?
 */
