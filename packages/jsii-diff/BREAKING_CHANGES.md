# Changes jsii-diff considers breaking

jsii-diff considers a change breaking if there exists a program that would
successfully compile against a previous version of the library, but would fail
to compile against the new proposed version of the library.

Some rules are specific to one of TypeScript, Java, C#, Python and Go, but as a
jsii user you have to take all of these into account.

This document will go over the most common changes you want to make that jsii-diff
will consider breaking, why that is, and what to do about it.

## Making properties optional

By far the most commonly asked question is: *Why am I not allowed to turn this required property into an optional property?*

The answer is:

> [!IMPORTANT]
> You are allowed to make *inputs* optional, but you are not allowed to make *outputs* optional.

This often manifests itself as a class that takes a struct, and then copies some of the values onto itself as properties. For example:

```ts
interface DogOptions {
  readonly name: string;         // This 'name: string' is an INPUT
}

class Dog {
  public readonly name: string;  // This 'name: string' is an OUTPUT

  constructor(options: DogOptions) {
    this.name = options.name;
  }
}
```

You *are* allowed to make `DogOptions.name` optional! Someone could have written the program:

```ts
// Still valid. 'name' takes either 'string' or 'undefined', and we are giving it a 'string'
new Dog({ name: 'Fido' });
```

You are *not* allowed to make `Dog.name` optional though. Someone could have written the program:

```ts
const d = new Dog({ name: 'Fido' });
console.log(d.name.toLowerCase());

// Not valid anymore after the type of `d.name` has changed into `string | undefined`.
// 'd.name' can be undefined, and we have to account for that with an `if`!
```

### How to solve it

You'll have to make the input optional without making the output optional. That raises
the question, what do we do when we have to produce an output value that we don't have?
The simplest solution is to throw an exception:

```ts
interface DogOptions {
  readonly name?: string;
}

class Dog {
  private readonly _name?: string;

  constructor(options: DogOptions) {
    this._name = options.name;
  }

  public get name(): string {
    if (!this._name) {
      throw new Error('Dog does not have a name');
    }
    return this._name;
  }
}
```

This doesn't break any existing users: all their Dogs will have names, so they will not hit the exception path.

For new users that fail to give their Dog a name, presumably they will be aware that their Dog doesn't have a name, so they can avoid trying to read it. If you want to give them a way to avoid the exception, add a `public get hasName(): boolean` field so they can test for the existence of the name before accessing it.
