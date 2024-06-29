const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Входная точка
  output: {
    path: path.resolve(__dirname, 'dist'), // Выходная директория
    filename: 'bundle.js', // Имя выходного файла
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Транспилируем ES6+ в ES5
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в отдельный файл
          'css-loader', // Обрабатывает CSS импорты
          'sass-loader', // Компилирует SCSS в CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader', // Обрабатывает файлы изображений
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон HTML
      filename: 'index.html', // Имя выходного HTML файла
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Имя выходного CSS файла
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Корневая директория для сервера
    compress: true, // Включить gzip компрессию
    port: 9000, // Порт для сервера
  },
};