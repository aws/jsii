function doThing() {
  const x = 1; // x seems to be equal to 1
  return x + 1;
}

function doThing2(x: number) {
  if (x == 1) {
    return true;
  }
  return false;
}

function doThing3() {
  const x = 1;
  return x + 1;
}

function doThing4() {
  let x = 1;
  x = 85;
}