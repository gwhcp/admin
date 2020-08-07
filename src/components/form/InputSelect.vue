<template>
    <div class="form-group"
         v-bind:class="{ 'required': $attrs.required }">
        <ValidationProvider :name="$attrs.label"
                            :rules="$attrs.rules"
                            :vid="$attrs.name"
                            v-slot="{ errors }">
            <label :for="$attrs.name"
                   class="font-weight-bold"> {{ $attrs.label }} </label>

            <select :id="$attrs.name"
                    :name="$attrs.name"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': errors[0] }"
                    v-model="innerValue">
                <option :value="innerValue"
                        selected
                        v-if="!innerValue">-- Select {{ $attrs.label }} --
                </option>

                <option :selected="innerValue === key"
                        :value="key"
                        v-bind:key="key"
                        v-for="(value, key) in $attrs.options">{{ value }}
                </option>
            </select>

            <div class="invalid-feedback">{{ errors[0] }}</div>

            <small class="form-text text-muted">{{ $attrs.description }}</small>
        </ValidationProvider>
    </div>
</template>

<script>
import {ValidationProvider} from "vee-validate/dist/vee-validate.full.esm";

export default {
    name: 'InputSelect',
    components: {
        ValidationProvider
    },
    props: {
        selected: null
    },
    computed: {
        value() {
            return this.selected;
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
        if (this.$attrs.selected) {
            this.innerValue = this.$attrs.selected;
        } else {
            this.innerValue = this.value;
        }
    }
};
</script>
