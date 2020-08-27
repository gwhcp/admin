<template>
    <CSidebar :minimize="minimize"
              :show="show"
              @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
              dropdownMode="noAction"
              fixed>

        <CSidebarBrand :to="{name: 'dashboard'}"
                       class="d-md-down-none">
            <CIcon :height="35"
                   class="c-sidebar-brand-full"
                   name="logo"
                   size="custom-size"
                   viewBox="0 0 556 134"/>

            <CIcon :height="35"
                   class="c-sidebar-brand-minimized" name="logo"
                   size="custom-size"
                   viewBox="0 0 110 134"/>
        </CSidebarBrand>

        <CRenderFunction :content-to-render="computedSidebar"
                         flat/>

        <CSidebarMinimizer @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
                           class="d-md-down-none"/>
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
                        item.items.push({name: 'Payment Gateway', to: {name: 'billing:payment:search'}});
                    }

                    if (this.hasPerm('billing.reason.view_reason')) {
                        item.items.push({name: 'Reason', to: {name: 'billing:reason:search'}});
                    }
                }

                if (item.name === 'Company') {
                    item.items = [];

                    if (this.hasPerm('company.company.view_company')) {
                        item.items.push({name: 'Company', to: {name: 'company:company:search'}});
                    }

                    if (this.hasPerm('company.dns.view_dnszone')) {
                        item.items.push({name: 'DNS', to: {name: 'company:dns:search'}});
                    }

                    if (this.hasPerm('company.domain.view_domain')) {
                        item.items.push({name: 'Domain', to: {name: 'company:domain:search'}});
                    }

                    if (this.hasPerm('company.mail.view_mail')) {
                        item.items.push({name: 'Mail', to: {name: 'company:mail:search'}});
                    }

                    if (this.hasPerm('company.xmpp.view_xmpp')) {
                        item.items.push({name: 'XMPP', to: '/company/xmpp'});
                    }
                }

                if (item.name === 'Customer') {
                    item.items = [];

                    if (this.hasPerm('customer.account.view_account')) {
                        item.items.push({name: 'Account', to: '/customer/account'});
                    }

                    if (this.hasPerm('customer.billing.view_billingprofile')) {
                        item.items.push({name: 'Billing Profile', to: '/customer/billing'});
                    }

                    if (this.hasPerm('customer.order.view_order')) {
                        item.items.push({name: 'Order', to: '/customer/order'});
                    }

                    if (this.hasPerm('customer.product.view_product')) {
                        item.items.push({name: 'Product', to: '/customer/product'});
                    }
                }

                if (item.name === 'Employee') {
                    item.items = [];

                    if (this.hasPerm('employee.manage.view_account')) {
                        item.items.push({name: 'Account', to: {name: 'employee:manage:search'}});
                    }
                }

                if (item.name === 'Hardware') {
                    item.items = [];

                    if (this.hasPerm('hardware.client.view_server')) {
                        item.items.push({name: 'Client', to: {name: 'hardware:client:search'}});
                    }

                    if (this.hasPerm('hardware.company.view_server')) {
                        item.items.push({name: 'Company', to: {name: 'hardware:company:search'}});
                    }

                    if (this.hasPerm('hardware.ssl.view_ssl')) {
                        item.items.push({name: 'SSL', to: '/hardware/ssl'});
                    }
                }

                if (item.name === 'Network') {
                    item.items = [];

                    if (this.hasPerm('network.pool.view_ipaddresssetup')) {
                        item.items.push({name: 'IP Address Pool', to: {name: 'network:pool:search'}});
                    }

                    if (this.hasPerm('network.queue.view_queuestatus')) {
                        item.items.push({name: 'Queue', to: {name: 'network:queue:search'}});
                    }
                }

                if (item.name === 'Settings') {
                    item.items = [];

                    if (this.hasPerm('setting.banned.view_banned')) {
                        item.items.push({name: 'Banned Item', to: {name: 'setting:banned:search'}});
                    }

                    if (this.hasPerm('setting.email.view_emailtemplate')) {
                        item.items.push({name: 'Email Template', to: {name: 'setting:email:search'}});
                    }

                    if (this.hasPerm('')) {
                        item.items.push({name: 'Permissions', to: '/setting/permission'});
                    }
                }

                if (item.name === 'Store') {
                    item.items = [];

                    if (this.hasPerm('store.fraud.view_fraudstring')) {
                        item.items.push({name: 'Fraud String', to: {name: 'store:fraud:search'}});
                    }

                    if (this.hasPerm('store.product.view_storeproduct')) {
                        item.items.push({name: 'Product', to: {name: 'store:product:index'}});
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
