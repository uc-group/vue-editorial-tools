var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/assets')
    .setPublicPath('/assets')
    .addEntry('app', './src/js/app.js')
    .addEntry('image', './src/js/image.js')
    .enableSourceMaps(!Encore.isProduction())
    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .enableVueLoader()
;

module.exports = Encore.getWebpackConfig();
