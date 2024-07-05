import path from 'path';
import webpack from 'webpack';


/** @type {(env: any, argv) => webpack.Configuration} */
export default (env, argv) => ({
  mode: env.production ? 'production' : 'development',  // Set mode based on the environment.
  devtool: env.production ? false : 'eval',
  entry: {
    main: path.resolve(process.cwd(), 'server', 'index.js'), // Entry point for the server-side bundle.
  },
  devServer: {
    port: 4040,
    compress: true,
    open: true,
    hot: true,
  },
  output: {
      path: path.resolve(process.cwd(), 'dist', 'server'), // Output directory for the server bundle.
    filename: '[name].js',
    module: true,
    chunkFormat: 'module',
    clean: true
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  target: 'node',
  node: {
      global: false
  },
  // Provide environment variables to the Webpack build.
  plugins: [new webpack.EnvironmentPlugin({ ...process.env })]
});