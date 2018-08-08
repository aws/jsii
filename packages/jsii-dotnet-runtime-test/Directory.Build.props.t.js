const path = require('path');
const version = require('./package.json').version.replace(/\+.+$/, ''); // omit "+build" postfix;
process.stdout.write(`<Project>
<PropertyGroup>
  <Authors>Amazon Web Services LLC</Authors>
  <Company>Amazon Web Services LLC</Company>
  <JsiiVersion>${version}</JsiiVersion>
</PropertyGroup>
</Project>
`);
