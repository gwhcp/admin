<template>
    <div>
        <CAlert :show.sync="successMessage"
                closeButton
                color="success">
            Email template has been updated.
        </CAlert>

        <CCard bodyWrapper>
            <static-data :value="formData.id"
                         name="Email Template ID"/>

            <static-data :datetime="formData.date_from"
                         name="Created Date"/>

            <static-data :value="formData.template_name"
                         name="Template"/>

            <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <input-text label="Sender"
                                name="sender"
                                required="true"
                                v-model="formData.sender"/>

                    <input-text label="Subject"
                                name="subject"
                                required="true"
                                v-model="formData.subject"/>

                    <input-wysiwyg label="Body"
                                   name="body"
                                   required="true"
                                   v-model="formData.body"/>

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
import StaticData from "@/components/StaticData";
import {InputText, InputWysiwyg} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheProfile',
    components: {
        InputText,
        InputWysiwyg,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            templateId: this.$route.params.id,
            successMessage: 0
        };
    },
    computed: {
        ...mapState('settingEmail', [
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getProfile({
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
        submitUpdate() {
            this.updateProfile({
                id: this.templateId
            })
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.successMessage = this.formSuccess);

            scroll(0, 0);
        }
    }
}
</script>
