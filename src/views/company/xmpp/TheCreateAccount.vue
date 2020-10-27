<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'company:xmpp:search' }"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-select v-model="formObj.account_id"
                                      :options="choices.account"
                                      label="Account"
                                      name="account_id"
                                      required="true"
                                      rules="required"/>

                        <input-select v-model="formObj.group"
                                      :options="choices.group"
                                      label="Group"
                                      name="group"
                                      required="true"
                                      rules="required"/>

                        <input-password v-model="formObj.password"
                                        label="Password"
                                        name="password"
                                        required="true"
                                        rules="required"/>

                        <input-select v-model="formObj.server_id"
                                      :options="choices.server"
                                      label="Server"
                                      name="server_id"
                                      required="true"
                                      rules="required"/>

                        <CRow>
                            <CCol class="text-left"
                                  col="6">
                                <CButton :disabled="invalid"
                                         class="px-4"
                                         color="primary"
                                         @click="handleSubmit(submitCreate)">Create
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
import {InputPassword, InputSelect} from "@/components/form";
import Loading from "@/mixins/Loading";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheCreateAccount',
    components: {
        InputPassword,
        InputSelect,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
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
        await this.getChoices();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('companyXmpp', [
            'createAccount',
            'formClean',
            'getChoices'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createAccount();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'company:xmpp:search'
                })
            } else {
                this.$refs.observer.setErrors(this.formErrors);

                scroll(0, 0);

                this.loadingState = false;
            }
        }
    }
};
</script>
