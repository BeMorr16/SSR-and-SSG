import path from "node:path";
import webpack from "webpack";
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: "production", // Set the mode for optimized builds
  target: ["web", "es2022"], // Target the web platform and ES2022 JavaScript version
  entry: path.resolve(process.cwd(), "client", "index.js"), // Entry point for the client-side bundle.
  output: {
    clean: false, // Do not clean the output
    filename: "[name].bundle.js", // file naming pattern.
    path: path.resolve(process.cwd(), "dist"), // where to put
    module: true,
    chunkFormat: "module",
  },
  experiments: { outputModule: true },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: { path: false, process: false, fs: false },
  },
  // Provide the process global variable for the browser.
  plugins: [new webpack.ProvidePlugin({ process: "process/browser" })],
};
export default config;
