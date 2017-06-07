export interface CoreOptions{
    isDisabled?: boolean;
    enabledContainers?: {[key: string]: boolean};
}

export const DefaultOptions: CoreOptions = {
	isDisabled: false
}
