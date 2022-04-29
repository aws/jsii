# API Reference

**Classes**

Name|Description
----|-----------
[Construct](#constructs-construct)|Represents the building block of the construct graph.
[Dependable](#constructs-dependable)|Trait for IDependable.
[DependencyGroup](#constructs-dependencygroup)|A set of constructs to be used as a dependable.
[Node](#constructs-node)|Represents the construct node in the scope tree.


**Structs**

Name|Description
----|-----------
[MetadataEntry](#constructs-metadataentry)|An entry in the construct metadata table.
[MetadataOptions](#constructs-metadataoptions)|Options for `construct.addMetadata()`.


**Interfaces**

Name|Description
----|-----------
[IConstruct](#constructs-iconstruct)|Represents a construct.
[IDependable](#constructs-idependable)|Trait marker for classes that can be depended upon.
[IValidation](#constructs-ivalidation)|Implement this interface in order for the construct to be able to validate itself.


**Enums**

Name|Description
----|-----------
[ConstructOrder](#constructs-constructorder)|In what order to return constructs.



## class Construct  <a id="constructs-construct"></a>

Represents the building block of the construct graph.

All constructs besides the root construct must be created within the scope of
another construct.

__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)

### Initializer


Creates a new construct node.

```ts
new Construct(scope: Construct, id: string)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  The scope in which to define this construct.
* **id** (<code>string</code>)  The scoped construct ID.



### Properties


Name | Type | Description 
-----|------|-------------
**node** | <code>[Node](#constructs-node)</code> | The tree node.

### Methods


#### toString() <a id="constructs-construct-tostring"></a>

Returns a string representation of this construct.

```ts
toString(): string
```


__Returns__:
* <code>string</code>

#### *static* isConstruct(x) <a id="constructs-construct-isconstruct"></a>

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

```ts
static isConstruct(x: any): boolean
```

* **x** (<code>any</code>)  Any object.

__Returns__:
* <code>boolean</code>



## class Dependable 🔹 <a id="constructs-dependable"></a>

Trait for IDependable.

Traits are interfaces that are privately implemented by objects. Instead of
showing up in the public interface of a class, they need to be queried
explicitly. This is used to implement certain framework features that are
not intended to be used by Construct consumers, and so should be hidden
from accidental use.


### Initializer




```ts
new Dependable()
```




### Properties


Name | Type | Description 
-----|------|-------------
**dependencyRoots**🔹 | <code>Array<[IConstruct](#constructs-iconstruct)></code> | The set of constructs that form the root of this dependable.

### Methods


#### *static* get(instance)⚠️ <a id="constructs-dependable-get"></a>

Return the matching Dependable for the given class instance.

```ts
static get(instance: IDependable): Dependable
```

* **instance** (<code>[IDependable](#constructs-idependable)</code>)  *No description*

__Returns__:
* <code>[Dependable](#constructs-dependable)</code>

#### *static* implement(instance, trait)🔹 <a id="constructs-dependable-implement"></a>

Turn any object into an IDependable.

```ts
static implement(instance: IDependable, trait: Dependable): void
```

* **instance** (<code>[IDependable](#constructs-idependable)</code>)  *No description*
* **trait** (<code>[Dependable](#constructs-dependable)</code>)  *No description*




#### *static* of(instance)🔹 <a id="constructs-dependable-of"></a>

Return the matching Dependable for the given class instance.

```ts
static of(instance: IDependable): Dependable
```

* **instance** (<code>[IDependable](#constructs-idependable)</code>)  *No description*

__Returns__:
* <code>[Dependable](#constructs-dependable)</code>



## class DependencyGroup 🔹 <a id="constructs-dependencygroup"></a>

A set of constructs to be used as a dependable.

This class can be used when a set of constructs which are disjoint in the
construct tree needs to be combined to be used as a single dependable.

__Implements__: [IDependable](#constructs-idependable)

### Initializer




```ts
new DependencyGroup(...deps: IDependable[])
```

* **deps** (<code>[IDependable](#constructs-idependable)</code>)  *No description*


### Methods


#### add(...scopes)🔹 <a id="constructs-dependencygroup-add"></a>

Add a construct to the dependency roots.

```ts
add(...scopes: IDependable[]): void
```

* **scopes** (<code>[IDependable](#constructs-idependable)</code>)  *No description*






## class Node  <a id="constructs-node"></a>

Represents the construct node in the scope tree.


### Initializer




```ts
new Node(host: Construct, scope: IConstruct, id: string)
```

* **host** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **scope** (<code>[IConstruct](#constructs-iconstruct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**addr** | <code>string</code> | Returns an opaque tree-unique address for this construct.
**children** | <code>Array<[IConstruct](#constructs-iconstruct)></code> | All direct children of this construct.
**dependencies** | <code>Array<[IConstruct](#constructs-iconstruct)></code> | Return all dependencies registered on this node (non-recursive).
**id** | <code>string</code> | The id of this construct within the current scope.
**locked** | <code>boolean</code> | Returns true if this construct or the scopes in which it is defined are locked.
**metadata** | <code>Array<[MetadataEntry](#constructs-metadataentry)></code> | An immutable array of metadata objects associated with this construct.
**path** | <code>string</code> | The full, absolute path of this construct in the tree.
**root** | <code>[IConstruct](#constructs-iconstruct)</code> | Returns the root of the construct tree.
**scopes** | <code>Array<[IConstruct](#constructs-iconstruct)></code> | All parent scopes of this construct.
**defaultChild**? | <code>[IConstruct](#constructs-iconstruct)</code> | Returns the child construct that has the id `Default` or `Resource"`.<br/>__*Optional*__
**scope**? | <code>[IConstruct](#constructs-iconstruct)</code> | Returns the scope in which this construct is defined.<br/>__*Optional*__
*static* **PATH_SEP** | <code>string</code> | Separator used to delimit construct path components.

### Methods


#### addDependency(...deps) <a id="constructs-node-adddependency"></a>

Add an ordering dependency on another construct.

An `IDependable`

```ts
addDependency(...deps: IDependable[]): void
```

* **deps** (<code>[IDependable](#constructs-idependable)</code>)  *No description*




#### addMetadata(type, data, options?) <a id="constructs-node-addmetadata"></a>

Adds a metadata entry to this construct.

Entries are arbitrary values and will also include a stack trace to allow tracing back to
the code location for when the entry was added. It can be used, for example, to include source
mapping in CloudFormation templates to improve diagnostics.

```ts
addMetadata(type: string, data: any, options?: MetadataOptions): void
```

* **type** (<code>string</code>)  a string denoting the type of metadata.
* **data** (<code>any</code>)  the value of the metadata (can be a Token).
* **options** (<code>[MetadataOptions](#constructs-metadataoptions)</code>)  options.
  * **stackTrace** (<code>boolean</code>)  Include stack trace with metadata entry. __*Default*__: false
  * **traceFromFunction** (<code>any</code>)  A JavaScript function to begin tracing from. __*Default*__: addMetadata()




#### addValidation(validation) <a id="constructs-node-addvalidation"></a>

Adds a validation to this construct.

When `node.validate()` is called, the `validate()` method will be called on
all validations and all errors will be returned.

```ts
addValidation(validation: IValidation): void
```

* **validation** (<code>[IValidation](#constructs-ivalidation)</code>)  The validation object.




#### findAll(order?) <a id="constructs-node-findall"></a>

Return this construct and all of its children in the given order.

```ts
findAll(order?: ConstructOrder): Array<IConstruct>
```

* **order** (<code>[ConstructOrder](#constructs-constructorder)</code>)  *No description*

__Returns__:
* <code>Array<[IConstruct](#constructs-iconstruct)></code>

#### findChild(id) <a id="constructs-node-findchild"></a>

Return a direct child by id.

Throws an error if the child is not found.

```ts
findChild(id: string): IConstruct
```

* **id** (<code>string</code>)  Identifier of direct child.

__Returns__:
* <code>[IConstruct](#constructs-iconstruct)</code>

#### lock() <a id="constructs-node-lock"></a>

Locks this construct from allowing more children to be added.

After this
call, no more children can be added to this construct or to any children.

```ts
lock(): void
```





#### setContext(key, value) <a id="constructs-node-setcontext"></a>

This can be used to set contextual values.

Context must be set before any children are added, since children may consult context info during construction.
If the key already exists, it will be overridden.

```ts
setContext(key: string, value: any): void
```

* **key** (<code>string</code>)  The context key.
* **value** (<code>any</code>)  The context value.




#### tryFindChild(id) <a id="constructs-node-tryfindchild"></a>

Return a direct child by id, or undefined.

```ts
tryFindChild(id: string): IConstruct
```

* **id** (<code>string</code>)  Identifier of direct child.

__Returns__:
* <code>[IConstruct](#constructs-iconstruct)</code>

#### tryGetContext(key) <a id="constructs-node-trygetcontext"></a>

Retrieves a value from tree context.

Context is usually initialized at the root, but can be overridden at any point in the tree.

```ts
tryGetContext(key: string): any
```

* **key** (<code>string</code>)  The context key.

__Returns__:
* <code>any</code>

#### tryRemoveChild(childName)🔹 <a id="constructs-node-tryremovechild"></a>

Remove the child with the given name, if present.

```ts
tryRemoveChild(childName: string): boolean
```

* **childName** (<code>string</code>)  *No description*

__Returns__:
* <code>boolean</code>

#### validate() <a id="constructs-node-validate"></a>

Validates this construct.

Invokes the `validate()` method on all validations added through
`addValidation()`.

```ts
validate(): Array<string>
```


__Returns__:
* <code>Array<string></code>

#### *static* of(construct)⚠️ <a id="constructs-node-of"></a>

Returns the node associated with a construct.

```ts
static of(construct: IConstruct): Node
```

* **construct** (<code>[IConstruct](#constructs-iconstruct)</code>)  the construct.

__Returns__:
* <code>[Node](#constructs-node)</code>



## interface IConstruct  <a id="constructs-iconstruct"></a>

__Implemented by__: [Construct](#constructs-construct)
__Obtainable from__: [Node](#constructs-node).[findChild](#constructs-node#constructs-node-findchild)(), [Node](#constructs-node).[tryFindChild](#constructs-node#constructs-node-tryfindchild)()

Represents a construct.

### Properties


Name | Type | Description 
-----|------|-------------
**node** | <code>[Node](#constructs-node)</code> | The tree node.



## interface IDependable  <a id="constructs-idependable"></a>

__Implemented by__: [Construct](#constructs-construct), [DependencyGroup](#constructs-dependencygroup)

Trait marker for classes that can be depended upon.

The presence of this interface indicates that an object has
an `IDependableTrait` implementation.

This interface can be used to take an (ordering) dependency on a set of
constructs. An ordering dependency implies that the resources represented by
those constructs are deployed before the resources depending ON them are
deployed.


## interface IValidation  <a id="constructs-ivalidation"></a>


Implement this interface in order for the construct to be able to validate itself.

Implement this interface in order for the construct to be able to validate itself.
### Methods


#### validate() <a id="constructs-ivalidation-validate"></a>

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.
Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

```ts
validate(): Array<string>
```


__Returns__:
* <code>Array<string></code>



## struct MetadataEntry  <a id="constructs-metadataentry"></a>


An entry in the construct metadata table.



Name | Type | Description 
-----|------|-------------
**data** | <code>any</code> | The data.
**type** | <code>string</code> | The metadata entry type.
**trace**? | <code>Array<string></code> | Stack trace at the point of adding the metadata.<br/>__*Default*__: no trace information



## struct MetadataOptions  <a id="constructs-metadataoptions"></a>


Options for `construct.addMetadata()`.



Name | Type | Description 
-----|------|-------------
**stackTrace**? | <code>boolean</code> | Include stack trace with metadata entry.<br/>__*Default*__: false
**traceFromFunction**? | <code>any</code> | A JavaScript function to begin tracing from.<br/>__*Default*__: addMetadata()



## enum ConstructOrder  <a id="constructs-constructorder"></a>

In what order to return constructs.

Name | Description
-----|-----
**PREORDER** |Depth-first, pre-order.
**POSTORDER** |Depth-first, post-order (leaf nodes first).


