# :fontawesome-brands-microsoft: .NET

The `dotnet` target requires the following configuration:

- `namespace` - the root namespace under which types will be declared.
- `packageId` - the identified of the package in the NuGet registry.
- `iconUrl` - the URL of the icon to be shown in the [NuGet Gallery][nuget]. It should be at least 64x64 pixels and a
  transparent background is recommended. See the [.NET documentation] for more information.
- `versionSuffix` - an optional suffix that will be appended at the end of the NuGet package's `version` field. The
  suffix must start with a `-`.

Example:

```js
{
  "jsii": {
    "dotnet": {
      "namespace": "Acme.HelloJsii",              // Required
      "packageId": "Acme.HelloJsii",              // Required
      "iconUrl": "https://cdn.acme.com/icon.png", // Optional
      "versionSuffix": "-preview"                 // Optional
    },
    // ...
  },
  // ...
}
```

The resulting artifact is a NuGet package that can be published to [NuGet] using the standard [`nuget push`][nuget-push]
command.

[nuget]: https://www.nuget.org
[nuget-push]: https://docs.microsoft.com/fr-fr/nuget/nuget-org/publish-a-package
[.net documentation]: https://docs.microsoft.com/en-us/dotnet/core/tools/csproj#packageiconurl
