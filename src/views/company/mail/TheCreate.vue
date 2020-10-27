<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'company:mail:search' }"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-select :options="choices.account"
                                      label="Account"
                                      name="account"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.account"/>

                        <input-select :options="choices.company"
                                      label="Company"
                                      name="company"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.company"/>

                        <input-select :options="choices.domain"
                                      label="Domain"
                                      name="domain"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.domain"/>

                        <input-select :options="choices.type"
                                      @input="typeChange"
                                      label="Type"
                                      name="mail_type"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.mail_type"/>

                        <input-text label="Name"
                                    name="name"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.name"/>

                        <input-text label="Forward To"
                                    name="forward_to"
                                    required="true"
                                    rules="required"
                                    v-if="formObj.is_forward"
                                    v-model="formObj.forward_to"
                                    v-show="has_forward_to"/>

                        <input-password label="Password"
                                        name="password"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.is_mailbox"
                                        v-model="formObj.password"
                                        v-show="has_password"/>

                        <input-text label="Quota"
                                    name="quota"
                                    v-if="formObj.is_mailbox"
                                    v-model="formObj.quota"
                                    v-show="has_quota"/>

                        <CRow>
                            <CCol class="text-left"
                                  col="6">
                                <CButton :disabled="invalid"
                                         @click="handleSubmit(submitCreate)"
                                         class="px-4"
                                         color="primary">Create
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCard>
                </CForm>
            </ValidationObserver>
        </CTab>
    </CTabs>
</template>

<script>
import {InputPassword, InputSelect, InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheCreate',
    components: {
        InputPassword,
        InputSelect,
        InputText,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    data() {
        return {
            has_forward_to: false,
            has_password: false,
            has_quota: false
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
        await this.getChoices();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('companyMail', [
            'createMail',
            'formClean',
            'getChoices'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createMail();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'company:mail:search'
                })
            } else {
                this.$refs.observer.setErrors(this.formErrors);

                scroll(0, 0);

                this.loadingState = false;
            }
        },
        typeChange(value) {
            switch (value) {
                case 'forward':
                    this.has_forward_to = true;
                    this.has_password = false;
                    this.has_quota = false;

                    this.formObj.is_forward = true;
                    this.formObj.is_mailbox = false;

                    break;

                case 'mailbox':
                    this.has_forward_to = false;
                    this.has_password = true;
                    this.has_quota = true;

                    this.formObj.is_forward = false;
                    this.formObj.is_mailbox = true;

                    break;

                default:
                    this.has_forward_to = false;
                    this.has_password = false;
                    this.has_quota = false;
            }
        }
    }
};
</script>
