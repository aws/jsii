///!MATCH_ERROR: Unable to resolve referenced type 'Base'. Missing export?
///!MATCH_ERROR: Base type of jsii.Derived is not a class or cannot be dereferenced (Base)

class Base {

}

export class Derived extends Base {

}