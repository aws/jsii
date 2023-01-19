/// !hide
function future(): Promise<number> {
  return Promise.resolve(5);
}
/// !show

const x = await future();