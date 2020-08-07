export interface IVeryBaseInterface {
    foo(): void;
}

export interface VeryBaseProps {
    readonly foo: Very;
}

/**
 * Something here
 * @experimental
 */
export class Very {
    public hey() {
        return 42;
    }
}
