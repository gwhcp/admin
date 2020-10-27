<template>
    <CSidebar :minimize="minimize"
              :show="show"
              dropdownMode="noAction"
              fixed
              @update:show="(value) => $store.commit('set', ['sidebarShow', value])">

        <CSidebarBrand :to="{name: 'dashboard'}"
                       class="d-md-down-none">
            <CIcon :height="35"
                   class="c-sidebar-brand-full"
                   name="logo"
                   size="custom-size"
                   viewBox="0 0 556 134"/>

            <CIcon :height="35"
                   class="c-sidebar-brand-minimized"
                   name="logo"
                   size="custom-size"
                   viewBox="0 0 110 134"/>
        </CSidebarBrand>

        <CRenderFunction :content-to-render="computedSidebar"
                         flat/>

        <CSidebarMinimizer class="d-md-down-none"
                           @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"/>
    </CSidebar>
</template>

<script>
import nav from "@/containers/_nav";
import Permission from "@/mixins/Permission";

export default {
    name: 'TheSidebar',
    mixins: [
        Permission
    ],
    nav,
    computed: {
        currentItems() {
            return nav[0]._children.filter(item => {
                if (item.name === 'Billing') {
                    item.items = [];

                    if (this.hasPerm('billing.payment.view_paymentgateway')) {
                        item.items.push({
                            to: {
                                name: 'billing:payment:search'
                            },
                            name: 'Payment Gateway'
                        });
                    }

                    if (this.hasPerm('billing.reason.view_reason')) {
                        item.items.push({
                            to: {
                                name: 'billing:reason:search'
                            },
                            name: 'Reason'
                        });
                    }
                }

                if (item.name === 'Company') {
                    item.items = [];

                    if (this.hasPerm('company.company.view_company')) {
                        item.items.push({
                            to: {
                                name: 'company:company:search'
                            },
                            name: 'Company'
                        });
                    }

                    if (this.hasPerm('company.dns.view_dnszone')) {
                        item.items.push({
                            to: {
                                name: 'company:dns:search'
                            },
                            name: 'DNS'
                        });
                    }

                    if (this.hasPerm('company.domain.view_domain')) {
                        item.items.push({
                            to: {
                                name: 'company:domain:search'
                            },
                            name: 'Domain'
                        });
                    }

                    if (this.hasPerm('company.mail.view_mail')) {
                        item.items.push({
                            to: {
                                name: 'company:mail:search'
                            },
                            name: 'Mail'
                        });
                    }

                    if (this.hasPerm('company.xmpp.view_prosodyaccount')) {
                        item.items.push({
                            to: {
                                name: 'company:xmpp:search'
                            },
                            name: 'XMPP'
                        });
                    }
                }

                if (item.name === 'Customer') {
                    item.items = [];

                    if (this.hasPerm('customer.account.view_account')) {
                        item.items.push({
                            to: '/customer/account',
                            name: 'Account'
                        });
                    }

                    if (this.hasPerm('customer.billing.view_billingprofile')) {
                        item.items.push({
                            to: '/customer/billing',
                            name: 'Billing Profile'
                        });
                    }

                    if (this.hasPerm('customer.order.view_order')) {
                        item.items.push({
                            to: '/customer/order',
                            name: 'Order'
                        });
                    }

                    if (this.hasPerm('customer.product.view_product')) {
                        item.items.push({
                            to: '/customer/product',
                            name: 'Product'
                        });
                    }
                }

                if (item.name === 'Employee') {
                    item.items = [];

                    if (this.hasPerm('employee.manage.view_account')) {
                        item.items.push({
                            to: {
                                name: 'employee:manage:search'
                            },
                            name: 'Account'
                        });
                    }

                    if (this.hasPerm('employee.mail.view_mail')) {
                        item.items.push({
                            to: {
                                name: 'employee:mail:search'
                            },
                            name: 'Mail'
                        });
                    }

                    if (this.hasPerm('employee.xmpp.view_prosodyaccount')) {
                        item.items.push({
                            to: {
                                name: 'employee:xmpp:profile'
                            },
                            name: 'XMPP'
                        });
                    }
                }

                if (item.name === 'Hardware') {
                    item.items = [];

                    if (this.hasPerm('hardware.client.view_server')) {
                        item.items.push({
                            to: {
                                name: 'hardware:client:search'
                            },
                            name: 'Client'
                        });
                    }

                    if (this.hasPerm('hardware.company.view_server')) {
                        item.items.push({
                            to: {
                                name: 'hardware:company:search'
                            },
                            name: 'Company'
                        });
                    }

                    if (this.hasPerm('hardware.ssl.view_ssl')) {
                        item.items.push({
                            to: '/hardware/ssl',
                            name: 'SSL'
                        });
                    }
                }

                if (item.name === 'Network') {
                    item.items = [];

                    if (this.hasPerm('network.pool.view_ipaddresssetup')) {
                        item.items.push({
                            to: {
                                name: 'network:pool:search'
                            },
                            name: 'IP Address Pool'
                        });
                    }

                    if (this.hasPerm('network.queue.view_queuestatus')) {
                        item.items.push({
                            to: {
                                name: 'network:queue:search'
                            },
                            name: 'Queue'
                        });
                    }
                }

                if (item.name === 'Settings') {
                    item.items = [];

                    if (this.hasPerm('setting.banned.view_banned')) {
                        item.items.push({
                            to: {
                                name: 'setting:banned:search'
                            },
                            name: 'Banned Item'
                        });
                    }

                    if (this.hasPerm('setting.email.view_emailtemplate')) {
                        item.items.push({
                            to: {
                                name: 'setting:email:search'
                            },
                            name: 'Email Template'
                        });
                    }

                    if (this.hasPerm('')) {
                        item.items.push({
                            to: '/setting/permission',
                            name: 'Permissions'
                        });
                    }
                }

                if (item.name === 'Store') {
                    item.items = [];

                    if (this.hasPerm('store.fraud.view_fraudstring')) {
                        item.items.push({
                            to: {
                                name: 'store:fraud:search'
                            },
                            name: 'Fraud String',
                        });
                    }

                    if (this.hasPerm('store.product.view_storeproduct')) {
                        item.items.push({
                            to: {
                                name: 'store:product:index'
                            },
                            name: 'Product'
                        });
                    }
                }

                if (item.items) {
                    // Hide action if it has no items
                    if (item.items.length > 0) {
                        return item;
                    }
                } else {
                    return item;
                }
            });
        },
        computedSidebar() {
            return [
                {
                    _name: 'CSidebarNav',
                    _children: this.currentItems
                }
            ];
        },
        minimize() {
            return this.$store.state.sidebarMinimize;
        },
        show() {
            return this.$store.state.sidebarShow;
        }
    }
};
</script>
