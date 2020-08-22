<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Mail account has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formData.id"
                         name="Mail ID"/>

            <static-data :datetime="formData.date_from"
                         name="Created Date"/>

            <static-data :ahref="{name: 'company:company:profile', params:{id: formData.company}}"
                         :value="formData.company_name"
                         name="Company"
                         permission="company.company.view_company"/>

            <static-data :value="formData.domain_name"
                         name="Domain"/>

            <static-data :value="formData.mail_type_name"
                         name="Type"/>

            <static-data :value="formData.name"
                         name="Name"/>

            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-select :options="choiceAccount"
                                  :selected="formData.account"
                                  label="Account"
                                  name="account"
                                  required="true"
                                  rules="required"
                                  v-model="formData.account"/>

                    <input-text label="Forward To"
                                name="forward_to"
                                required="true"
                                rules="required"
                                v-if="formData.mail_type === 'forward'"
                                v-model="formData.forward_to"/>

                    <input-text label="Quota"
                                name="quota"
                                v-if="formData.mail_type === 'mailbox'"
                                v-model="formData.quota"/>

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
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

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
            mailId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('companyMail', [
            'choiceAccount',
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceAccount();

        this.getProfile({
            id: this.mailId
        });
    },
    mounted() {
        this.hasPermForm('company.mail.change_mail');
    },
    methods: {
        ...mapActions('companyMail', [
            'getChoiceAccount',
            'getProfile',
            'updateProfile'
        ]),
        submitUpdate() {
            this.loadingState = true;

            this.updateProfile({
                id: this.mailId
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
