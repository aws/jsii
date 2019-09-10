import lib = require('@aws-cdk/lib');

/**
 * This squares a value
 */
function squareNumber(x: number, y?: number) {
  return x * x;
}

// This is where the magic happens
if (Math.random() % 2 == 0) {
  console.log(squareNumber(3));
} else {
  console.log(squareNumber(6));
}