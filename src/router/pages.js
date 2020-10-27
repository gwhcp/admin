export const pagesRoutes = (requireUnauthenticated) => {
    return {
        path: '/pages',
        redirect: {
            name: 'pages:login'
        },
        name: 'pages',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: '403',
                name: 'pages:error:403',
                component: () => import('@/views/pages/TheError403')
            },
            {
                path: '404',
                name: 'pages:error:404',
                component: () => import('@/views/pages/TheError404')
            },
            {
                path: '408',
                name: 'pages:error:408',
                component: () => import('@/views/pages/TheError408')
            },
            {
                path: '500',
                name: 'pages:error:500',
                component: () => import('@/views/pages/TheError500')
            },
            {
                path: 'login',
                name: 'pages:account:login',
                component: () => import('@/views/pages/TheLogin'),
                beforeEnter: requireUnauthenticated
            }
        ]
    }
};
