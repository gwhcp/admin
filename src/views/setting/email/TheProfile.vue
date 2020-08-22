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
import StaticData from "@/components/StaticData";
import {InputText, InputWysiwyg} from "@/components/form";
import Permission from "@/mixins/Permission";
import {mapActions, mapGetters, mapState} from "vuex";
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
                .then(() => this.$refs.observer.setErrors(this.formErrors));

            scroll(0, 0);
        }
    }
}
</script>
