<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Mail account has been updated.
        </CAlert>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formObj.id"
                                 name="Mail ID"/>

                    <static-data :datetime="formObj.date_from"
                                 name="Created Date"/>

                    <static-data :ahref="{ name: 'company:company:profile', params: { id: formObj.company } }"
                                 :value="formObj.company_name"
                                 name="Company"
                                 permission="company.company.view_company"/>

                    <static-data :value="formObj.domain_name"
                                 name="Domain"/>

                    <static-data :value="formObj.mail_type_name"
                                 name="Type"/>

                    <static-data :value="formObj.name"
                                 name="Name"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-select v-model="formObj.account"
                                          :options="choices.account"
                                          :selected="formObj.account"
                                          label="Account"
                                          name="account"
                                          required="true"
                                          rules="required"/>

                            <input-text v-if="formObj.mail_type === 'forward'"
                                        v-model="formObj.forward_to"
                                        label="Forward To"
                                        name="forward_to"
                                        required="true"
                                        rules="required"/>

                            <input-text v-if="formObj.mail_type === 'mailbox'"
                                        v-model="formObj.quota"
                                        label="Quota"
                                        name="quota"/>

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
            </CTab>

            <CTab v-if="formObj.mail_type === 'mailbox'"
                  :to="{ name: 'company:mail:password', params: { id: mailId } }"
                  title="Password"/>
        </CTabs>
    </div>
</template>

<script>
import {InputSelect, InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        InputSelect,
        InputText,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            mailId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('companyMail', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('companyMail', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.mailId
        });
    },
    mounted() {
        this.hasPermForm('company.mail.change_mail');
    },
    methods: {
        ...mapActions('companyMail', [
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
                id: this.mailId
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
