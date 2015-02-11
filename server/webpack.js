"use strict";

var chalk = require('chalk');

require('node-jsx').install()

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

startWebpackDevServer();

function startWebpackDevServer() {
    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true
    }).listen(3002, function (err, result) {
        if (err) return console.log(err);
        console.log(chalk.green("Webpack dev server listening on port 3002."));
    });
}