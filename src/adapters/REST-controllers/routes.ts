export const Routes = {
    ['get-cart']: {
        method: 'get',
        path: 'cart'
    },
    ['new-cart']: {
        method: 'post',
        path: 'cart'
    },
    ['add-product']: {
        method: 'put',
        path: 'cart/[cartId]/[productId]'
    },
    ['delete-product']: {
        method: 'delete',
        path: 'cart/[cartId]/[productId]'
    }
}