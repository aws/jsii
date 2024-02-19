# Maintenance Announcement: `jsii` & `jsii-rosetta` 1.x

**Announcement Date:** `2023-04-24`

We have recently released `jsii@5.0.0` and `jsii-rosetta@5.0.0`, built on the TypeScript `5.0.x` compiler, allowing
package maintainers to migrate to a more modern TypeScript language version than 3.9 (which the `1.x` release line is
built on). This change was designed in [RFC-374], and removes the need for developers to pin some of their dependencies
to releases still compatible with TypeScript 3.9 without necessarily requiring their dependents to do the same at the
same time. Upgrading your `jsii` and `jsii-rosetta` dependencies to `v5.0.x` is transparent to your users.

[RFC-374]: https://github.com/aws/aws-cdk-rfcs/blob/main/text/0374-jsii-ts-version.md

Starting with the `5.0.x` release of `jsii` and `jsii-rosetta`, we are using a new versioning strategy for these two
tools. Going forward we will closely follow new TypeScript compiler releases with new `jsii` and `jsii-rosetta` releases, 
enabling the entire jsii developer community to adopt new TypeScript syntax & benefit from bug fixes and
performance enhancements brought into the TypeScript compiler, while retaining the ability control the timeline of these
upgrades.

We believe the new versioning strategy will result in an improved developer experience for jsii library maintainers, and
have decided to start the process of retiring the `1.x` release line. In accordance with our maintenance commitment for
the `1.x` release line, the retirement timeline is the following:

* On `2023-04-24`,  `jsii@1.x` and `jsii-rosetta@1.x` will enter the **Maintenance Announcement** stage. During this
  stage, they will continue to be actively maintained, including new features back-ported from the current release
  (`5.0.x` or later), bug fixes, and security updates.
* On `2023-10-31` (six months later), the releases will move into the **Maintenance** stage. During this stage, they
  will continue receiving bug fixes and security updates, but will no longer receive new features.
* On `2024-10-31` (one year later), the releases will finally reach **End-of-Support**, and will no longer receive any
  features, bug fixes, or security udpates.

Future `1.x` releases of `jsii` and `jsii-rosetta` will soon start displaying a warning when used, encouraging customers
to migrate to the newer releases, which we believe will provide a better experience.

## Frequently Asked Questions

### How difficult is it to migrate from `1.x` to `5.0.x`?

The TypeScript language incurred a number of breaking changes between 3.9 and 5.0, including the following:

* Catch bindings are typed as `unknown` by default instead of being implicitly `any`
    * You may need to explicitly type catch bindings as any: `catch (e)` → `catch (e: any)`
* It is no longer allowed to declare abstract methods `async`
    * Simply remove the `async` keyword from `abstract` method declarations
* Additional breaking changes may affect your code, and you can read more about these on the TypeScript release notes
  for the respective versions:
    * [TypeScript 4.0 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/)
    * [TypeScript 4.1 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/)
    * [TypeScript 4.2 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/)
    * [TypeScript 4.3 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/)
    * [TypeScript 4.4 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-4/)
    * [TypeScript 4.5 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/)
    * [TypeScript 4.6 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/)
    * [TypeScript 4.7 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/)
    * [TypeScript 4.8 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/)
    * [TypeScript 4.9 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/)
    * [TypeScript 5.0 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/)

In addition to these, two import changes affect jsii exported APIs specifically:

* The `1.x` release line silently ignores index signatures (these are hence unavailable in other languages), and the
  `5.0.x` release starts explicitly rejecting these
    * You can explicitly opt into the `1.x` behavior by adding the `@jsii ignore` doc-tag:
      ```ts hl_lines="5"
      export interface Example {
        /**
         * This API is not visible in non-TS/JS languages.
         *
         * @jsii ignore
         */
        readonly [key: string]: any;
      }
      ```

* The `1.x` release line incorrectly interprets tuple types as synonyms to `object` (resulting in those APIs often being
  unusable from other languages), and the `5.0.x` release starts explicitly rejecting these
    * These APIs need to be replaced. You can use the  `@jsii ignore` doc-tag to explicitly opt these APIs out of the
      multi-language supported API, and provide an alternate API:
      ```ts hl_lines="3-4 8"
      export class Example {
          /**
           * @jsii ignore
           * @deprecated Prefer using `newMethod` instead.
           */
          public method(): [string, number] { /* ... */ }

          public newMethod(): StringAndNumber { /* ... */ }
      }

      export interface StringAndNumber {
          readonly stringValue: string;
          readonly numberValue: number;
      }
      ```

### What happens with other packages of the jsii toolchain (`jsii-pacmak`, `jsii-config`, etc...)?

The new versioning strategy only affects the `jsii` and `jsii-rosetta` packages. All other parts of the jsii toolchain
will continue to be released under the `1.x` release line for the foreseeable future. The compilation artifacts produced
by `jsii@5.0.0` and newer remain compatible with jsii tools from the `1.x` toolchain, so developers do not have to coordinate
upgrades with their dependents and dependencies.

### If I upgrade my package to `jsii@5.0.0`, are my dependents required to do the same?

You can decide to upgrade your `jsii` compiler as well as `jsii-rosetta` independently from your dependencies and
dependents. Output artifacts are compatible across all tool releases, including the `1.x` line, at least until they
reach *End-of-Support*.

### Can my app have dependencies built by different `jsii` release lines?

The `jsii` compiler and `jsii-rosetta` versions used to build a library has no material impact on the runtime artifacts.
The underlying runtime platform remains unchanged, and developers do not need to worry about which version of the
compiler was used to produce their dependencies.

### How often will new `jsii` & `jsii-rosetta` release lines be started?

New releases will closely follow those of the TypeScript compiler, which are created approximately once per quarter.
While we encourage customers to migrate to the latest release line as quickly as possible, the updated _Support &
Maintenance Policy_ for these tools guarantees a minimum of six calendar months of bug fixes and security updates for
non-current release lines, so that users can migrate on their own schedule.

### What is the support policy for the new `5.0.x` and newer releases?

The applicable maintenance and support policy is documented in the `SUPPORT.md` file of the
[`aws/jsii-compiler`][compiler-support] and [`aws/jsii-rosetta`][rosetta-support] repositories. The main aspects of the
new support policy are:

* Only the latest release line is deemed **Current**, and receives new features, bug fixes, and security updates;
* Once a release stops being **Current**, it moves into **Maintenance**, where it continues receiving bug fixes and
  security updates, but no new features will be added;
* After six (6) months in **Maintenance**, a release line moves to **End-of-Support**, and is no longer maintained.

[compiler-support]: https://github.com/aws/jsii-compiler/blob/v5.0.0/SUPPORT.md
[rosetta-support]: https://github.com/aws/jsii-rosetta/blob/v5.0.0/SUPPORT.md

### What happens if I continue using releases after they reach End-of-Support?

Once End-of-Support is declared for the releases, we will no longer be able to provide support, bug fixes, or security
updates for these releases. You may elect to continue to use them at your discretion (published releases will remain
available to download from the [npmjs.com](http://npmjs.com/) package registry indefinitely). You should be aware that,
although there is no plan to introduce non-backwards compatible features at this stage, it is possible that some of your
library’s dependencies may stop being compatible with `1.x` releases of the compiler in the future, and your library’s
dependents may at some point no longer be able to consume `1.x` compiler output artifacts.
