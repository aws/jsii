// tslint:disable-next-line:comment-format
///!MATCH_ERROR: changes immutability of property when implementing jsii.IInterface

export interface IInterface {
    property: string;
}

export class Implementation implements IInterface {
    constructor(public readonly property: string) {}
}
