var path = require('path');

module.exports = {
	entry: ['./App/index.js'],
	output: {
		path: __dirname + '/Public/Dist',
		filename: 'bundle.js'
	},
	module : {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	devServer: {
		contentBase: "./Public",
		hot: true
	}
};
