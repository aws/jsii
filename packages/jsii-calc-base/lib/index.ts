import { VeryBaseProps } from '@scope/jsii-calc-base-of-base';

/**
 * A base class.
 */
export abstract class Base {
    /**
     * @returns the name of the class (to verify native type names are created for derived classes).
     */
    public typeName() {
        return (this.constructor as any).name;
    }
}

export interface BaseProps extends VeryBaseProps {
    readonly bar: string;
}
