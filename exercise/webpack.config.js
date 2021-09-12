var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "production",
  // (웹팩 대상 파일의 경로)루트 디렉토리에 main.js를 번들링한다
  entry: "./src/main.js",
  // 번들링된 output은 루트 디렉토리에 dist 폴더를 만들어 build.js라는 파일에 넣는다.
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js",
  },

  module: {
    rules: [
      {
        // .css 확장자를 가진 파일 또한 웹팩에서 인식할 수 있도록 css-loader 로 읽고, vue-style-loader를 적용한다
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        // .vue 확장자를 가진 파일은 vue-loader를 통해 따로 분리한다.
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {},
          // other vue-loader options go here
        },
      },
      {
        // .js 확장자를 가진 파일은 바벨로더를 적용한다
        // 바벨은 높은 버전의 문법을 범용성을 최대한 갖춘 상태로 낮춰주는 용도이다
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        // 웹팩에서 .png/.jpg/.gif/.svg 파일을 인식할 수 있도록 파일 로더를 적용한다
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  // 웹팩으로 파일을 해석할 때 해석방식을 정의하는 것이다.
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  // ?
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },

  // ?
  performance: {
    hints: false,
  },

  // ?
  devtool: "#eval-source-map",
};

/* 
webpack 버전 3까지는 해당 내용처럼 따로 production 모드일 때 에 대한 추가 설정을 해줘야 했지만,
webpack 버전 4부터는 mode: "production", 등으로 간단하게 나타낼 수 있게 되었다.
*/

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }
