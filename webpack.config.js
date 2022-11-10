module.exports = {
    entry: ['regenerator-runtime/runtime', './src/app/index.js'],
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    }, 
    mode: 'development',
    performance: {
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000
   },
    devtool: "source-map",
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js?$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name].[ext]'
                    }
                  },
                ],
            }
        ]
    }
};