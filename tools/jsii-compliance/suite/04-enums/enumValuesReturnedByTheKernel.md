# Enum members returned by the kernel deserialize correctly

An enum member returned from the kernel MUST deserialize to a valid, non-absent host enum member. This MUST hold both
for enums whose members are backed by strings and for enums whose members are backed by numbers.

## Reference Implementation

```ts
// GIVEN
export enum StringEnum {
  A = 'A!',
  B = 'B?',
  C = 'C.',
}

export enum AllTypesEnum {
  MY_ENUM_VALUE,
  YOUR_ENUM_VALUE = 100,
  THIS_IS_GREAT,
}

export class EnumDispenser {
  public static randomStringLikeEnum(): StringEnum {
    return StringEnum.B;
  }

  public static randomIntegerLikeEnum(): AllTypesEnum {
    return AllTypesEnum.YOUR_ENUM_VALUE;
  }
}

// WHEN
const stringLike = EnumDispenser.randomStringLikeEnum();
const integerLike = EnumDispenser.randomIntegerLikeEnum();

// THEN
expect(stringLike).toBeDefined();
expect(integerLike).toBeDefined();
```
