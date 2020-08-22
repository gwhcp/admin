<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Account permissions have been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: 'employee:manage:profile', params: {id: accountId}}"
                  title="Profile"/>

            <CTab title="Permissions">
                <CCard bodyWrapper>
                    <CForm>
                        <vue-select-sides
                            :list="permissionBase"
                            id="permission_user"
                            name="permission_user"
                            type="mirror"
                            v-model="selectedPermissions"/>

                        <CRow class="mt-3">
                            <CCol class="text-left"
                                  col="6">
                                <CButton @click="submitPermission"
                                         class="px-4"
                                         color="primary">
                                    Update
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCard>
            </CTab>

            <CTab :to="{name: 'employee:manage:accesslog', params: {id: accountId}}"
                  title="Access Logs"/>
        </CTabs>
    </div>
</template>

<script>
import vueSelectSides from "vue-select-sides";
import Vue from "vue";
import {mapActions, mapGetters} from "vuex";
import Permission from "@/mixins/Permission";

Vue.use(vueSelectSides, {
    locale: "en_US"
});

export default {
    name: 'ThePermission',
    components: {
        vueSelectSides
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            accountId: this.$route.params.id,
            selected: []
        };
    },
    computed: {
        ...mapGetters('employeeManage', [
            'formSuccess',
            'permissionBase',
            'permissionUser'
        ]),
        selectedPermissions: {
            get: function () {
                return this.permissionUser;
            },
            set: function (newValue) {
                this.selected = newValue;
            }
        }
    },
    created() {
        this.getPermissions({
            id: this.accountId
        });
    },
    mounted() {
        this.hasPermForm('auth.change_permission');
    },
    methods: {
        ...mapActions('employeeManage', [
            'getPermissions',
            'updatePermissions'
        ]),
        submitPermission() {
            this.updatePermissions({
                id: this.accountId,
                perms: this.selected
            });

            scroll(0, 0);
        }
    }
}
</script>

<style lang="scss">
@import "/node_modules/vue-select-sides/styles/themes/soft.scss";
</style>