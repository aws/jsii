module.exports = {
    context: __dirname,
    mode: 'production',
    entry: './lib/program.js',
    output: {
        filename: 'jsii-runtime.js'
    },
    devtool: false,
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