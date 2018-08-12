const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractCss = require('extract-text-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
//var production = process.env.NODE_ENV;\
const CopyWebpackPlugin = require('copy-webpack-plugin')
var website = {
	publicPath:"/"
}
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
	mode:'development',
	entry:{
		app:'./src/main.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		// filename:production ? 'bundle.[hash].js':'bundle.js',
		// chunkFilename:'[id].[chunkhash].js'
		filename:'[name].js',
		publicPath:website.publicPath
	},
	resolve:{
		extensions:['.js','.json'],
		alias:{
			'@':resolve('src')
		}
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:'babel-loader'
				},
				exclude:/node_modules/
			},
			{
				test:/\.css$/,
				//use:['style-loader','css-loader']
				use:extractCss.extract({
					fallback:'style-loader',
					use:[
						{loader:'css-loader'},
						{loader:'postcss-loader'}
					]
				})
			},
			{
				test:/\.(sass|scss)$/,
				use:extractCss.extract({
					fallback:'style-loader',
					use:[
						{loader:'css-loader'},
						{loader:'sass-loader'}
					]
				})
			},
			// {
			// 	test: /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/,
   //              loader: 'url-loader?limit=500&&name=img/[name].[ext]'
			// }
			{
				test: /\.(png|svg|jpg|gif|svg|)(\?.*)?$/,
				loader:'url-loader',
				options:{
					limit:10000,
					name:path.posix.join('static','img/[name].[hash:7].[ext]')
				}
                //loader: 'url-loader?limit=500&&name=img/[name].[ext]'
			},
			{
		        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: path.posix.join('static','media/[name].[hash:7].[ext]')
		        }
		    },
		    {
		        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: path.posix.join('static','fonts/[name].[hash:7].[ext]')
		        }
		    }
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			template:'./index.html',
			inject:true
		}),
		new webpack.HotModuleReplacementPlugin(),
		//new uglify(),
		// new CopyWebpackPlugin([
		// 	{
		// 		from:path.resolve(__dirname,'./static'),
		// 		to:'static',
		// 		ignore:['.*']
		// 	}
		// ]),
		new extractCss('css/style.css')
		// new webpack.ProvidePlugin({
		// 	$:'jquery',
		// 	jQuery:'jquery',
		// 	'window.jQuery':'jquery'
		// })	
	],
	devServer:{
		contentBase:path.resolve(__dirname,'./dist'),
		host:'localhost',
		compress:true,
		hot:true,
		port:9999
	}

}