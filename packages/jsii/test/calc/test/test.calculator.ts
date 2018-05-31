import { Test } from 'nodeunit'
import { Calculator } from '../index'

export function calculator(test: Test) {
    let calc = new Calculator();
    test.equal(calc.add(123, 44), 123 + 44);
    test.equal(calc.mul(33, 88),  33 * 88);
    test.equal(calc.sub(99, 199), 99 - 199);
    test.done();
}
