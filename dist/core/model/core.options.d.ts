export interface CoreOptions {
    isDisabled?: boolean;
    enabledContainers?: {
        [key: string]: boolean;
    };
}
export declare const DefaultOptions: CoreOptions;
export declare let getDefaultOptionsCopy: () => CoreOptions;
