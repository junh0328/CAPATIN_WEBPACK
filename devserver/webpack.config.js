var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // devServer 설정하기
  devServer: {
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      // 빌드 결과물에 대해서 템플릿을 기반으로 파일을 만들어준다.
      // 빌드 내용(output)을 알아서 해당 파일에 합쳐서 적어준다
      template: "index.html",
    }),
  ],
};
