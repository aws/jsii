///!MATCH_ERROR: Unable to resolve referenced type 'Base'. Missing export?

class Base {

}

export class Derived extends Base {

}