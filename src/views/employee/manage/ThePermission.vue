<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Account permissions have been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{ name: 'employee:manage:profile', params: { id: accountId } }"
                  title="Profile"/>

            <CTab title="Permissions">
                <CCard bodyWrapper>
                    <CForm>
                        <vue-select-sides
                            id="permission_user"
                            v-model="selectedPermissions"
                            :list="permissionBase"
                            name="permission_user"
                            type="mirror"/>

                        <CRow class="mt-3">
                            <CCol class="text-left"
                                  col="6">
                                <CButton class="px-4"
                                         color="primary"
                                         @click="submitPermission">
                                    Update
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCard>
            </CTab>

            <CTab :to="{ name: 'employee:manage:accesslog', params: { id: accountId } }"
                  title="Access Logs"/>
        </CTabs>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import Vue from "vue";
import vueSelectSides from "vue-select-sides";
import {mapActions, mapGetters} from "vuex";

Vue.use(vueSelectSides, {
    locale: "en_US"
});

export default {
    name: 'ThePermission',
    components: {
        vueSelectSides
    },
    mixins: [
        Loading,
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
    async created() {
        await this.getPermissions({
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
        async submitPermission() {
            this.loadingState = true;

            await this.updatePermissions({
                id: this.accountId,
                perms: this.selected
            });

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>

<style lang="scss">
@import "/node_modules/vue-select-sides/styles/themes/soft.scss";
</style>