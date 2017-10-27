const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path")
module.exports = {
    entry: './src/index.jsx',
    output:{
        path: __dirname + '/public',
        filename:'bundle.js'
    },
    devServer:{
        port:8888,
        contentBase:"./public"
    },
    plugins:[
        new ExtractTextPlugin('app.css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve:{
        extensions:['.js', '.jsx'],
        alias:{
            modules:path.resolve(__dirname, 'node_modules')
        }
    },
    module:{
        loaders:[{
            test:/.js[x]?$/,
            exclude:/node_modules/,
            loader:'babel-loader',
            query:{
                presets:['es2015', 'react'], 
                plugins:['transform-object-rest-spread']
            }
        },{
            test:/.css?$/,
            loader: ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:'css-loader'
            })
        },{
            test:/\.(woff|woff2|svg|png|gif|eot|ttf)$/,
            loader:'file-loader'
        }]
    }
}
