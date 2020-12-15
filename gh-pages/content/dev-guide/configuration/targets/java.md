# :fontawesome-brands-java: Java

The `java` target requires the following configuration:

- `maven` - the `groupId` and `artifactId` for the **Maven** package.
  - Optionally a `versionSuffix` can be provided that will be appended at the end of the **Maven** package's `version`
    field. The suffix must start with a `.` or a `-`.
- `package` - the root **Java** package name under which the types will be declared.

Example:

```js
{
  "jsii": {
    "java": {
      "package": "acme.jsii.hello",   // Required
      "maven": {
        "groupId": "acme",            // Required
        "artifactId": "jsii-hello",   // Required
        "versionSuffix": ".PREVIEW"   // Optional
      }
    },
    // ...
  },
  // ...
}
```

The resulting artifact is a **Maven** package that can be deployed to [Maven Central] using the
`deploy-staged-repository` command of the [nexus-staging-maven-plugin].

[maven central]: https://search.maven.org
[nexus-staging-maven-plugin]: https://mvnrepository.com/artifact/org.sonatype.plugins/nexus-staging-maven-plugin
