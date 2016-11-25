var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var PATHS = {
	src: path.join(__dirname, 'App'),
	build: path.join(__dirname, 'build')
}

module.exports = {
    entry: PATHS.src,
    output: {
        path: PATHS.build,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
					test: /\.js$/,
					loaders: ['react-hot', 'babel'],
					include: path.join(__dirname, 'src')
				},{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.html$/,
            loader: 'html'
        },{
					test: /\.css$/,
					loader: 'css-loader',
					query: {
						modules: true,
						localIdentName: '[name]__[local]__[hash:base64:5]'
					}
				}]
    },
    devServer: {
        contentBase: "./Public",
        hot: true
    },
		plugins: [
			new CopyWebpackPlugin([
				{from: './Public/css', to:'css'},
				{from: './Public/index.html', to: 'index.html'}
			])
		]
};
