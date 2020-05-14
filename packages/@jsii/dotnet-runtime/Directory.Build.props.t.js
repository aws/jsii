const semver = require('semver');
const version = require('./package.json').version.replace(/\+.+$/, ''); // omit "+build" suffix

const nextMajor = function () {
  const parsed = semver.parse(version);
  return parsed.inc(semver.major === 0 ? 'minor' : 'major').version;
}()

process.stdout.write(`<Project>
  <PropertyGroup>
    <JsiiVersion>${version}</JsiiVersion>
    <JsiiVersionRange>[${version},${nextMajor})</JsiiVersionRange>
  </PropertyGroup>
</Project>
`);
