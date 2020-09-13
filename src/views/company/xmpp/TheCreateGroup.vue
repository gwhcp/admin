<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'company:xmpp:search:group'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-text v-model="formObj.name"
                                    label="Name"
                                    name="name"
                                    required="true"
                                    rules="required"/>

                        <CRow>
                            <CCol class="text-left"
                                  col="6">
                                <CButton :disabled="invalid"
                                         class="px-4"
                                         color="primary"
                                         @click="handleSubmit(submitCreate)">Create
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
import {InputText} from "@/components/form";
import {mapActions, mapGetters, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheCreateGroup',
    components: {
        InputText,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    computed: {
        ...mapGetters('companyXmpp', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('companyXmpp', [
            'formObj'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('companyXmpp', [
            'createGroup',
            'formClean'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createGroup();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'company:xmpp:search:group'
                })
            } else {
                this.$refs.observer.setErrors(this.formErrors);

                scroll(0, 0);

                this.loadingState = false;
            }
        }
    }
};
</script>
