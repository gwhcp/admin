<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Domain product resources have been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: 'store:product:domain:profile', params: {id: productId}}"
                  title="Profile"/>

            <CTab title="Resources">
                <CCard bodyWrapper>
                    <CAlert color="info">
                        If a customer product is associated to this store product then resources can only be upgraded.
                    </CAlert>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-text label="Bandwidth"
                                        name="bandwidth"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.bandwidth"/>

                            <input-text label="Diskspace"
                                        name="diskspace"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.diskspace"/>

                            <input-text label="Domain"
                                        name="domain"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.domain"/>

                            <input-text label="Sub.Domain"
                                        name="sub_domain"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.sub_domain"/>

                            <input-text label="SFTP User"
                                        name="ftp_user"
                                        required="true"
                                        rules="required"
                                        v-model="formObj.ftp_user"/>

                            <input-text label="Cron Tab"
                                        name="cron_tab"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.has_cron"
                                        v-model="formObj.cron_tab"/>

                            <input-text label="IP Address"
                                        name="ipaddress"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.ipaddress_type === 'dedicated'"
                                        v-model="formObj.ipaddress"/>

                            <input-text label="Mail Account"
                                        name="mail_account"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.has_mail"
                                        v-model="formObj.mail_account"/>

                            <input-text label="Mailing List"
                                        name="mail_list"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.has_mail"
                                        v-model="formObj.mail_list"/>

                            <input-text label="MySQL Database"
                                        name="mysql_database"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.has_mysql"
                                        v-model="formObj.mysql_database"/>

                            <input-text label="MySQL User"
                                        name="mysql_user"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.has_mysql"
                                        v-model="formObj.mysql_user"/>

                            <input-text label="PostgreSQL Database"
                                        name="postgresql_database"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.has_postgresql"
                                        v-model="formObj.postgresql_database"/>

                            <input-text label="PostgreSQL User"
                                        name="postgresql_user"
                                        required="true"
                                        rules="required"
                                        v-if="formObj.has_postgresql"
                                        v-model="formObj.postgresql_user"/>

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

            <CTab :to="{name: 'store:product:price:search', params: {productId: productId, type: 'domain'}}"
                  title="Prices"
                  v-if="this.hasPerm('store.product.price.view_storeproductprice')"/>
        </CTabs>
    </div>
</template>

<script>
import {InputText} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheResource',
    components: {
        InputText,
        ValidationObserver
    },
    mixins: [
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
    created() {
        this.getResource({
            id: this.productId
        });
    },
    mounted() {
        this.hasPermForm('store.product.change_storeproduct');
    },
    methods: {
        ...mapActions('storeProductDomain', [
            'getResource',
            'updateResource'
        ]),
        submitUpdate() {
            this.updateResource({
                id: this.productId
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors));

            scroll(0, 0);
        }
    }
}
</script>
