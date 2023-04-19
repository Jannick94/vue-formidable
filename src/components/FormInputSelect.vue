<template>
    <select
        class="py-2 pl-3 pr-8 rounded-lg border w-full bg-white"
        :value="modelValue"
        @change="updateModelValue($event.target?.value)"
    >
        <option value="" disabled>Maak een keuze</option>
        <slot></slot>
    </select>
</template>

<script lang="ts">
    import { inject } from 'vue';

    export default {
        name: 'form-input-select',
        setup() {
            const {
                // @ts-ignore
                modelValue,
                // @ts-ignore
                updateModelValue,
            } = inject('field');

            return {
                modelValue,
                updateModelValue,
            };
        },
    };
</script>
