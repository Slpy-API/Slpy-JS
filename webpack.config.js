const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const { node } = require('webpack');

module.exports = (env, options) => {
  const envFile = options.mode === 'development' ? '.env.development' : '.env.production';

  let envVars;

  if (options.mode === 'production') {
    envVars = { API_URL: 'https://api' };
  } else {
    envVars = dotenv.config({ path: envFile }).parsed;
  }

  const plugins = [
    new webpack.DefinePlugin(
      Object.keys(envVars).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
        return prev;
      }, {})
    ),
 
  ];

  return [{
    mode: options.mode,
    entry: './main.js',
    output: {
      path: path.resolve(__dirname, 'examples/maplibre-basic'),
      filename: 'slpy-example.js',
      library: {
        type: 'umd',
      },
      globalObject: 'this',
    },
    externals: [
      'maplibre-gl',
      'ol',
      'ol-mapbox-style',
      'pbf',
      'rbush',
      'ieee754',
      /^ol\/.+$/,
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    },
    plugins: plugins
  },
  {
    mode: options.mode,
    entry: './index.node.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        name: 'slpy',
        type: 'commonjs',
      },
    },
    externals: [
      'maplibre-gl',
      'ol',
      'ol-mapbox-style',
      'pbf',
      'rbush',
      'ieee754',
      /^ol\/.+$/,
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    },
    plugins: plugins
  },
  {
    mode: options.mode,
    entry: ['./src/polyfills.js', './index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'slpy.polyfilled.js',
      library: {
        type: 'umd',
      },
      globalObject: 'this',
    },
    externals: [
      'ol',
      'maplibre-gl',
      'ol-mapbox-style',
      'pbf',
      'rbush',
      'ieee754',
      ({ context, request }, callback) => {
        if (/^ol\//.test(request)) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      },
    ],
    target: "browserslist",
    module: {
      rules: [
        {
          test: /\.m?(t|j)s$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    "ie": "9"
                  },
                  useBuiltIns: 'usage', // Or 'usage'
                  corejs: 3, // Specify version if using 'usage' or 'entry' 
                }]
              ]
            }
          }
        }
      ]
    },
    plugins: plugins
  },
  {
    mode: options.mode,
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'slpy.min.js',
      library: {
        type: 'umd',
      },
      globalObject: 'this',
    },
    externals: [
      'maplibre-gl',
      'ol',
      'ol-mapbox-style',
      'pbf',
      'rbush',
      'ieee754',
      /^ol\/.+$/,
    ],
    target: "browserslist",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    },
    plugins: plugins
  }];
};
