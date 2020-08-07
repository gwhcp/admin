<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{name: 'hardware:client:search'}"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CCard bodyWrapper>
                        <input-select :options="choiceDomain"
                                      label="Domain"
                                      name="domain"
                                      required="true"
                                      rules="required"
                                      v-model="formData.domain"/>

                        <input-text label="IP Address"
                                    name="ip"
                                    required="true"
                                    rules="required"
                                    v-model="formData.ip"/>

                        <input-select :options="choiceHardware"
                                      @input="hardwareChange"
                                      label="Hardware"
                                      name="hardware_type"
                                      required="true"
                                      rules="required"
                                      v-model="formData.hardware_type"/>

                        <input-select :options="choiceTarget"
                                      :selected="selected_target"
                                      @input="targetChange"
                                      label="Target"
                                      name="target_type"
                                      required="true"
                                      rules="required"
                                      v-model="formData.target_type"/>

                        <input-switch label="Domain"
                                      name="is_domain"
                                      v-model="formData.is_domain"
                                      v-show="has_domain"/>

                        <input-select :options="choiceWeb"
                                      label="Web Type"
                                      name="web_type"
                                      required="true"
                                      rules="required"
                                      v-if="formData.is_domain"
                                      v-model="formData.web_type"
                                      v-show="has_web_type"/>

                        <input-switch label="Mail"
                                      name="is_mail"
                                      v-model="formData.is_mail"
                                      v-show="has_mail"/>

                        <input-switch label="MySQL"
                                      name="is_mysql"
                                      v-model="formData.is_mysql"
                                      v-show="has_mysql"/>

                        <input-switch label="PostgreSQL"
                                      name="is_postgresql"
                                      v-model="formData.is_postgresql"
                                      v-show="has_postgresql"/>

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
import {InputSelect, InputSwitch, InputText} from "@/components/form";
import {mapActions, mapState} from "vuex";
import {ValidationObserver} from "vee-validate";

export default {
    name: 'TheCreate',
    components: {
        InputSelect,
        InputSwitch,
        InputText,
        ValidationObserver
    },
    data() {
        return {
            has_domain: false,
            has_mail: false,
            has_mysql: false,
            has_postgresql: false,
            has_web_type: false,
            selected_target: null
        };
    },
    computed: {
        ...mapState('hardwareClient', [
            'choiceDomain',
            'choiceHardware',
            'choiceTarget',
            'choiceWeb',
            'formData',
            'formErrors',
            'formSuccess'
        ])
    },
    created() {
        this.getChoiceDomain();

        this.getChoiceHardware();

        this.getChoiceTarget();

        this.getChoiceWeb();
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('hardwareClient', [
            'createHardware',
            'formClean',
            'getChoiceDomain',
            'getChoiceHardware',
            'getChoiceTarget',
            'getChoiceWeb'
        ]),
        submitCreate() {
            this.createHardware()
                .then(() => this.$refs.observer.setErrors(this.formErrors))
                .then(() => this.formSuccess > 0 ? this.$router.push({name: 'hardware:client:search'}) : false);
        },
        hardwareChange(value) {
            let target_type = document.getElementById('target_type');

            switch (value) {
                case 'dedicated':
                    target_type.querySelector('option[value="domain"]').style.display = "block";
                    target_type.querySelector('option[value="mail"]').style.display = "block";
                    target_type.querySelector('option[value="mysql"]').style.display = "block";
                    target_type.querySelector('option[value="postgresql"]').style.display = "block";

                    this.selected_target = 'domain';

                    target_type.querySelector('option[value="managed"]').style.display = "none";
                    target_type.querySelector('option[value="unmanaged"]').style.display = "none";

                    this.has_domain = false;
                    this.has_mail = false;
                    this.has_mysql = false;
                    this.has_postgresql = false;
                    this.has_web_type = false;

                    break;

                case 'private':
                    target_type.querySelector('option[value="managed"]').style.display = "block";
                    target_type.querySelector('option[value="unmanaged"]').style.display = "block";

                    this.selected_target = 'managed';

                    target_type.querySelector('option[value="domain"]').style.display = "none";
                    target_type.querySelector('option[value="mail"]').style.display = "none";
                    target_type.querySelector('option[value="mysql"]').style.display = "none";
                    target_type.querySelector('option[value="postgresql"]').style.display = "none";

                    this.has_domain = false;
                    this.has_mail = false;
                    this.has_mysql = false;
                    this.has_postgresql = false;
                    this.has_web_type = false;

                    break;

                default:
                    Array.from(document.querySelector('#target_type').options).forEach(function (option_element) {
                        option_element.style.display = "none";
                    });
            }
        },
        targetChange(value) {
            let is_domain = document.getElementById('is_domain');

            switch (value) {
                case 'domain':
                    this.formData.is_domain = true;
                    this.has_domain = false;
                    is_domain.checked = true;
                    this.has_web_type = true;

                    break;

                case 'mail':
                case 'mysql':
                case 'postgresql':
                    is_domain.checked = false;
                    this.formData.is_domain = false;
                    this.has_domain = false;
                    this.has_web_type = false;

                    break;

                case 'managed':
                    is_domain.checked = false;
                    this.has_domain = false;
                    this.has_mail = false;
                    this.has_mysql = false;
                    this.has_postgresql = false;
                    this.has_web_type = false;

                    break;

                case 'unmanaged':
                    this.formData.is_domain = false;
                    this.has_domain = true;
                    is_domain.checked = false;
                    this.has_mail = true;
                    this.has_mysql = true;
                    this.has_postgresql = true;
                    this.has_web_type = true;

                    break;
            }
        }
    }
}
</script>
