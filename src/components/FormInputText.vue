<template>
    <input
        type="text"
        class="py-2 px-3 rounded-lg border"
        :value="modelValue"
        @input="updateModelValue(($event.target as HTMLInputElement).value)"
    >
</template>

<script lang="ts">
    import { inject } from 'vue';

    import { fieldInjectionKey, type FieldInject } from '@/types';

    export default {
        name: 'form-input-text',
        setup() {
            const {
                modelValue,
                updateModelValue,
            } = inject(fieldInjectionKey) as FieldInject;

            return {
                modelValue,
                updateModelValue,
            };
        },
    };
</script>
