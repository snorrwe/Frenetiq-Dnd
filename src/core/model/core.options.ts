export interface CoreOptions{
    isDisabled?: boolean;
    containerTags?: {[key: string]: boolean};
}

export const DefaultOptions: CoreOptions = {
	isDisabled: false
}
