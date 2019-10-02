const package = require('./package.json');

process.stdout.write(`<Project>
  <PropertyGroup>
    <GeneratePackageOnBuild>True</GeneratePackageOnBuild>
    <IncludeSymbols>True</IncludeSymbols>
    <SymbolPackageFormat>snupkg</SymbolPackageFormat>
    <IncludeSource>True</IncludeSource>
    <PackageOutputPath>..\\..\\bin\\$(Configuration)\\NuGet\\</PackageOutputPath>
    <PackageVersion>$(JsiiVersion)</PackageVersion>
    <Description>${package.description}</Description>
    <ProjectUrl>${package.homepage}</ProjectUrl>
    <LicenseUrl>https://spdx.org/licenses/${package.license}.html</LicenseUrl>
    <Authors>${package.author.name}</Authors>
    <Company>${package.author.name}</Company>
    <AssemblyOriginatorKeyFile>key.snk</AssemblyOriginatorKeyFile>
    <SignAssembly Condition="Exists('$(AssemblyOriginatorKeyFile)')">True</SignAssembly>
  </PropertyGroup>
</Project>
`);
