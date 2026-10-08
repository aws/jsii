# Kernel code can use the Node.js standard library

The kernel process MUST run in an environment that provides the Node.js standard library, so that module code depending
on it &mdash; file-system, operating-system and cryptography facilities, in both their synchronous and asynchronous
forms &mdash; executes correctly and returns its results to the host unchanged.

## Reference Implementation

```ts
// GIVEN
export class NodeStandardLibrary {
  /** Reads a bundled resource file asynchronously. @returns "Hello, resource!" */
  public async fsReadFile(): Promise<string> {
    const value = await readFile(path.join(__dirname, 'resource.txt'));
    return value.toString();
  }

  /** Synchronous version of `fsReadFile`. @returns "Hello, resource! SYNC!" */
  public fsReadFileSync(): string {
    return `${fs.readFileSync(path.join(__dirname, 'resource.txt')).toString()} SYNC!`;
  }

  /** Returns the current `os.platform()`. */
  public get osPlatform(): string {
    return os.platform();
  }

  /** Computes the sha256 of a string. @returns "6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50" */
  public cryptoSha256(): string {
    return crypto.createHash('sha256').update('some data to hash').digest('hex');
  }
}

// WHEN
const obj = new NodeStandardLibrary();

// THEN
expect(await obj.fsReadFile()).toBe('Hello, resource!');
expect(obj.fsReadFileSync()).toBe('Hello, resource! SYNC!');
expect(obj.osPlatform.length).toBeGreaterThan(0);
expect(obj.cryptoSha256()).toBe('6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50');
```
