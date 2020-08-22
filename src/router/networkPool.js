export const networkPoolRoutes = (checkPermission) => {
    return {
        path: '/network/pool',
        redirect: {name: 'network:pool:search'},
        name: 'network:pool',
        meta: {
            label: 'Network Pool'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'network:pool:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/network/pool/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'network.pool.view_ipaddresssetup',
                        'network.pool.add_ipaddresssetup'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'network:pool:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/network/pool/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'network.pool.view_ipaddresssetup'
                    ])
                }
            },
            {
                path: 'search',
                name: 'network:pool:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/network/pool/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'network.pool.view_ipaddresssetup'
                    ])
                }
            }
        ]
    }
}
