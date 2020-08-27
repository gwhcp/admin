export const companyCompanyRoutes = (checkPermission) => {
    return {
        path: '/company/company',
        redirect: {name: 'company:company:search'},
        name: 'company:company',
        meta: {
            label: 'Company'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'company:company:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/company/company/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.company.view_company',
                        'company.company.add_company'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'company:company:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/company/company/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.company.view_company'
                    ])
                }
            },
            {
                path: 'search',
                name: 'company:company:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/company/company/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.company.view_company'
                    ])
                }
            }
        ]
    }
};
