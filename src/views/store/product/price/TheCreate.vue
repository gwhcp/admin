<template>
    <CTabs :active-tab="3"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: getProductUrl(productType, 'profile'), params: { id: productId } }"
              title="Profile"/>

        <CTab :to="{ name: getProductUrl(productType, 'resource'), params: { id: productId } }"
              title="Resource"/>

        <CTab :to="{ name: 'store:product:price:search', params: { productId: productId, type: productType } }"
              title="Prices"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <static-data :value="productId"
                                     name="Product ID"/>

                        <input-text label="Billing Cycle"
                                    name="billing_cycle"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.billing_cycle"/>

                        <input-text label="Base Price"
                                    name="base_price"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.base_price"/>

                        <input-text label="Setup Price"
                                    name="setup_price"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.setup_price"/>

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
import {InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import StaticData from "@/components/StaticData";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheCreate',
    components: {
        InputText,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    data() {
        return {
            productId: this.$route.params.productId,
            productType: this.$route.params.type
        };
    },
    computed: {
        ...mapGetters('storeProductPrice', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('storeProductPrice', [
            'formObj'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    mounted() {
        this.formObj.billing_cycle = 0;

        this.formObj.base_price = '0.00';

        this.formObj.setup_price = '0.00';
    },
    methods: {
        ...mapActions('storeProductPrice', [
            'createPrice',
            'formClean'
        ]),
        getProductUrl(value, route) {
            switch (value) {
                case 'domain':
                    return `store:product:${value}:${route}`;
            }
        },
        async submitCreate() {
            this.loadingState = true;

            this.formObj['store_product'] = this.productId;

            await this.createPrice();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'store:product:price:search',
                    params: {
                        productId: this.productId
                    }
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
