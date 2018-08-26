// tslint:disable-next-line:comment-format
///!MATCH_ERROR: immutability changed from read-write (in jsii.IInterface) to readonly

export interface IInterface {
    property: string;
}

export class Implementation implements IInterface {
    constructor(public readonly property: string) {}
}
