export * from './User';
export * from './cart';
export * from './customer';
export * from './product';
export * from './currency';

/**
 * Use cases diferentes querem instanciar as mesmas entidades com parâmetros diferentes.
 * Como lidar?
 * Solução de agora: criar uma Factory pra cada use-case.
 */