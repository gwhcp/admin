export const companyMailRoutes = (checkPermission) => {
    return {
        path: '/company/mail',
        redirect: {
            name: 'company:mail:search'
        },
        name: 'company:mail',
        meta: {
            label: 'Mail'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'company:mail:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/company/mail/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.mail.view_mail',
                        'company.mail.add_mail'
                    ])
                }
            },
            {
                path: 'password/:id',
                name: 'company:mail:password',
                meta: {
                    label: 'Password'
                },
                component: () => import('@/views/company/mail/ThePassword'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.mail.view_mail'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'company:mail:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/company/mail/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.mail.view_mail'
                    ])
                }
            },
            {
                path: 'search',
                name: 'company:mail:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/company/mail/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.mail.view_mail'
                    ])
                }
            }
        ]
    }
};
