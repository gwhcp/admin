export const settingEmailRoutes = (checkPermission) => {
    return {
        path: '/setting/email',
        redirect: {name: 'setting:email:search'},
        name: 'setting:email',
        meta: {
            label: 'Email Templates'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'setting:email:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/setting/email/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'setting.email.view_emailtemplate',
                        'setting.email.add_emailtemplate'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'setting:email:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/setting/email/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'setting.email.view_emailtemplate'
                    ])
                }
            },
            {
                path: 'search',
                name: 'setting:email:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/setting/email/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'setting.email.view_emailtemplate'
                    ])
                }
            }
        ]
    }
};
