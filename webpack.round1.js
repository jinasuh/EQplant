'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const dev = process.env.BUILD_DEV || 'true';

const entry = { app: ['./src/round1/Index.tsx'] };

// make sure the cdn links are always versioned
const vendorList = [
    {
        moduleName: 'react',
        namespace: 'React',
        link: 'https://unpkg.com/react@15.4.2/dist/react.js'
    },
    {
        moduleName: 'react-dom',
        namespace: 'ReactDOM',
        link: 'https://unpkg.com/react-dom@15.4.2/dist/react-dom.js'
    },
    {
        moduleName: 'IntlMessageFormat',
        namespace: 'IntlMessageFormat',
        link: 'https://unpkg.com/intl-messageformat@1.3.0/dist/intl-messageformat.js'
    },
    {
        moduleName: 'mobx',
        namespace: 'mobx',
        link: 'https://unpkg.com/mobx@3.1.0/lib/mobx.umd.js'
    },
    {
        moduleName: 'mobx-react',
        namespace: 'mobxReact',
        link: 'https://unpkg.com/mobx-react@4.1.0/index.js'
    },
    {
        moduleName: 'semantic-ui-react',
        namespace: 'semanticUIReact',
        link: 'https://unpkg.com/semantic-ui-react@0.63.5/dist/umd/semantic-ui-react.min.js'
    }
];

const vendorMap = vendorList.reduce((total, cur) => {
    total[cur.moduleName] = cur.namespace;
    return total;
}, {});

const vendorCdnJs = vendorList.map(v => v.link);
vendorCdnJs.push(
    'https://unpkg.com/jquery@3.2.1/dist/jquery.js',
    'https://unpkg.com/materialize-css@0.100.1/dist/js/materialize.js'
);

// Make sure to update storybook whenever update semantic.min.css
const vendorCdnCss = ['https://unpkg.com/materialize-css@0.100.1/dist/css/materialize.css'];

const getVendorCdnMinJs = () => {
    return vendorCdnJs.map(js => {
        if (/.min.js$/g.test(js)) {
            return js;
        }
        if (!/.js$/g.test(js)) {
            throw new Error(`${js} is not a link to a javascript file.`);
        }
        return js.replace(/.js$/g, '.min.js');
    });
};

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
    }),
    new HtmlWebpackPlugin({
        template: 'src/round1/index.html',
        inject: true,
        filename: dev ? 'index.html' : 'round1.html',
        vendorJs: getVendorCdnMinJs(),
        vendorCss: vendorCdnCss
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new ScriptExtHtmlWebpackPlugin({
        inline: /\.js$/
    })
];

let cssLoader;

if (process.env.NODE_ENV === 'production') {
    const ExtractTextPlugin = require('extract-text-webpack-plugin');

    cssLoader = {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            use: 'css-loader'
        })
    };

    plugins.push(new ExtractTextPlugin('styles.[hash].css'));
} else {
    const WebpackNotifierPlugin = require('webpack-notifier');

    entry.app.unshift('webpack-hot-middleware/client');

    cssLoader = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    };

    plugins.push(new WebpackNotifierPlugin(), new webpack.HotModuleReplacementPlugin());
}

module.exports = {
    devtool: '',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: [path.resolve('.'), 'node_modules']
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: vendorMap,

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                exclude: [path.resolve(__dirname, 'node_modules')],
                options: {
                    emitErrors: true,
                    failOnHint: true
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            { test: /\.(png|svg)$/, loader: 'url-loader', options: { limit: 5000 } },
            cssLoader
        ]
    },

    entry,

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },

    plugins
};
