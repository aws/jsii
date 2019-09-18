///!MATCH_ERROR:jsii.Implementation#property changes immutability of property when implementing jsii.IInterface

export interface IInterface {
    property: string;
}

export class Implementation implements IInterface {
    constructor(public readonly property: string) {}
}
