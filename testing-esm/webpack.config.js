var path = require("path");

module.exports = {
  mode: "production",
  // 속성 1 entry
  entry: "./js/app.js",
  // 속성 2 output
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.bundle.js",
  },

  // 속성 3 loader
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: "source-map",
};
