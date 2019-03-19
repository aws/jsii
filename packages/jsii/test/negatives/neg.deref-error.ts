///!MATCH_ERROR: Unable to resolve referenced type 'Base'. Type may be @internal or unexported

class Base {

}

export class Derived extends Base {

}