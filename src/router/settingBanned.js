export const settingBannedRoutes = (checkPermission) => {
    return {
        path: '/setting/banned',
        redirect: {name: 'setting:banned:search'},
        name: 'setting:banned',
        meta: {
            label: 'Banned Items'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'setting:banned:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/setting/banned/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'setting.banned.view_banned',
                        'setting.banned.add_banned'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'setting:banned:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/setting/banned/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'setting.banned.view_banned'
                    ])
                }
            },
            {
                path: 'search',
                name: 'setting:banned:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/setting/banned/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'setting.banned.view_banned'
                    ])
                }
            }
        ]
    }
}
