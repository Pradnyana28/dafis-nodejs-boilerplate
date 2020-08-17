const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

// EXTENSIONS
require('laravel-mix-imagemin');

mix.setPublicPath('public');

// Compile Style Resources
mix.sass('src/resources/sass/app.scss', 'css')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('tailwind.config.js') ],
    });

// Compile JS Resources
mix.js([
        'src/resources/js/app.js'
    ], 'js')
    .autoload({
        'jquery': ['$', 'jQuery']
    });

// Compress Images
mix.imagemin('resources/images/*.*', { context: 'src', }, {
        optipng: {
            optimizationLevel: 5
        },
        jpegtran: null,
        plugins: [
            require('imagemin-mozjpeg')({
                quality: 100,
                progressive: true,
            }),
        ],
    });