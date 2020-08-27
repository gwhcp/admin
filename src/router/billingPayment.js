export const billingPaymentRoutes = (checkPermission) => {
    return {
        path: '/billing/payment',
        redirect: {name: 'billing:payment:search'},
        name: 'billing:payment',
        meta: {
            label: 'Payment Gateway'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'authorize/:id/authentication',
                name: 'billing:payment:authorize:authentication',
                meta: {
                    label: 'Authentication'
                },
                component: () => import('@/views/billing/payment/authorize/TheAuthentication'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'billing.payment.view_paymentgateway'
                    ])
                }
            },
            {
                path: 'authorize/:id/method',
                name: 'billing:payment:authorize:method',
                meta: {
                    label: 'Payment Method'
                },
                component: () => import('@/views/billing/payment/authorize/TheMethod'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'billing.payment.view_paymentgateway'
                    ])
                }
            },
            {
                path: 'create',
                name: 'billing:payment:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/billing/payment/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'billing.payment.view_paymentgateway',
                        'billing.payment.add_paymentgateway'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'billing:payment:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/billing/payment/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'billing.payment.view_paymentgateway'
                    ])
                }
            },
            {
                path: 'search',
                name: 'billing:payment:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/billing/payment/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'billing.payment.view_paymentgateway'
                    ])
                }
            }
        ]
    }
};
