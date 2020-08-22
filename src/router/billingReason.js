export const billingReasonRoutes = (checkPermission) => {
    return {
        path: '/billing/reason',
        redirect: {name: 'billing:reason:search'},
        name: 'billing:reason',
        meta: {
            label: 'Billing Reason'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'billing:reason:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/billing/reason/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'billing.reason.view_reason',
                        'billing.reason.add_reason'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'billing:reason:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/billing/reason/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'billing.reason.view_reason'
                    ])
                }
            },
            {
                path: 'search',
                name: 'billing:reason:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/billing/reason/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'billing.reason.view_reason'
                    ])
                }
            }
        ]
    }
}
