import type { InjectionKey, Ref } from 'vue';

export type ModelValue = string|number|boolean|Ref<string|number|boolean>;
export type ValidatorResult = {
    name: string,
    valid: boolean,
};

export type FieldInject = {
    modelValue: ModelValue,
    updateModelValue: Function,
}

export const fieldInjectionKey = Symbol() as InjectionKey<FieldInject>;
