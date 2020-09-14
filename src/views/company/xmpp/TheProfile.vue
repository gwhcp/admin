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

            <static-data :value="formObj.server_name"
                         name="Server"/>

            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-select v-model="formObj.group"
                                  :options="choices.group"
                                  :selected="formObj.group"
                                  label="Group"
                                  name="group"
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
import {InputSelect} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheProfile',
    components: {
        InputSelect,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            xmppId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('companyXmpp', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('companyXmpp', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.xmppId
        });
    },
    mounted() {
        this.hasPermForm('company.xmpp.change_prosodyaccount');
    },
    methods: {
        ...mapActions('companyXmpp', [
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
                id: this.xmppId
            });

            if (!this.formSuccess) {
                this.$refs.observer.setErrors(this.formErrors);
            }

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
