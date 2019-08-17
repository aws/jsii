const version = require('./package.json').version.replace(/\+.+$/, ''); // omit "+build" suffix

process.stdout.write(`<Project>
  <PropertyGroup>
    <JsiiVersion>${version}</JsiiVersion>
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>
</Project>
`);
