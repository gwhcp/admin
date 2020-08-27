export const companyDomainRoutes = (checkPermission) => {
    return {
        path: '/company/domain',
        redirect: {name: 'company:domain:search'},
        name: 'company:domain',
        meta: {
            label: 'Domain'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'company:domain:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/company/domain/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.domain.view_domain',
                        'company.domain.add_domain'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'company:domain:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/company/domain/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.domain.view_domain'
                    ])
                }
            },
            {
                path: 'search',
                name: 'company:domain:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/company/domain/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.domain.view_domain'
                    ])
                }
            }
        ]
    }
};
