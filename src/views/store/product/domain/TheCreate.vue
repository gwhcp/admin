<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'store:product:domain:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-select :options="choiceCompany"
                                      label="Company"
                                      name="company"
                                      required="true"
                                      rules="required"
                                      v-model="formData.company"/>

                        <input-text label="Name"
                                    name="name"
                                    required="true"
                                    rules="required"
                                    v-model="formData.name"/>

                        <input-switch label="Cron"
                                      name="has_cron"
                                      v-model="formData.has_cron"/>

                        <input-switch label="Mail"
                                      name="has_mail"
                                      v-model="formData.has_mail"/>

                        <input-switch label="MySQL"
                                      name="has_mysql"
                                      v-model="formData.has_mysql"/>

                        <input-switch label="PostgreSQL"
                                      name="has_postgresql"
                                      v-model="formData.has_postgresql"/>

                        <input-select :options="choiceIp"
                                      label="IP Address Type"
                                      name="ipaddress_type"
                                      required="true"
                                      rules="required"
                                      v-model="formData.ipaddress_type"/>

                        <input-select :options="choiceWeb"
                                      label="Web Type"
                                      name="web_type"
                                      required="true"
                                      rules="required"
                                      v-model="formData.web_type"/>

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
import {InputSelect, InputSwitch, InputText} from "@/components/form";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputSwitch,
        InputText,
        ValidationObserver
    },
    computed: {
        ...mapState('storeProduct', [
            'choiceCompany',
            'choiceIp',
            'choiceWeb'
        ]),
        ...mapState('storeProductDomain', [
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceCompany();

        this.getChoiceIp();

        this.getChoiceWeb();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('storeProduct', [
            'getChoiceCompany',
            'getChoiceIp',
            'getChoiceWeb'
        ]),
        ...mapActions('storeProductDomain', [
            'createProduct',
            'formClean'
        ]),
        submitCreate() {
            this.createProduct()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({name: 'store:product:domain:search'}) : false);
        }
    }
}
</script>
