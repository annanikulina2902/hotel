const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const fs = require('fs');
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  pages: 'pages/',
};

const PAGES_LIST = {
  auth: 'auth',
  catalog: 'catalog',
  detail: 'detail',
  landing: 'landing',
  singin: 'singin',
};
const PAGES_DIR = `${PATHS.src}/${PATHS.pages}`;
const PAGES_FILE = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    stats: 'errors-only'
  },
  entry: {
    main: path.resolve(__dirname, './src/js/index.js'),
    landing: path.resolve(__dirname, './src/js/landing.js'),
    auth: path.resolve(__dirname, './src/js/auth.js'),
    catalog: path.resolve(__dirname, './src/js/catalog.js'),
    detail: path.resolve(__dirname, './src/js/detail.js'),
    singin: path.resolve(__dirname, './src/js/singin.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: true,
            exports: false,
          },
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    // ...PAGES_FILE.map(page => new HtmlWebpackPlugin({
    //   template: `${PAGES_DIR}/${page}`,
    //   filename: `./${page.replace(/\.pug/,'.html')}`,
    //   'meta': {
    //     'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
    //     'set-cookie': { 'http-equiv': 'set-cookie', content: 'name=value; expires=date; path=url' },
    //   }
    // })),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${PAGES_LIST.auth}/${PAGES_LIST.auth}.pug`,
      filename: `${PAGES_LIST.auth}.html`,
      chunks: ['main', `${PAGES_LIST.auth}`],
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${PAGES_LIST.catalog}/${PAGES_LIST.catalog}.pug`,
      filename: `${PAGES_LIST.catalog}.html`,
      chunks: ['main', `${PAGES_LIST.catalog}`],
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${PAGES_LIST.detail}/${PAGES_LIST.detail}.pug`,
      filename: `${PAGES_LIST.detail}.html`,
      chunks: ['main', `${PAGES_LIST.detail}`],
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${PAGES_LIST.landing}/${PAGES_LIST.landing}.pug`,
      filename: `${PAGES_LIST.landing}.html`,
      chunks: ['main', `${PAGES_LIST.landing}`],
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${PAGES_LIST.singin}/${PAGES_LIST.singin}.pug`,
      filename: `${PAGES_LIST.singin}.html`,
      chunks: ['main', `${PAGES_LIST.singin}`],
    }),
    new CleanWebpackPlugin(),
  ],
}
