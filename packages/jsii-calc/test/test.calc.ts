import * as calcLib from '@scope/jsii-calc-lib';
import * as assert from 'assert';

import {
  Add,
  Calculator,
  Multiply,
  Negate,
  Power,
  Sum,
  composition,
} from '../lib';

//
// * Constructors
// * Primitive Getters
//

assert.equal(
  new Negate(new Add(new calcLib.Number(20), new calcLib.Number(10))).value,
  -30,
);
assert.equal(
  new Multiply(
    new Add(new calcLib.Number(5), new calcLib.Number(5)),
    new calcLib.Number(2),
  ).value,
  20,
);
assert.equal(
  3 * 3 * 3 * 3,
  new Power(new calcLib.Number(3), new calcLib.Number(4)).value,
);
assert.equal(
  999,
  new Power(new calcLib.Number(999), new calcLib.Number(1)).value,
);
assert.equal(
  1,
  new Power(new calcLib.Number(999), new calcLib.Number(0)).value,
);

//
// * Methods
//

const calc = new Calculator();
calc.add(10);
assert.equal(10, calc.value);
calc.mul(2);
assert.equal(20, calc.value);
calc.pow(5);
assert.equal(20 * 20 * 20 * 20 * 20, calc.value);
calc.neg();
assert.equal(-3200000, calc.value);

//
// Setters
//

calc.curr = new Multiply(new calcLib.Number(2), calc.curr);
assert.equal(-6400000, calc.value);
calc.stringStyle =
  composition.CompositeOperation.CompositionStringStyle.DECORATED;
assert.equal(
  calc.toString(),
  '<<[[{{(2 * -(((((1 * ((0 + 10) * 2)) * ((0 + 10) * 2)) * ((0 + 10) * 2)) * ((0 + 10) * 2)) * ((0 + 10) * 2)))}}]]>>',
);

//
// Non-primitive Array
//

const sum = new Sum();
assert.equal(sum.parts.length, 0);
sum.parts = [
  new calcLib.Number(5),
  new calcLib.Number(10),
  new Multiply(new calcLib.Number(2), new calcLib.Number(3)),
];
assert.equal(10 + 5 + 2 * 3, sum.value);
assert.equal(sum.parts[0].value, 5);
assert.equal(sum.parts[2].value, 6);
assert.equal(sum.toString(), '(((0 + 5) + 10) + (2 * 3))');

//
// Maps
//

const calc2 = new Calculator(); // Initializer overload (props is optional)
calc2.add(10);
calc2.add(20);
calc2.mul(2);
assert.equal(calc2.operationsMap.add.length, 2);
assert.equal(calc2.operationsMap.mul.length, 1);
assert.equal(calc2.operationsMap.add[1].value, 30);

//
// Initializer overloads
// Fluent API
// Optional properties
// Exceptions
//

const calc3 = new Calculator({ initialValue: 20, maximumValue: 30 });
calc3.add(3);
assert.equal(calc3.value, 23.0);
assert.throws(() => calc3.add(10));
calc3.maxValue = 40;
calc3.add(10);
assert.equal(calc3.value, 33.0);

//
// Union properties
//

calc3.unionProperty = new Multiply(
  new calcLib.Number(9),
  new calcLib.Number(3),
);
assert.equal(calc3.readUnionValue(), 9 * 3);

//
// All primitive types
//

console.log('ok', __filename);
