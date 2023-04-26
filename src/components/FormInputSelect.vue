<template>
    <select
        class="py-2 pl-3 pr-8 rounded-lg border w-full bg-white"
        :value="modelValue"
        @change="updateModelValue(($event.target as HTMLInputElement).value)"
    >
        <option value="" disabled>Maak een keuze</option>
        <slot></slot>
    </select>
</template>

<script lang="ts">
    import { inject } from 'vue';

    import { fieldInjectionKey, type FieldInject } from '@/types';

    export default {
        name: 'form-input-select',
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
