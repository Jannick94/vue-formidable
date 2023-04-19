<template>
    <div class="m-4 p-4 inline-flex flex-col border rounded-lg shadow-sm border-gray-200 bg-white">
        <form>
            <form-input
                label="Firstname"
                :input-component="FormInputText"
                v-model="textValue"
            ></form-input>
            <form-input
                label="Firstname"
                :input-component="FormInputSelect"
                v-model="selectValue"
            >
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
                <option value="option-3">Option 3</option>
            </form-input>
        </form>
    </div>
</template>

<script lang="ts">
    import {
        ref,
        defineComponent,
    } from 'vue';

    import FormInput from '@/components/FormInput.vue';
    import FormInputText from '@/components/FormInputText.vue';
    import FormInputSelect from '@/components/FormInputSelect.vue';

    export default defineComponent({
        name: 'app',
        components: {
            FormInput,
        },
        setup() {
            const textValue = ref('value');
            const selectValue = ref('option-2');

            return {
                textValue,
                selectValue,
                FormInputText,
                FormInputSelect,
            };
        },
    });
</script>
