<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'setting:banned:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-text label="Name"
                                    name="name"
                                    required="true"
                                    rules="required"
                                    v-model="formObj.name"/>

                        <input-select :options="choices"
                                      label="Type"
                                      name="banned_type"
                                      required="true"
                                      rules="required"
                                      v-model="formObj.banned_type"/>
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
import {InputSelect, InputText} from "@/components/form";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputText,
        ValidationObserver
    },
    computed: {
        ...mapGetters('settingBanned', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('settingBanned', [
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
        ...mapActions('settingBanned', [
            'createBanned',
            'formClean',
            'getChoices'
        ]),
        submitCreate() {
            this.createBanned()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess ? this.$router.push({
                    name: 'setting:banned:search'
                }) : false);
        }
    }
}
</script>
