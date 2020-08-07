<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'network:pool:search'}"
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
                                    v-model="formData.name"/>

                        <input-text label="Network"
                                    name="network"
                                    required="true"
                                    rules="required"
                                    v-model="formData.network"/>

                        <input-text label="Subnet"
                                    name="subnet"
                                    required="true"
                                    rules="required"
                                    v-model="formData.subnet"/>

                        <input-select :options="choiceAssigned"
                                      label="Assigned"
                                      name="assigned"
                                      required="true"
                                      rules="required"
                                      v-model="formData.assigned"/>
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
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputText,
        ValidationObserver
    },
    computed: {
        ...mapState('networkPool', [
            'choiceAssigned',
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceAssigned();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('networkPool', [
            'getChoiceAssigned',
            'createPool',
            'formClean'
        ]),
        submitCreate() {
            this.createPool()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({name: 'network:pool:search'}) : false);
        }
    }
}
</script>
