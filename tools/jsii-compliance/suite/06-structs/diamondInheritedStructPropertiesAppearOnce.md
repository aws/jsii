# Diamond-inherited struct properties are exposed exactly once

A struct may inherit from several parent structs that share a common ancestor, so that a property is reachable through
more than one inheritance path (diamond inheritance). The host MUST expose each such property exactly once, with no
duplication or ambiguity. When the host constructs the struct and passes it to the kernel, each property MUST be sent a
single time with the assigned value, and reading the properties back MUST return those values.

## Reference Implementation

```ts
// GIVEN
export interface DiamondInheritanceBaseLevelStruct {
  readonly baseLevelProperty: string;
}
export interface DiamondInheritanceFirstMidLevelStruct extends DiamondInheritanceBaseLevelStruct {
  readonly firstMidLevelProperty: string;
}
export interface DiamondInheritanceSecondMidLevelStruct extends DiamondInheritanceBaseLevelStruct {
  readonly secondMidLevelProperty: string;
}
export interface DiamondInheritanceTopLevelStruct
  extends DiamondInheritanceFirstMidLevelStruct, DiamondInheritanceSecondMidLevelStruct {
  readonly topLevelProperty: string;
}

// WHEN
const struct: DiamondInheritanceTopLevelStruct = {
  baseLevelProperty: 'base', // declared once, reached via both mid-level parents
  firstMidLevelProperty: 'mid1',
  secondMidLevelProperty: 'mid2',
  topLevelProperty: 'top',
};

// THEN
expect(struct.baseLevelProperty).toBe('base');
expect(struct.firstMidLevelProperty).toBe('mid1');
expect(struct.secondMidLevelProperty).toBe('mid2');
expect(struct.topLevelProperty).toBe('top');
```
