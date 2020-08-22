export const storeProductRoutes = (checkPermission) => {
    return {
        path: '/store/product',
        redirect: {name: 'store:product:index'},
        name: 'store:product',
        meta: {
            label: 'Store Product'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'index',
                name: 'store:product:index',
                meta: {
                    label: 'Dashboard'
                },
                component: () => import('@/views/store/product/TheIndex'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.product.view_storeproduct'
                    ])
                }
            }
        ]
    }
}
