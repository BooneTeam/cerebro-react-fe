const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');


exports.devServer = function (options) {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API based //
            // routing works.
            // This is a good default that will come in handy in more complicated setups. historyApiFallback: true,
            // Unlike the cli flag, this doesn't set HotModuleReplacementPlugin!
            hot: true,
            inline: true,
            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';

            // 0.0.0.0 is available to all network devices // unlike default `localhost`.
            host: options.host, // Defaults to `localhost` port: options.port // Defaults to 8080
        }, plugins: [
            // Enable multi-pass compilation for enhanced performance in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
};

exports.htmlLoader = function(paths){
    return {
        module: {
            loaders: [
                { test: /\.jpg$/, loader: "file-loader", include:paths },
                { test: /\.png$/, loader: "file-loader?mimetype=image/png" ,include:paths}
            ]
        }
    }
};

exports.fileLoader = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.png$/i,
                    loader: 'file'
                }]
        }
    }
}

exports.setupCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                    include: paths
                }]
        }
    };
};

exports.setVariables = function () {
    return {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                process: { env: { 'BACKEND_URI' : process.env.BACKEND_URI } }
            })
        ]

    }
};

exports.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    }
};

exports.setFreeVariable = function (key, value) {
    const env = {} ;
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
};

exports.extractBundle = function (options) {
    const entry = {};
    entry[options.name] = options.entries;
    return {
        // Define an entry point needed for splitting.
        entry: entry,
        plugins: [
            // Extract bundle and manifest files. Manifest is
            // needed for reliable caching.
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest']
            })
        ]
    };
};

exports.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                // Without `root` CleanWebpackPlugin won't point to our
                // project and will fail to work.
                root: process.cwd()
            })]
    };
};

exports.extractCSS = function (paths) {
    return {
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: paths
                }]
        }, plugins: [
            // Output extracted CSS to a file
            new ExtractTextPlugin('[name].[chunkhash].css')
        ]
    };
}

exports.convertEs6 = function (paths) {
    return {
        module: {
            loaders: [
                {

                    include: paths,
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel', // 'babel-loader' is also a valid name to reference
                    query: {
                        presets: ['es2015','react']
                    }
                }
            ]
        }
    }
}

exports.purifyCSS = function (paths) {
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                // `paths` is used to point PurifyCSS to files not
                // visible to Webpack. You can pass glob patterns
                // to it.
                paths: paths
            }),
        ]
    }
}
