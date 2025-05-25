const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production',
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "crypto": false,
      "stream": false,
      "util": false,
      "buffer": false,
      "querystring": false,
      "url": false,
      "string_decoder": false,
      "http": false,
      "https": false,
      "os": false,
      "assert": false,
      "constants": false,
      "zlib": false,
      "net": false,
      "tls": false,
      "child_process": false,
      "dns": false,
      "dgram": false,
      "cluster": false,
      "module": false,
      "perf_hooks": false,
      "worker_threads": false,
      "inspector": false
    }
  },
  externals: [
    nodeExternals({
      allowlist: [
        // Permitir módulos que necesitan ser empaquetados
        /^@angular/,
        /^zone\.js/,
        /^rxjs/
      ]
    }),
    // Node.js built-in modules específicos
    {
      'fs': 'commonjs fs',
      'path': 'commonjs path',
      'crypto': 'commonjs crypto',
      'stream': 'commonjs stream',
      'util': 'commonjs util',
      'buffer': 'commonjs buffer',
      'querystring': 'commonjs querystring',
      'url': 'commonjs url',
      'string_decoder': 'commonjs string_decoder',
      'http': 'commonjs http',
      'https': 'commonjs https',
      'os': 'commonjs os',
      'assert': 'commonjs assert',
      'constants': 'commonjs constants',
      'zlib': 'commonjs zlib',
      'net': 'commonjs net',
      'tls': 'commonjs tls',
      'child_process': 'commonjs child_process',
      'dns': 'commonjs dns',
      'dgram': 'commonjs dgram',
      'cluster': 'commonjs cluster',
      'module': 'commonjs module',
      'perf_hooks': 'commonjs perf_hooks',
      'worker_threads': 'commonjs worker_threads',
      'inspector': 'commonjs inspector',
      
      // Dependencias problematicas para SSR
      'mock-aws-s3': 'commonjs mock-aws-s3',
      'aws-sdk': 'commonjs aws-sdk',
      'nock': 'commonjs nock',
      '@mapbox/node-pre-gyp': 'commonjs @mapbox/node-pre-gyp',
      'fsevents': 'commonjs fsevents',
      'chokidar': 'commonjs chokidar',
      'express': 'commonjs express',
      'pg': 'commonjs pg',
      'pg-native': 'commonjs pg-native',
      'stripe': 'commonjs stripe',
      'cors': 'commonjs cors',
      'bcryptjs': 'commonjs bcryptjs',
      'jsonwebtoken': 'commonjs jsonwebtoken',
      'node-fetch': 'commonjs node-fetch',
      'form-data': 'commonjs form-data',
      'mime': 'commonjs mime',
      'multer': 'commonjs multer',
      'sharp': 'commonjs sharp',
      
      // Dependencias opcionales que pueden causar problemas
      'canvas': 'commonjs canvas',
      'encoding': 'commonjs encoding',
      'bufferutil': 'commonjs bufferutil',
      'utf-8-validate': 'commonjs utf-8-validate',
      'supports-color': 'commonjs supports-color'
    }
  ],
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^(mock-aws-s3|aws-sdk|nock|@mapbox\/node-pre-gyp|fsevents|canvas|sharp)$/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'global.GENTLY': false
    }),
    new webpack.ContextReplacementPlugin(
      /express\/lib/,
      false,
      /^\.\/.*$/
    )
  ],
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader'
      },
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  node: '18'
                },
                modules: 'commonjs'
              }]
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false
  }
};
