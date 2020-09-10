export const employeeMailRoutes = (checkPermission) => {
    return {
        path: '/employee/mail',
        redirect: {name: 'employee:mail:search'},
        name: 'employee:mail',
        meta: {
            label: 'Employee Mail'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'password/:id',
                name: 'employee:mail:password',
                meta: {
                    label: 'Password'
                },
                component: () => import('@/views/employee/mail/ThePassword'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.mail.view_mail'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'employee:mail:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/employee/mail/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.mail.view_mail'
                    ])
                }
            },
            {
                path: 'search',
                name: 'employee:mail:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/employee/mail/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.mail.view_mail'
                    ])
                }
            }
        ]
    }
};
