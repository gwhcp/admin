<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'setting:email:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-text label="Sender"
                                    name="sender"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.sender"/>

                        <input-select :options="choices"
                                      label="Template"
                                      name="template"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.template"/>

                        <input-text label="Subject"
                                    name="subject"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.subject"/>

                        <input-wysiwyg label="Body"
                                       name="body"
                                       required="true"
                                       rules="required"
                                       v-model="formObj.body"/>

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
import {InputSelect, InputText, InputWysiwyg} from "@/components/form";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputText,
        InputWysiwyg,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    computed: {
        ...mapGetters('settingEmail', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('settingEmail', [
            'formObj'
        ])
    },
    created() {
        this.getChoices();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('settingEmail', [
            'createEmailTemplate',
            'formClean',
            'getChoices'
        ]),
        submitCreate() {
            this.loadingState = true;

            this.createEmailTemplate()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess ? this.$router.push({
                    name: 'setting:email:search'
                }) : false);
        }
    }
}
</script>
