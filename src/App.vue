<template>
    <div class="m-4 p-4 inline-flex flex-col border rounded-lg shadow-sm border-gray-200 bg-white">
        <form>
            <form-input
                label="Firstname"
                :input-component="FormInputText"
                v-model="form.text"
            ></form-input>
            <form-input
                label="Firstname"
                :input-component="FormInputSelect"
                v-model="form.select"
            >
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
                <option value="option-3">Option 3</option>
            </form-input>
        </form>

        <pre>
{{ form }}
        </pre>
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
            const form = ref({
                text: 'val',
                select: 'option-2',
            });

            console.log(FormInputText);

            return {
                form,
                FormInputText,
                FormInputSelect,
            };
        },
    });
</script>
