const config = {
  mode: "production",
  entry: {
    index: "./src/js/index.js",
    // contacts: "./src/js/contacts.js",
    // about: "./src/js/about.js",
    // Если у разных html-страниц собственные js-файлы, прописываем это в webpack.config.js (в entry)
  },
  output: {
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

module.exports = config;
