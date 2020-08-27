export const storeFraudRoutes = (checkPermission) => {
    return {
        path: '/store/fraud',
        redirect: {name: 'store:fraud:search'},
        name: 'store:fraud',
        meta: {
            label: 'Fraud Strings'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'store:fraud:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/store/fraud/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.fraud.view_fraudstring',
                        'store.fraud.add_fraudstring'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'store:fraud:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/store/fraud/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.fraud.view_fraudstring'
                    ])
                }
            },
            {
                path: 'search',
                name: 'store:fraud:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/store/fraud/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'store.fraud.view_fraudstring'
                    ])
                }
            }
        ]
    }
};
