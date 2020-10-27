export const employeeAccountRoutes = (checkPermission) => {
    return {
        path: '/employee/account',
        redirect: {
            name: 'employee:account:profile'
        },
        name: 'employee:account',
        meta: {
            label: 'Employee'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'accesslog',
                name: 'employee:account:accesslog',
                meta: {
                    label: 'Access Logs'
                },
                component: () => import('@/views/employee/account/TheAccessLog'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.account.view_accesslog'
                    ])
                }
            },
            {
                path: 'password',
                name: 'employee:account:password',
                meta: {
                    label: 'Change Password'
                },
                component: () => import('@/views/employee/account/ThePassword'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.account.view_account'
                    ])
                }
            },
            {
                path: 'profile',
                name: 'employee:account:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/employee/account/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.account.view_account'
                    ])
                }
            }
        ]
    }
};
