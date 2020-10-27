export const companyDnsRoutes = (checkPermission) => {
    return {
        path: '/company/dns',
        redirect: {
            name: 'company:dns:search'
        },
        name: 'company:dns',
        meta: {
            label: 'DNS'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create/:id',
                name: 'company:dns:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/company/dns/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.dns.view_dnszone',
                        'company.dns.add_dnszone'
                    ])
                }
            },
            {
                path: 'ns/:id',
                name: 'company:dns:ns',
                meta: {
                    label: 'Nameserver'
                },
                component: () => import('@/views/company/dns/TheNs'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.dns.view_dnszone'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'company:dns:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/company/dns/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.dns.view_dnszone'
                    ])
                }
            },
            {
                path: 'records/:id',
                name: 'company:dns:records',
                meta: {
                    label: 'Search Records'
                },
                component: () => import('@/views/company/dns/TheSearchRecord'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.dns.view_dnszone'
                    ])
                }
            },
            {
                path: 'search',
                name: 'company:dns:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/company/dns/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.dns.view_dnszone'
                    ])
                }
            }
        ]
    }
};
