<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'store:product:domain:search' }"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-select :options="choices.company"
                                      label="Company"
                                      name="company"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.company"/>

                        <input-text label="Name"
                                    name="name"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.name"/>

                        <input-switch label="Cron"
                                      name="has_cron"
                                      v-model="formObj.has_cron"/>

                        <input-switch label="Mail"
                                      name="has_mail"
                                      v-model="formObj.has_mail"/>

                        <input-switch label="MySQL"
                                      name="has_mysql"
                                      v-model="formObj.has_mysql"/>

                        <input-switch label="PostgreSQL"
                                      name="has_postgresql"
                                      v-model="formObj.has_postgresql"/>

                        <input-select :options="choices.ip_type"
                                      label="IP Address Type"
                                      name="ipaddress_type"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.ipaddress_type"/>

                        <input-select :options="choices.web"
                                      label="Web Type"
                                      name="web_type"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.web_type"/>

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
import Loading from "@/mixins/Loading";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputSwitch,
        InputText,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    computed: {
        ...mapGetters('storeProduct', [
            'choices'
        ]),
        ...mapGetters('storeProductDomain', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('storeProductDomain', [
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
        ...mapActions('storeProduct', [
            'getChoices'
        ]),
        ...mapActions('storeProductDomain', [
            'createProduct',
            'formClean'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createProduct();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'store:product:domain:search'
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
