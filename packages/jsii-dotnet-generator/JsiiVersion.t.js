const path = require('path');
const version = require('./package.json').version.replace(/\+.+$/, ''); // omit "+build" postfix;
process.stdout.write(`namespace Amazon.JSII.Generator
{
    public static class JsiiVersion
    {
        public static readonly string Version = "${version}";
    }
}
`);
