<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Domain product has been updated.
        </CAlert>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formObj.id"
                                 name="Product ID"/>

                    <static-data :datetime="formObj.date_from"
                                 name="Created Date"/>

                    <static-data :ahref="{ name: 'company:company:profile', params: { id: formObj.company } }"
                                 :value="formObj.company_name"
                                 name="Company"
                                 permission="company.company.view_company"/>

                    <static-data :value="formObj.name"
                                 name="Name"/>

                    <static-data :value="formObj.hardware_type_name"
                                 name="Hardware Type"/>

                    <static-data :value="formObj.product_type_name"
                                 name="Product Type"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-switch :checked="formObj.is_active"
                                          label="Status"
                                          name="is_active"
                                          v-model="formObj.is_active"/>

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

            <CTab :to="{ name: 'store:product:domain:resource', params: { id: productId } }"
                  title="Resources"/>

            <CTab :to="{ name: 'store:product:price:search', params: { productId: productId, type: 'domain' } }"
                  title="Prices"
                  v-if="this.hasPerm('store.product.price.view_storeproductprice')"/>
        </CTabs>
    </div>
</template>

<script>
import {InputSwitch} from "@/components/form";
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        InputSwitch,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            productId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('storeProductDomain', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('storeProductDomain', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
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
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
                id: this.productId
            });

            if (!this.formSuccess) {
                this.$refs.observer.setErrors(this.formErrors);
            }

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
