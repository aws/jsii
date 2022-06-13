# Statics

## Constraints

### TypeScript

Static and non-static members live in completely different namespaces. Statics only exist on the class,
and cannot be accessed through the class.

Hence, it is perfectly fine to have a static and a non-static with the same name.

Superclass statics can be accessed through subclasses, and they can be overridden by subclasses.

### Java

Statics and non-statics share a namespace. There cannot be a static and a
nonstatic with the same name on the same class. The same holds for inherited
members; a non-static in a superclass prevents a static of the same name in a
subclass, same for a static in a superclass and a nonstatic in a subclass.

Superclass statics can be accessed through subclasses, and even through
instances and subclass instances.

Statics can be overridden, though they do not participate in polymorphism.

### C#

Does not allow static and nonstatic members with the same name on the same class.

**Will** allow static and nonstatic members of the same name on subclasses,
but will issue a compiler warning that the user probably intended to use the
`new` keyword to unambiguously introduce a new symbol.

**Will** allow overriding of statics on a subclass, but will issue a warning
about the `new` keyword again.

## Rules

In order to accommodate Java, we disallow any inherited members to conflict on
staticness.
