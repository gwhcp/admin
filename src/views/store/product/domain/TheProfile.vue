<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Domain product has been updated.
        </CAlert>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formData.id"
                                 name="Product ID"/>

                    <static-data :datetime="formData.date_from"
                                 name="Created Date"/>

                    <static-data :ahref="{name: 'company:company:profile', params:{id: formData.company}}"
                                 :value="formData.company_name"
                                 name="Company"
                                 permission="company.company.view_company"/>

                    <static-data :value="formData.name"
                                 name="Name"/>

                    <static-data :value="formData.hardware_type_name"
                                 name="Hardware Type"/>

                    <static-data :value="formData.product_type_name"
                                 name="Product Type"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-switch :checked="formData.is_active"
                                          label="Status"
                                          name="is_active"
                                          v-model="formData.is_active"/>

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

            <CTab :to="{name: 'store:product:domain:resource', params: {id: productId}}"
                  title="Resources"/>

            <CTab :to="{name: 'store:product:price:search', params: {productId: productId, type: 'domain'}}"
                  title="Prices"
                  v-if="this.hasPerm('store.product.price.view_storeproductprice')"/>
        </CTabs>
    </div>
</template>

<script>
import StaticData from "@/components/StaticData";
import {InputSwitch} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheProfile',
    components: {
        InputSwitch,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            productId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('storeProductDomain', [
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getProfile({
            id: this.productId
        });
    },
    mounted() {
        this.hasPermForm('store.product.change_storeproduct');
    },
    methods: {
        ...mapActions('storeProductDomain', [
            'getProfile',
            'updateProfile'
        ]),
        submitUpdate() {
            this.updateProfile({
                id: this.productId
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
