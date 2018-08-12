const webpack = require('webpack');
const path = require('path');
//const htmlWebpackPlugin = require('html-webpack-plugin');
const extractCss = require('extract-text-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
//var production = process.env.NODE_ENV;
const { VueLoaderPlugin } = require('vue-loader');
//const CopyWebpackPlugin = require('copy-webpack-plugin')
var CleanWebpackPlugin = require("clean-webpack-plugin");
var website = {
	publicPath:"/"
}
module.exports = {
	mode:'production',
	entry:{
		app:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		// filename:production ? 'bundle.[hash].js':'bundle.js',
		// chunkFilename:'[id].[chunkhash].js'
		filename:'yc_select.min.js',
		publicPath:website.publicPath,
		libraryTarget: 'umd',
        umdNamedDefine: true
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
				test:/\.vue$/,
				use:{
					loader:'vue-loader',
				}
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
		new CleanWebpackPlugin(
			['dist'],
			{
			    root: __dirname,       　　　　　　　　　　//根目录
			    verbose: true,        　　　　　　　　　　//开启在控制台输出信息
			    dry: false        　　　　　　　　　　//启用删除文件
			}
		),
		new uglify(),
		new VueLoaderPlugin(),
		new extractCss(website.publicPath+'css/vue-form-ui.min.css'),
		// new CopyWebpackPlugin([
		// 	{
		// 		from:path.resolve(__dirname,'./static'),
		// 		to:'static',
		// 		ignore:['.*']
		// 	}
		// ])
		// new webpack.ProvidePlugin({
		// 	$:'jquery',
		// 	jQuery:'jquery',
		// 	'window.jQuery':'jquery'
		// })	
	]

}