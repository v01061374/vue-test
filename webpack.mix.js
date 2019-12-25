const mix = require('laravel-mix');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve:{
        extensions: ['.js', '.vue'],
        alias:{
            '@': __dirname + '/resources'
        }
    },
    plugins: [new BundleAnalyzerPlugin()]
});
mix.js('resources/js/app.js', 'public/js')
   .css('resources/css/app.css', 'public/css');
mix.styles([
    'resources/css/app.css'
], 'public/css/app.css');