<template>
    <input
        type="text"
        class="py-2 px-3 rounded-lg border"
        :value="modelValue"
        @input="updateModelValue($event.target.value)"
    >
</template>

<script lang="ts">
    import { inject } from 'vue';

    export default {
        name: 'form-input-text',
        setup() {
            const {
                modelValue,
                updateModelValue,
            } = inject('field');

            return {
                modelValue,
                updateModelValue,
            };
        },
    };
</script>
