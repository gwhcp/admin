<template>
    <div class="form-group"
         v-bind:class="{ 'required': $attrs.required }">
        <ValidationProvider :name="$attrs.label"
                            :rules="$attrs.rules"
                            :vid="$attrs.name"
                            v-slot="{ errors }">
            <CInput :description="$attrs.description"
                    :id="$attrs.name"
                    :invalidFeedback="errors[0]"
                    :isValid="function() { if (errors[0]) { return false } else { return null } }"
                    :label="$attrs.label"
                    :name="$attrs.name"
                    :placeholder="$attrs.label"
                    :wasValidated="false"
                    addLabelClasses="font-weight-bold"
                    type="password"
                    v-model="innerValue">
            </CInput>
        </ValidationProvider>
    </div>
</template>

<script>
import {ValidationProvider} from "vee-validate/dist/vee-validate.full.esm";

export default {
    name: 'InputPassword',
    components: {
        ValidationProvider
    },
    props: {
        value: {
            type: null
        }
    },
    data: () => ({
        innerValue: ""
    }),
    watch: {
        innerValue(newVal) {
            this.$emit("input", newVal);
        },
        value(newVal) {
            this.innerValue = newVal;
        }
    },
    created() {
        if (this.value) {
            this.innerValue = this.value;
        }
    }
};
</script>
