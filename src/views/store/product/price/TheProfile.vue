<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Product price has been updated.
        </CAlert>

        <CTabs :active-tab="3"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: getProductUrl(productType, 'profile'), params: {id: productId}}"
                  title="Profile"/>

            <CTab :to="{name: getProductUrl(productType, 'resource'), params: {id: productId}}"
                  title="Resource"/>

            <CTab :to="{name: 'store:product:price:search', params: {productId: productId, type: productType}}"
                  title="Prices"/>

            <CTab title="Profile">
                <CCard bodyWrapper>
                    <CAlert color="info">
                        If a customer product is associated to this price then no changes can be made to the cost.
                    </CAlert>

                    <static-data :value="formObj.store_product"
                                 name="Product ID"/>

                    <static-data :value="formObj.id"
                                 name="Price ID"/>

                    <static-data :datetime="formObj.date_from"
                                 name="Created Date"/>

                    <static-data :text_right="'Month' | pluralize(formObj.billing_cycle)"
                                 :value="formObj.billing_cycle"
                                 name="Billing Cycle"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
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

                            <input-switch :checked="formObj.is_active"
                                          label="Status"
                                          name="is_active"
                                          v-model="formObj.is_active"/>

                            <input-switch :checked="formObj.is_hidden"
                                          label="Hidden"
                                          name="is_hidden"
                                          v-model="formObj.is_hidden"/>

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
            </CTab>
        </CTabs>
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";
import {InputSwitch, InputText} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Vue from "vue";
import VuePluralize from "vue-pluralize";
import Loading from "@/mixins/Loading";

Vue.use(VuePluralize);

export default {
    name: 'TheProfile',
    components: {
        InputSwitch,
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
            priceId: this.$route.params.id,
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
    created() {
        this.getProfile({
            id: this.priceId,
            productId: this.productId
        });
    },
    mounted() {
        this.hasPermForm('store.product.price.change_storeproductprice');
    },
    methods: {
        ...mapActions('storeProductPrice', [
            'getProfile',
            'updateProfile'
        ]),
        getProductUrl(value, route) {
            switch (value) {
                case 'domain':
                    return `store:product:${value}:${route}`;
            }
        },
        submitUpdate() {
            this.loadingState = true;

            this.updateProfile({
                id: this.priceId,
                productId: this.productId
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors));

            scroll(0, 0);
        }
    }
}
</script>
