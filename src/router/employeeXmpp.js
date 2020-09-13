export const employeeXmppRoutes = (checkPermission) => {
    return {
        path: '/employee/xmpp',
        redirect: {name: 'employee:xmpp:profile'},
        name: 'employee:xmpp',
        meta: {
            label: 'Employee XMPP'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'profile',
                name: 'employee:xmpp:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/employee/xmpp/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.xmpp.view_prosodyaccount'
                    ])
                }
            },
        ]
    }
};
