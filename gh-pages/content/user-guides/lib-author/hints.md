# Special TSDoc tags

The `jsii` compiler interprets some documentation tags as hints that influence
the type system represented in the `.jsii` assembly files.

## Forcing an interface to be considered a *struct*

Using the `@struct` tag, an interface will be interpreted as a
[*struct*][struct] even if its name starts with a capital `I`, followed by
another capital letter (which normally would make them be treated as
[*behavioral interfaces*][interface]):

[struct]: ../../specification/2-type-system.md#structs
[interface]: ../../specification/2-type-system.md#behavioral-interfaces

```ts hl_lines="2"
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

## Excluding a declaration from multi-language support

The `@jsii ignore` tag causes the documented declaration to be ignored by the
`jsii` compiler. This has the effect of making the declaration invisible to
languages other than **TypeScript** and **Javascript**. Developers using this
tag should consider the implications on the usability of their library in other
languages.

```ts hl_lines="9"
export interface Props {
  public readonly name: string;

  /**
   * TypeScript/Javascript customers may pass additional properties with this
   * struct, however this will not be possible in other languages, as jsii does
   * not support index signatures.
   *
   * @jsii ignore
   */
  public readonly [key: string]: unknown;
}

```
