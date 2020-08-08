<template>
    <CTabs :active-tab="3"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: getProductUrl(productType, 'profile'), params: {id: productId}}"
              title="Profile"/>

        <CTab :to="{name: getProductUrl(productType, 'resource'), params: {id: productId}}"
              title="Resource"/>

        <CTab :to="{name: 'store:product:price:search', params: {productId: productId, type: productType}}"
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
                                    v-model="formData.billing_cycle"/>

                        <input-text label="Base Price"
                                    name="base_price"
                                    required="true"
                                    rules="required"
                                    v-model="formData.base_price"/>

                        <input-text label="Setup Price"
                                    name="setup_price"
                                    required="true"
                                    rules="required"
                                    v-model="formData.setup_price"/>

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
import StaticData from "@/components/StaticData";
import {InputText} from "@/components/form";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputText,
        StaticData,
        ValidationObserver
    },
    data() {
        return {
            productId: this.$route.params.productId,
            productType: this.$route.params.type
        };
    },
    computed: {
        ...mapState('storeProductPrice', [
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    mounted() {
        this.formData.billing_cycle = 0;

        this.formData.base_price = '0.00';

        this.formData.setup_price = '0.00';
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
        submitCreate() {
            this.formData['store_product'] = this.productId;

            this.createPrice()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({
                    name: 'store:product:price:search',
                    params: {
                        productId: this.productId
                    }
                }) : false);
        }
    }
}
</script>
