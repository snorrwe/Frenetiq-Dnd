export interface CoreOptions {
    isDisabled?: boolean;
    enabledContainers?: { [key: string]: boolean };
}

export const DefaultOptions: CoreOptions = {
    isDisabled: false
}

export let getDefaultOptionsCopy = (): CoreOptions => {
    let result = {};
    let keys = Object.keys(DefaultOptions);
    for (let key of keys) {
        result[key] = DefaultOptions[key]
    }
    return result;
}
