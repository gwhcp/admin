<template>
    <div class="form-group"
         v-bind:class="{ 'required': $attrs.required }">
        <ValidationProvider :name="$attrs.label"
                            :rules="$attrs.rules"
                            :vid="$attrs.name"
                            v-slot="{ errors }">
            <label :for="$attrs.name"
                   class="font-weight-bold"> {{ $attrs.label }} </label>

            <ckeditor :config="editorConfig"
                      :editor="editor"
                      :id="$attrs.name"
                      :name="$attrs.name"
                      v-bind:class="{ 'is-invalid': errors[0] }"
                      v-model="innerValue"/>

            <div class="invalid-feedback">{{ errors[0] }}</div>

            <small class="form-text text-muted">{{ $attrs.description }}</small>
        </ValidationProvider>
    </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {ValidationProvider} from "vee-validate/dist/vee-validate.full.esm";
import Vue from 'vue';

Vue.use(CKEditor);

export default {
    name: 'InputWysiwyg',
    components: {
        ValidationProvider
    },
    props: {
        value: {
            type: null
        }
    },
    data: () => ({
        editor: ClassicEditor,
        editorConfig: {
            // The configuration of the editor.
        },
        innerValue: "",
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
