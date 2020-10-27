export const companyXmppRoutes = (checkPermission) => {
    return {
        path: '/company/xmpp',
        redirect: {
            name: 'company:xmpp:search'
        },
        name: 'company:xmpp',
        meta: {
            label: 'Company XMPP'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'company:xmpp:create',
                meta: {
                    label: 'Create Account'
                },
                component: () => import('@/views/company/xmpp/TheCreateAccount'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.xmpp.view_prosodyaccount',
                        'company.xmpp.add_prosodyaccount'
                    ])
                }
            },
            {
                path: 'create/group',
                name: 'company:xmpp:create:group',
                meta: {
                    label: 'Create Group'
                },
                component: () => import('@/views/company/xmpp/TheCreateGroup'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.xmpp.view_prosodyaccount',
                        'company.xmpp.add_prosodyaccount'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'company:xmpp:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/company/xmpp/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.xmpp.view_prosodyaccount'
                    ])
                }
            },
            {
                path: 'search',
                name: 'company:xmpp:search',
                meta: {
                    label: 'Search Accounts'
                },
                component: () => import('@/views/company/xmpp/TheSearchAccount'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.xmpp.view_prosodyaccount'
                    ])
                }
            },
            {
                path: 'search/group',
                name: 'company:xmpp:search:group',
                meta: {
                    label: 'Search Groups'
                },
                component: () => import('@/views/company/xmpp/TheSearchGroup'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'company.xmpp.view_prosodyaccount'
                    ])
                }
            }
        ]
    }
};
