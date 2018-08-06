module.exports = {
    context: __dirname,
    mode: 'production',
    entry: './lib/program.js',
    output: {
        path: __dirname + '/webpack',
        filename: 'jsii-runtime.js'
    },
    devtool: 'source-maps',
    target: 'node',
    node: {
        console: false,
        process: false,
        global: false,
        __filename: false,
        __dirname: false,
        Buffer: false,
        setImmediate: false,
    }
}
