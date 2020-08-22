<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Mail account has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formObj.id"
                         name="Mail ID"/>

            <static-data :datetime="formObj.date_from"
                         name="Created Date"/>

            <static-data :ahref="{name: 'company:company:profile', params:{id: formObj.company}}"
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
                    <input-select :options="choices.account"
                                  :selected="formObj.account"
                                  label="Account"
                                  name="account"
                                  required="true"
                                  rules="required"
                                  v-model="formObj.account"/>

                    <input-text label="Forward To"
                                name="forward_to"
                                required="true"
                                rules="required"
                                v-if="formObj.mail_type === 'forward'"
                                v-model="formObj.forward_to"/>

                    <input-text label="Quota"
                                name="quota"
                                v-if="formObj.mail_type === 'mailbox'"
                                v-model="formObj.quota"/>

                    <CRow>
                        <CCol class="text-left"
                              col="6">
                            <CButton :disabled="invalid"
                                     @click="handleSubmit(submitUpdate)"
                                     class="px-4"
                                     color="primary">Update
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
import {InputSelect, InputText} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheProfile',
    components: {
        InputSelect,
        InputText,
        StaticData,
        ValidationObserver
    },
    mixins: [
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
    created() {
        this.getChoices();

        this.getProfile({
            id: this.mailId
        });
    },
    mounted() {
        this.hasPermForm('company.mail.change_mail');
    },
    methods: {
        ...mapActions('companyMail', [
            'getChoices',
            'getProfile',
            'updateProfile'
        ]),
        submitUpdate() {
            this.updateProfile({
                id: this.mailId
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors));

            scroll(0, 0);
        }
    }
}
</script>
