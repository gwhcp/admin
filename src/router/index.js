import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const checkPermission = (to, from, next) => {
    const test = (permissions) => {
        permissions.forEach(val => {
            if (!store.state.auth.permit.includes(val)) {
                next({name: 'pages:error:403'});
            }
        });

        next();
    }

    return (test);
};

const requireAuthenticated = (to, from, next) => {
    store.dispatch('auth/initialize')
        .then(() => {
            if (!store.getters['auth/isAuthenticated']) {
                next({name: 'pages:account:login'});
            } else {
                next();
            }
        });
};

const requireUnauthenticated = (to, from, next) => {
    store.dispatch('auth/initialize')
        .then(() => {
            if (store.getters['auth/isAuthenticated']) {
                next('/');
            } else {
                next();
            }
        });
};

const redirectLogout = (to, from, next) => {
    store.dispatch('auth/logout')
        .then(() => next({name: 'pages:account:login'}));
};

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({x: 0, y: 0}),
    routes: configRoutes()
})

function configRoutes() {
    return [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: () => import('@/containers/TheContainer'),
            beforeEnter: requireAuthenticated,
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    meta: {
                        label: 'Dashboard'
                    },
                    component: () => import('@/views/TheDashboard')
                },
                {
                    path: '/account/account',
                    redirect: '/account/account/search',
                    name: 'account:account',
                    meta: {
                        label: 'Account'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'accesslog',
                            name: 'account:account:accesslog',
                            meta: {
                                label: 'Access Logs'
                            },
                            component: () => import('@/views/account/account/TheAccessLog'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'account.account.view_accesslog'
                                ])
                            }
                        },
                        {
                            path: 'profile',
                            name: 'account:account:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/account/account/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'account.account.view_account'
                                ])
                            }
                        },
                        {
                            path: 'manage/:id/accesslog',
                            name: 'account:account:manage:accesslog',
                            meta: {
                                label: 'Manage Access Logs'
                            },
                            component: () => import('@/views/account/account/TheManageAccessLog'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'account.account.view_manage'
                                ])
                            }
                        },
                        {
                            path: 'manage/:id/profile',
                            name: 'account:account:manage:profile',
                            meta: {
                                label: 'Manage Profile'
                            },
                            component: () => import('@/views/account/account/TheManageProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'account.account.view_manage'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'account:account:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/account/account/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'account.account.view_manage'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/account/login',
                    redirect: '/account/account/search',
                    name: 'account:login',
                    meta: {
                        label: 'Login'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'account:login:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/account/login/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'account.account.view_account',
                                    'account.login.add_account'
                                ])
                            }
                        },
                        {
                            path: 'password',
                            name: 'account:login:password',
                            meta: {
                                label: 'Change Password'
                            },
                            component: () => import('@/views/account/login/ThePassword'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'account.account.view_account'
                                ])
                            }
                        },
                        {
                            path: 'permission/:id',
                            name: 'account:login:permission',
                            meta: {
                                label: 'User Permissions'
                            },
                            component: () => import('@/views/account/login/ThePermission'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'auth.view_permission'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/billing/payment',
                    redirect: '/billing/payment/search',
                    name: 'billing:payment',
                    meta: {
                        label: 'Payment Gateway'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'authorize/:id/authentication',
                            name: 'billing:payment:authorize:authentication',
                            meta: {
                                label: 'Authentication'
                            },
                            component: () => import('@/views/billing/payment/authorize/TheAuthentication'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'billing.payment.view_paymentgateway'
                                ])
                            }
                        },
                        {
                            path: 'authorize/:id/method',
                            name: 'billing:payment:authorize:method',
                            meta: {
                                label: 'Payment Method'
                            },
                            component: () => import('@/views/billing/payment/authorize/TheMethod'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'billing.payment.view_paymentgateway'
                                ])
                            }
                        },
                        {
                            path: 'create',
                            name: 'billing:payment:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/billing/payment/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'billing.payment.view_paymentgateway',
                                    'billing.payment.add_paymentgateway'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'billing:payment:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/billing/payment/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'billing.payment.view_paymentgateway'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'billing:payment:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/billing/payment/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'billing.payment.view_paymentgateway'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/billing/reason',
                    redirect: '/billing/reason/search',
                    name: 'billing:reason',
                    meta: {
                        label: 'Billing Reason'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'billing:reason:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/billing/reason/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'billing.reason.view_reason',
                                    'billing.reason.add_reason'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'billing:reason:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/billing/reason/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'billing.reason.view_reason'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'billing:reason:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/billing/reason/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'billing.reason.view_reason'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/company/company',
                    redirect: '/company/company/search',
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
                },
                {
                    path: '/company/dns',
                    redirect: '/company/dns/search',
                    name: 'company:dns',
                    meta: {
                        label: 'DNS'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create/:id',
                            name: 'company:dns:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/company/dns/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'company.dns.view_dnszone',
                                    'company.dns.add_dnszone'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'company:dns:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/company/dns/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'company.dns.view_dnszone'
                                ])
                            }
                        },
                        {
                            path: 'records/:id',
                            name: 'company:dns:records',
                            meta: {
                                label: 'Search Records'
                            },
                            component: () => import('@/views/company/dns/TheSearchRecord'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'company.dns.view_dnszone'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'company:dns:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/company/dns/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'company.dns.view_dnszone'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/company/domain',
                    redirect: '/company/domain/search',
                    name: 'company:domain',
                    meta: {
                        label: 'Domain'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'company:domain:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/company/domain/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'company.domain.view_domain',
                                    'company.domain.add_domain'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'company:domain:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/company/domain/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'company.domain.view_domain'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'company:domain:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/company/domain/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'company.domain.view_domain'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/hardware/client',
                    redirect: '/hardware/client/search',
                    name: 'hardware:client',
                    meta: {
                        label: 'Hardware Client'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'hardware:client:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/hardware/client/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'hardware.client.view_server',
                                    'hardware.client.add_server'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'hardware:client:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/hardware/client/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'hardware.client.view_server'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'hardware:client:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/hardware/client/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'hardware.client.view_server'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/hardware/company',
                    redirect: '/hardware/company/search',
                    name: 'hardware:company',
                    meta: {
                        label: 'Hardware Company'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'hardware:company:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/hardware/company/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'hardware.company.view_server',
                                    'hardware.company.add_server'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'hardware:company:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/hardware/company/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'hardware.company.view_server'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'hardware:company:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/hardware/company/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'hardware.company.view_server'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/network/pool',
                    redirect: '/network/pool/search',
                    name: 'network:pool',
                    meta: {
                        label: 'Network Pool'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'network:pool:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/network/pool/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'network.pool.view_ipaddresssetup',
                                    'network.pool.add_ipaddresssetup'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'network:pool:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/network/pool/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'network.pool.view_ipaddresssetup'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'network:pool:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/network/pool/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'network.pool.view_ipaddresssetup'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/setting/banned',
                    redirect: '/setting/banned/search',
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
                },
                {
                    path: '/setting/email',
                    redirect: '/setting/email/search',
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
                },
                {
                    path: '/store/fraud',
                    redirect: '/store/fraud/search',
                    name: 'store:fraud',
                    meta: {
                        label: 'Fraud Strings'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'store:fraud:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/store/fraud/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.fraud.view_fraudstring',
                                    'store.fraud.add_fraudstring'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'store:fraud:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/store/fraud/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.fraud.view_fraudstring'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'store:fraud:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/store/fraud/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.fraud.view_fraudstring'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/store/product',
                    redirect: '/store/product/search',
                    name: 'store:product',
                    meta: {
                        label: 'Store Product'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'index',
                            name: 'store:product:index',
                            meta: {
                                label: 'Dashboard'
                            },
                            component: () => import('@/views/store/product/TheIndex'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.product.view_storeproduct'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/store/product/domain',
                    redirect: '/store/product/domain/search',
                    name: 'store:product:domain',
                    meta: {
                        label: 'Store Domain Product'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create',
                            name: 'store:product:domain:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/store/product/domain/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.product.view_storeproduct',
                                    'store.product.add_storeproduct'
                                ])
                            }
                        },
                        {
                            path: 'profile/:id',
                            name: 'store:product:domain:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/store/product/domain/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.product.view_storeproduct'
                                ])
                            }
                        },
                        {
                            path: 'resource/:id',
                            name: 'store:product:domain:resource',
                            meta: {
                                label: 'Resource'
                            },
                            component: () => import('@/views/store/product/domain/TheResource'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.product.view_storeproduct'
                                ])
                            }
                        },
                        {
                            path: 'search',
                            name: 'store:product:domain:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/store/product/domain/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.product.view_storeproduct'
                                ])
                            }
                        }
                    ]
                },
                {
                    path: '/store/product/price',
                    //redirect: '/store/product/price/search',
                    name: 'store:product:price', // TODO Try to get ID
                    meta: {
                        label: 'Store Product Price'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'create/:productId/:type',
                            name: 'store:product:price:create',
                            meta: {
                                label: 'Create'
                            },
                            component: () => import('@/views/store/product/price/TheCreate'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.product.price.view_storeproductprice',
                                    'store.product.price.add_storeproductprice'
                                ])
                            }
                        },
                        {
                            path: 'profile/:productId/:id/:type',
                            name: 'store:product:price:profile',
                            meta: {
                                label: 'Profile'
                            },
                            component: () => import('@/views/store/product/price/TheProfile'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.product.price.view_storeproductprice'
                                ])
                            }
                        },
                        {
                            path: 'search/:productId/:type',
                            name: 'store:product:price:search',
                            meta: {
                                label: 'Search'
                            },
                            component: () => import('@/views/store/product/price/TheSearch'),
                            beforeEnter: (to, from, next) => {
                                checkPermission(to, from, next)([
                                    'store.product.price.view_storeproductprice'
                                ])
                            }
                        }
                    ]
                },
            ]
        },
        {
            path: '/pages',
            redirect: '/pages/login',
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
        },
        {
            path: '/logout',
            name: 'logout',
            beforeEnter: redirectLogout
        }
    ];
}

