var path = require("path");

module.exports = {
  mode: "none", // 번들링된 파일을 난독화 할꺼니 ?
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
