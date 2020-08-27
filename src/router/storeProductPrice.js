export const storeProductPriceRoutes = (checkPermission) => {
    return {
        path: '/store/product/price',
        redirect: {name: 'store:product:index'},
        name: 'store:product:price', // TODO Try to get ID
        meta: {
            label: 'Store Product Price'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create/:productId/:type',
                name: 'store:product:price:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/store/product/price/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.product.price.view_storeproductprice',
                        'store.product.price.add_storeproductprice'
                    ])
                }
            },
            {
                path: 'profile/:productId/:id/:type',
                name: 'store:product:price:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/store/product/price/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.product.price.view_storeproductprice'
                    ])
                }
            },
            {
                path: 'search/:productId/:type',
                name: 'store:product:price:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/store/product/price/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.product.price.view_storeproductprice'
                    ])
                }
            }
        ]
    }
};
