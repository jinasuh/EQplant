'use strict';

const round = process.argv.slice(2);

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require(`../webpack.${round}.js`);

const app = express();
const compiler = webpack(webpackConfig);
const port = 3000;

app.use(
    webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
    })
);
app.use(webpackHotMiddleware(compiler));

app.listen(port, function() {
    console.log(
        `==> Listening on port ${port}. Open up http://localhost:${port}/?assignmentId=foobar in your browser.`
    );
});
