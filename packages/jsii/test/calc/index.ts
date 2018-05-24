/**
 * A little calculator that could.
 */
export class Calculator {
  /**
   * Adds two numbers.
   * @param lhs Left-hand side
   * @param rhs Right-hand side
   * @returns The sum of the two numbers
   */
  add(lhs: number, rhs: number) {
    return lhs + rhs
  }

  /**
   * Subtracts two numbers.
   * @param lhs Left-hand side
   * @param rhs Right-hand side
   * @returns The subtraction of lhs from rhs
   */
  sub(lhs: number, rhs: number) {
    return lhs - rhs
  }

  /**
   * Multiplies two numbers.
   * @param lhs Left-hand side
   * @param rhs Right-hand side
   * @returns The multiplication of the two numbers
   */
  mul(lhs: number, rhs: number) {
    return lhs * rhs
  }
}