export const employeeManageRoutes = (checkPermission) => {
    return {
        path: '/employee/manage',
        redirect: {name: 'employee:manage:search'},
        name: 'employee:manage',
        meta: {
            label: 'Manage Employee'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'accesslog/:id',
                name: 'employee:manage:accesslog',
                meta: {
                    label: 'Access Logs'
                },
                component: () => import('@/views/employee/manage/TheAccessLog'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.manage.view_accesslog'
                    ])
                }
            },
            {
                path: 'create',
                name: 'employee:manage:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/employee/manage/TheCreate'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.manage.view_account',
                        'employee.manage.add_account'
                    ])
                }
            },
            {
                path: 'permission/:id',
                name: 'employee:manage:permission',
                meta: {
                    label: 'User Permissions'
                },
                component: () => import('@/views/employee/manage/ThePermission'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'auth.view_permission'
                    ])
                }
            },
            {
                path: 'profile/:id',
                name: 'employee:manage:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/employee/manage/TheProfile'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.manage.view_account'
                    ])
                }
            },
            {
                path: 'search',
                name: 'employee:manage:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/employee/manage/TheSearch'),
                beforeEnter: (to, from, next) => {
                    checkPermission(to, from, next)([
                        'employee.manage.view_account'
                    ])
                }
            }
        ]
    }
};
