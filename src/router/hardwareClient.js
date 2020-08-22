export const hardwareClientRoutes = (checkPermission) => {
    return {
        path: '/hardware/client',
        redirect: {name: 'hardware:client:search'},
        name: 'hardware:client',
        meta: {
            label: 'Hardware Client'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'hardware:client:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/hardware/client/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'hardware.client.view_server',
                        'hardware.client.add_server'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'hardware:client:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/hardware/client/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'hardware.client.view_server'
                    ])
                }
            },
            {
                path: 'search',
                name: 'hardware:client:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/hardware/client/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'hardware.client.view_server'
                    ])
                }
            }
        ]
    }
}
