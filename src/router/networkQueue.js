export const networkQueueRoutes = (checkPermission) => {
    return {
        path: '/network/queue',
        redirect: {name: 'network:queue:search'},
        name: 'network:queue',
        meta: {
            label: 'Network Queue'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'profile/:id',
                name: 'network:queue:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/network/queue/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'network.queue.view_queuestatus'
                    ])
                }
            },
            {
                path: 'search',
                name: 'network:queue:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/network/queue/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'network.queue.view_queuestatus'
                    ])
                }
            }
        ]
    }
}
