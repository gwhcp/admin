<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            XMPP account has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formObj.id"
                         name="XMPP ID"/>

            <static-data :value="formObj.account_id"
                         name="Account ID"/>

            <static-data :value="formObj.account_name"
                         name="Employee Name"/>

            <static-data :value="`${formObj.account_id}@localhost`"
                         name="Username"/>

            <static-data :value="formObj.group_name"
                         name="Group"/>

            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-password v-model="formObj.password"
                                    label="Password"
                                    name="password"
                                    required="true"
                                    rules="required"/>

                    <input-password v-model="formObj.confirmed_password"
                                    label="Confirm Password"
                                    name="confirmed_password"
                                    required="true"
                                    rules="required"/>

                    <CRow>
                        <CCol class="text-left"
                              col="6">
                            <CButton :disabled="invalid"
                                     class="px-4"
                                     color="primary"
                                     @click="handleSubmit(submitUpdate)">Update
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </ValidationObserver>
        </CCard>
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";
import InputPassword from "@/components/form/InputPassword";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheProfile',
    components: {
        InputPassword,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        Permission
    ],
    computed: {
        ...mapGetters('employeeXmpp', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('employeeXmpp', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile();

        this.formObj.password = '';
    },
    mounted() {
        this.hasPermForm('employee.xmpp.change_prosodyaccount');
    },
    methods: {
        ...mapActions('employeeXmpp', [
            'formClean',
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile();

            if (!this.formSuccess) {
                this.$refs.observer.setErrors(this.formErrors);
            }

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
