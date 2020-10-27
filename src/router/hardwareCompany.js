export const hardwareCompanyRoutes = (checkPermission) => {
    return {
        path: '/hardware/company',
        redirect: {
            name: 'hardware:company:search'
        },
        name: 'hardware:company',
        meta: {
            label: 'Hardware Company'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'hardware:company:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/hardware/company/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'hardware.company.view_server',
                        'hardware.company.add_server'
                    ])
                }
            },
            {
                path: 'domain/:id',
                name: 'hardware:company:domain',
                meta: {
                    label: 'Authorized Domains'
                },
                component: () => import('@/views/hardware/company/TheDomain'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'hardware.company.view_server'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'hardware:company:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/hardware/company/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'hardware.company.view_server'
                    ])
                }
            },
            {
                path: 'search',
                name: 'hardware:company:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/hardware/company/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'hardware.company.view_server'
                    ])
                }
            }
        ]
    }
};
