# Type system hints

The `jsii` compiler interprets some documentation tags as hints that influence
the type system represented in the `.jsii` assembly files.

## Forcing an interface to be considered a *struct*

Using the `@struct` tag, an interface will be interpreted as a
[*struct*][struct] even if its name starts with a capital `I`, followed by
another capital letter (which normally would make them be treated as
[*behavioral interfaces*][interface]):

[struct]: ../../specification/2-type-system.md#structs
[interface]: ../../specification/2-type-system.md#behavioral-interfaces

```ts
/**
 * @struct
 */
export interface IPRange {
  readonly cidr: string:
}
```

!!! important
    The `@struct` hint can only be used on interface declarations. Attempting to
    use them on any other declaration will result in a compilation error.
