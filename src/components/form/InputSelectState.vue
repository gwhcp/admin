<template>
    <div class="form-group"
         v-bind:class="{ 'required': $attrs.required }">
        <ValidationProvider :name="$attrs.label"
                            :rules="$attrs.rules"
                            :vid="$attrs.name"
                            v-slot="{ errors }">
            <label :for="$attrs.name"
                   class="font-weight-bold"> {{ $attrs.label }} </label>

            <region-select :country="$attrs.country"
                           :region="innerValue"
                           className="form-control"
                           v-bind:class="{ 'is-invalid': errors[0] }"
                           v-bind:key="innerValue"
                           v-model="innerValue"/>

            <div class="invalid-feedback">{{ errors[0] }}</div>

            <small class="form-text text-muted">{{ $attrs.description }}</small>
        </ValidationProvider>
    </div>
</template>

<script>
import {ValidationProvider} from "vee-validate/dist/vee-validate.full.esm";
import Vue from "vue";
import vueCountryRegionSelect from "vue-country-region-select";

Vue.use(vueCountryRegionSelect)

export default {
    name: 'InputSelectState',
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
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit("input", newVal);
        },
        // Handles external model changes.
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
