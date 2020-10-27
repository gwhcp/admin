<template>
    <div>
        <CAlert :show="5"
                closeButton
                color="success"
                v-if="formSuccess">
            Email template has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formObj.id"
                         name="Email Template ID"/>

            <static-data :datetime="formObj.date_from"
                         name="Created Date"/>

            <static-data :value="formObj.template_name"
                         name="Template"/>

            <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-text label="Sender"
                                name="sender"
                                required="true"
                                v-model="formObj.sender"/>

                    <input-text label="Subject"
                                name="subject"
                                required="true"
                                v-model="formObj.subject"/>

                    <input-wysiwyg label="Body"
                                   name="body"
                                   required="true"
                                   v-model="formObj.body"/>

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
    </div>
</template>

<script>
import {InputText, InputWysiwyg} from "@/components/form";
import Loading from "@/mixins/Loading";
import Permission from "@/mixins/Permission";
import StaticData from "@/components/StaticData";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        InputText,
        InputWysiwyg,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        Permission
    ],
    data() {
        return {
            templateId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('settingEmail', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('settingEmail', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.templateId
        });
    },
    mounted() {
        this.hasPermForm('setting.email.change_emailtemplate');
    },
    methods: {
        ...mapActions('settingEmail', [
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
                id: this.templateId
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
