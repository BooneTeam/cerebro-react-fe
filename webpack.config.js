const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator')
const PATHS = {
    app: path.join(__dirname, 'public'),
    style: [
        path.join(__dirname, 'public', 'style.css'),
        path.join(__dirname, 'node_modules', 'purecss')
    ],
    assets: path.join(__dirname, 'public/assets/'),

    build: path.join(__dirname, 'build')
};

const parts = require('./libs/parts');

const common = {
// Entry accepts a path or an object of entries. // We'll be using the latter form given it's
// convenient with more complex configurations.

    entry: {
        style: PATHS.style,
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    }, plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
            template:'./public/index.html'
        })
    ],
    // module: {
    //     preLoaders: [
    //         {
    //             test: /\.jsx?$/,
    //             loaders: ['eslint'],
    //             include: PATHS.app
    //         } ]
    // },
};

var config;

switch(process.env.npm_lifecycle_event){
    case 'build':
    case 'stats':
        config = merge(common,
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    publicPath: '/cerebro-dbc/',
                    // This is used for require.ensure. The setup
                    // will work without but this is useful to set.
                    chunkFilename: '[chunkhash].js'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            // parts.extractBundle({
            //     name: 'vendor',
            //     entries: ['react']
            // }),
            parts.minify(),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS([PATHS.app])
        );
        break;
    default:
        console.log(process.env.npm_lifecycle_event);
        config = merge(
            parts.setVariables,
            parts.convertEs6(PATHS.app),
            common,
            parts.devServer({
            // Customize host/port here if needed
            host: process.env.HOST,
            port: process.env.PORT
        }),
            parts.setupCSS(PATHS.style),
            {
                devtool: 'eval-source-map'
            }
        );
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
    quiet: true
});
