var path = require("path");

module.exports = {
  mode: "none", // production, development, none >> 배포 시에는 production으로 설정해야 한다
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 만든 바벨 로더 예시
      // {
      //   test: /\.js$/, test > 확장자
      //   use: ["babel-loader"], use > 사용할 라이브러리
      // },
    ],
  },
};
