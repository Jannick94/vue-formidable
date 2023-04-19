<template>
    <div class="mb-2">
        <label class="block mb-1">{{ label }}</label>
        <component :is="inputComponent">
            <slot></slot>
        </component>
        <span
            class="block text-xs mt-1 text-red-500"
            v-for="result in validatorResults"
            :key="result.name"
        >
            {{ result.name }}
        </span>
    </div>
</template>

<script lang="ts">
    import { provide, ref, toRefs, type Ref } from 'vue';

    type ModelValue = string|number|boolean;
    type ValidatorResult = {
        name: string,
        valid: boolean,
    };

    export default {
        name: 'form-input',
        props: {
            modelValue: {
                type: [String, Number, Boolean],
                default: '',
            },
            label: {
                type: String,
                default: '',
            },
            inputComponent: {
                type: Object,
                default() {
                    return {};
                },
            },
            validators: {
                type: String,
                default: '',
            },
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const { modelValue } = toRefs(props);
            const validatorResults: Ref<{
                [key: string]: ValidatorResult
            }> = ref({});

            async function required(value: ModelValue) {
                return !!value;
            }

            function minLength(value: ModelValue) {
                return value.toString().length > 3;
            }

            let controller: AbortController|undefined = undefined
            let timeout: number|undefined = undefined;

            async function endpoint(value: ModelValue): Promise<boolean> {
                return new Promise((resolve) => {
                    if (controller) {
                        clearTimeout(timeout);
                    }

                    controller = new AbortController();

                    timeout = setTimeout(() => {
                        if (value.toString().length > 5) {
                            resolve(true);

                            return;
                        }

                        resolve(false);
                    }, 1000);
                });
            }

            async function validateField(value: ModelValue) {
                // convert validators prop to their validation methods.
                const rules = [required, minLength, endpoint];

                rules.forEach(async (rule) => {
                    const valid = await rule(value);

                    if (valid) {
                        delete validatorResults.value[rule.name];

                        return;
                    }

                    validatorResults.value[rule.name] = {
                        name: rule.name,
                        valid,
                    }
                });
            }

            async function updateModelValue(value: ModelValue) {
                emit('update:modelValue', value);

                validateField(value);
            }

            provide('field', {
                modelValue,
                updateModelValue,
            });

            return {
                updateModelValue,
                validatorResults,
            };
        },
    };
</script>
