export const storeProductDomainRoutes = (checkPermission) => {
    return {
        path: '/store/product/domain',
        redirect: {name: 'store:product:domain:search'},
        name: 'store:product:domain',
        meta: {
            label: 'Store Domain Product'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'store:product:domain:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/store/product/domain/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.product.view_storeproduct',
                        'store.product.add_storeproduct'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'store:product:domain:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/store/product/domain/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.product.view_storeproduct'
                    ])
                }
            },
            {
                path: 'resource/:id',
                name: 'store:product:domain:resource',
                meta: {
                    label: 'Resource'
                },
                component: () => import('@/views/store/product/domain/TheResource'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.product.view_storeproduct'
                    ])
                }
            },
            {
                path: 'search',
                name: 'store:product:domain:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/store/product/domain/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.product.view_storeproduct'
                    ])
                }
            }
        ]
    }
};
