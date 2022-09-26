// webpack.mix.js

const mix = require('laravel-mix');

mix.js('src/js/app.js', 'dist')
    .postCss('src/css/app.css', 'dist', [
        require('postcss-import'),
        require('tailwindcss'),
    ]);

mix.copy('src/img', 'dist/img');
mix.copy('src/js', 'dist/js');
mix.copy('src/index.html', './');