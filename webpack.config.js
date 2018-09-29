const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    mode: 'production',
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/index.html', to: __dirname + "/dist" },
            { from: './src/styles.css', to: __dirname + "/dist" },
        ])
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};