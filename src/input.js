import { defineComponent, ref } from 'vue';

const FormPlugin = {
    install(app) {
        app.component('FormInput', defineComponent({
            props: {
                label: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                value: {
                    type: [String, Number, Boolean],
                    default: '',
                },
                type: {
                    type: String,
                    default: 'text',
                },
                options: {
                    type: Array,
                    default: () => [],
                },
                rules: {
                    type: Array,
                    default: () => [],
                },
            },
            setup(props) {
                const validationErrors = ref([]);
                const dirty = ref(false);
                const validating = ref(false);
                const inputComponent = import(`@/components/FormInput${props.type.charAt(0).toUpperCase()}${props.type.slice(1)}.vue`);

                async function validate() {
                    validationErrors.value = [];

                    for (const rule of props.rules) {
                        if (rule === 'required' && !props.value) {
                            validationErrors.value.push(`${props.label} is required.`);
                        }

                        if (typeof rule === 'function') {
                            try {
                                validating.value = true;
                                const result = await rule(props.value);

                                if (typeof result === 'string') {
                                    validationErrors.value.push(result);
                                }
                            } catch (error) {
                                console.error(error);
                                validationErrors.value.push('Validation failed.');
                            } finally {
                                validating.value = false;
                            }
                        }
                    }

                    dirty.value = true;
                }

                return {
                    validationErrors,
                    dirty,
                    validating,
                    validate,
                    inputComponent,
                };
            },
            template: `
            <div>
            <label :for="name">{{ label }}</label>
            <component :is="inputComponent"
            :id="name"
            :name="name"
            :value="value"
            :type="type"
            :options="options"
            :checked="value"
            @input="validate"
            ></component>
            <ul v-if="dirty">
            <li v-for="error in validationErrors" :key="error">{{ error }}</li>
            </ul>
            <span v-if="validating">Validating...</span>
            </div>
            `,
        }));
    },
};

export default FormPlugin;
