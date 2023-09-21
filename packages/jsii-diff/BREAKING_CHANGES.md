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

### Optional properties: how to solve

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

## Changing types to superclass/subclass

When changing types involved in an operation, you run into a similar issue as with changing the optionality of a property:

> [!IMPORTANT]
> You are allowed to make *inputs* accept a supertype, but you are only allowed to make *outputs* return a subtype.

This manifests when you want to introduce a new common supertype from two or more existing types. For example,
let's say we have Dogs and Cats, and some operations that only work on some of them:

```ts
class Dog { }
class Cat { }

function feed(animal: Cat): void;
function pet(animal: Dog): void;
function getFromKennel(name: string): Dog;
```

We would like to clean up this code and introduce a new class, `Animal`, that will be a new supertype to both Dog and Cat:

```ts
class Animal { }
class Dog extends Animal { }
class Cat extends Animal { }
```

Now, what can we do with our operations? Can we make `feed` and `pet` accept an `Animal`?

```ts
function feed(animal: Animal): void;
function pet(animal: Animal): void;

// Yes! Code from before still works:
feed(new Cat());
feed(new Dog());
```

Can we make `getFromKennel()` return an `Animal`?

```ts
function getFromKennel(name: string): Animal;

// NO! Someone could have written this, and this no longer compiles without an 'instanceof' check!
const d: Dog = getFromKennel('Fido');
```

> [!WARNING]
> Depending on your definitions of `Dog`, `Cat` and `Animal`, the above code might actually compile just
> fine in TypeScript. That is because of TypeScript's [structural typing](https://www.typescriptlang.org/docs/handbook/type-compatibility.html),
> which doesn't (always) look at the name of the type, but just at the fields on it. If the fields are the
> same, TypeScript may consider the types "close enough" and allow the assignment. The above TypeScript
> behavior may make it possible to accidentally build APIs that can never be used in nominally typed
> languages like Java or C#. jsii-diff will do nominal checks on function signatures, but it cannot
> do nominal checks on function implementations.

### Extracting a supertype: how to solve

`getFromKennel()` must keep returning a `Dog`, so we have to make an alternative function for the generic case and forward the implementation:

```ts
function getAnimalFromKennel(name: string): Animal {
  return /* ... */;
}

function getFromKennel(name: string): Dog {
  const x = getAnimalFromKennel(name);
  if (!(x instanceof Dog)) {
    throw new Error(`I expected ${name} to be a Dog`);
  }
  return x;
}
```
