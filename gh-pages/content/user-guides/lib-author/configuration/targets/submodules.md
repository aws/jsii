# Submodules

jsii allows the use of submodules. These make it possible for classes with the
same name to live in different namespaces in the jsii type system, so that they
don't conflict.

For example, "cluster" is a very popular name; in the AWS ecosystem RDS has
Clusters, ECS has Clusters, EKS has Clusters, and so on. We want multiple
classes named `Cluster` in a single code library, but in order to make sure
the names don't conflict, every class is placed in a different submodule.

## Defining submodules

A submodule is declared by using an aliased TypeScript `export *` statement, in
any file reachable from the library's entry point, in the following form:

```ts
export * as my_module from `./my-module`;
//            ^^^               ^^^
//     Submodule name       Submodule source
```

All types reachable from `./my-module` will be in the submodule named
`my_module.` `./my-module` can either point directly to a source file, or to a
directory with an `index.ts` file in it.

A TypeScript *consumer* accesses the classes inside the submodule by importing
the submodule symbol from the library's entry point and then accessing
properties off of that, OR by importing the target file directly:

```ts
// Normal access via library entry point
import { my_module } from '@my-jsii/library';
new my_module.ClassInSubmodule(...);

// -------------------------------------------------------------------------
// Direct access of source file

// This is outside of the purview of jsii and is subject to the files that
// are being declared `export`ed in your `package.json`.
import { ClassInSubmodule } from '@my-jsii/library/my-module';
new ClassInSubmodule(...);
```

Consumers in jsii client languages use a regular namespaced import:

```py
from my_jsii_library.my_module import ClassInModule
```

```java
import com.library.jsii.my.my_module.ClassInmodule;
```

...etc.

## Configuring submodule attributes

If unconfigured, a namespace name will automatically be derived by `jsii-pacmak`
based on the exported name of the submodule. If you want to explicitly configure
the namespace you can put a `.jsiirc.json` file in the right location:

If your submodule export is a `directory/index.ts`, place a `.jsiirc.json` file
in the directory:

```js
/*
.
├── index.ts
├── package.json          // <- namespaces for the library root here
└── my-submodule
    ├── .jsiirc.json      // <- namespaces for the submodule here
    └── index.ts
*/

{
  "targets": {
    "java": {
      "package": "com.my_company.my_jsii_library.fancy_submodule"
    },
    "dotnet": {
      "namespace": "MyCompany.MyJsiiLibrary.FancySubmodule"
    },
    "python": {
      "module": "my_jsii_library.fancy_submodule"
    },
    "go": {
      "packageName": "fancy_submodule"
    }
  }
}
```

If your submodule export is a file, name your rc-file `.<base-name>.jsiirc.json`:

```js
/*
.
├── index.ts
├── package.json               // <- namespaces for the library root here
├── my-submodule.ts
└── .my-submodule.jsiirc.json  // <- namespaces for the submodule here
*/

{
  "targets": {
    /* ... */
  }
}
```