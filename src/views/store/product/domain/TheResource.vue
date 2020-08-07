<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Domain product resources have been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{name: 'store:product:domain:profile', params: {id: productId}}"
                  title="Profile"/>

            <CTab :to="{name: 'store:product:domain:resource', params: {id: productId}}"
                  title="Resources">
                <CCard bodyWrapper>
                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-text label="Bandwidth"
                                        name="bandwidth"
                                        required="true"
                                        rules="required"
                                        v-model="formData.bandwidth"/>

                            <input-text label="Diskspace"
                                        name="diskspace"
                                        required="true"
                                        rules="required"
                                        v-model="formData.diskspace"/>

                            <input-text label="Cron Tab"
                                        name="cron_tab"
                                        required="true"
                                        rules="required"
                                        v-if="formData.has_cron"
                                        v-model="formData.cron_tab"/>

                            <input-text label="SFTP User"
                                        name="ftp_user"
                                        required="true"
                                        rules="required"
                                        v-model="formData.ftp_user"/>

                            <input-text label="IP Address"
                                        name="ipaddress"
                                        required="true"
                                        rules="required"
                                        v-if="formData.ipaddress_type === 'dedicated'"
                                        v-model="formData.ipaddress"/>

                            <input-text label="Domain"
                                        name="domain"
                                        required="true"
                                        rules="required"
                                        v-model="formData.domain"/>

                            <input-text label="Sub.Domain"
                                        name="sub_domain"
                                        required="true"
                                        rules="required"
                                        v-model="formData.sub_domain"/>

                            <input-text label="Mail Account"
                                        name="mail_account"
                                        required="true"
                                        rules="required"
                                        v-if="formData.has_mail"
                                        v-model="formData.mail_account"/>

                            <input-text label="Mailing List"
                                        name="mail_list"
                                        required="true"
                                        rules="required"
                                        v-if="formData.has_mail"
                                        v-model="formData.mail_list"/>

                            <input-text label="MySQL Database"
                                        name="mysql_database"
                                        required="true"
                                        rules="required"
                                        v-if="formData.has_mysql"
                                        v-model="formData.mysql_database"/>

                            <input-text label="MySQL User"
                                        name="mysql_user"
                                        required="true"
                                        rules="required"
                                        v-if="formData.has_mysql"
                                        v-model="formData.mysql_user"/>

                            <input-text label="PostgreSQL Database"
                                        name="postgresql_database"
                                        required="true"
                                        rules="required"
                                        v-if="formData.has_postgresql"
                                        v-model="formData.postgresql_database"/>

                            <input-text label="PostgreSQL User"
                                        name="postgresql_user"
                                        required="true"
                                        rules="required"
                                        v-if="formData.has_postgresql"
                                        v-model="formData.postgresql_user"/>

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

            <CTab :to="{name: 'store:product:domain:profile', params: {id: productId}}"
                  title="Prices"/>
        </CTabs>
    </div>
</template>

<script>
import {InputText} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapState} from "vuex";
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
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
