const package = require('./package.json');

process.stdout.write(`<Project>
  <PropertyGroup>
    <PackageVersion>$(JsiiVersion)</PackageVersion>
    <Description>${package.description}</Description>
    <PackageLicenseExpression>${package.license}</PackageLicenseExpression>

    <ProjectUrl>${package.homepage}</ProjectUrl>
    <RepositoryUrl>${package.repository.url}</RepositoryUrl>
    <RepositoryType>${package.repository.type || 'git'}</RepositoryType>

    <Authors>${package.author.name}</Authors>
    <Company>${package.author.name}</Company>

    <GeneratePackageOnBuild>True</GeneratePackageOnBuild>
    <IncludeSymbols>True</IncludeSymbols>
    <SymbolPackageFormat>snupkg</SymbolPackageFormat>
    <IncludeSource>True</IncludeSource>

    <PackageOutputPath>..\\..\\bin\\$(Configuration)\\NuGet\\</PackageOutputPath>

    <AssemblyOriginatorKeyFile>key.snk</AssemblyOriginatorKeyFile>
    <SignAssembly Condition="Exists('$(AssemblyOriginatorKeyFile)')">True</SignAssembly>
  </PropertyGroup>
</Project>
`);
