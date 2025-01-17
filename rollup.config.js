import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import dotenv from 'dotenv';
import { visualizer } from "rollup-plugin-visualizer";

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
let envVars = process.env.NODE_ENV === 'production' ? { API_URL: 'https://api' } : dotenv.config({ path: envFile }).parsed;

const basePlugins = [
    resolve(),
    commonjs(),
    json(),
    replace({
        preventAssignment: true,
        values: Object.keys(envVars).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
            return prev;
        }, {}),
    }),
    visualizer(),
    terser(),
];

const external = ['maplibre-gl', 'ol', 'ol-mapbox-style', 'pbf', 'rbush', 'ieee754', /^ol\/.+$/];
const globals = {
    'this': 'this',
    'maplibre-gl': 'maplibregl',
    'rbush': 'RBush',
    'pbf': 'PBF',
    'ol-mapbox-style': 'olms',
    'ol': 'ol',
    'ol/Map': 'Map',
    'ol/control': 'control',
    'ol/interaction': 'interaction',
    'ol/proj': 'proj',
    'ol/layer': 'layer',
    'ol/source': 'source',
    'ol/format': 'format',
    'ol/View': 'View',
    'ol/extent': 'extent'
};
const polyfillBabel = babel({
    babelHelpers: 'bundled',
    exclude: [/\/core-js\//],
    presets: [
        ['@babel/preset-env', {
            targets: [
                "> 0.2%",
                "ie >= 9",
                "not op_mini all"
            ],
            useBuiltIns: 'usage',
            corejs: 3,
        }],
    ],
});
const standardBabel = babel({
    babelHelpers: 'bundled',
    exclude: [/\/core-js\//],
    presets: [
        ['@babel/preset-env', {
            targets: [
                "> 0.5%",
                "not dead",
                "not op_mini all"
            ],
            useBuiltIns: 'usage',
            corejs: 3,
        }],
    ],
});
export default [
    {
        input: './index.maplibre.js',
        output: [{
            file: 'dist/index.js',
            format: 'es',
            name: 'slpy',
            sourcemap: true,
            globals
        }],
        external,
        plugins: [
            ...basePlugins,
            standardBabel,
        ]
    },
    {
        input: './index.openlayers.js',
        output: [{
            file: 'dist/index.openlayers.js',
            format: 'es',
            name: 'slpy',
            sourcemap: true,
            globals
        }],
        external,
        plugins: [
            ...basePlugins,
            standardBabel,
        ]
    },
    {
        input: './index.umd.js',
        output: {
            file: 'dist/slpy.js',
            format: 'umd',
            name: 'slpy',
            sourcemap: true,
            globals,
        },
        external,
        plugins: [
            ...basePlugins,
            standardBabel,
        ]
    },
    {
        input: './index.polyfilled.js',
        output: {
            file: 'dist/slpy.polyfilled.js',
            format: 'umd',
            name: 'slpy',
            sourcemap: true,
            globals,
        },
        context: 'window',
        moduleContext: 'window',
        external,
        treeshake: false,
        plugins: [
            ...basePlugins,
            polyfillBabel,
        ],
    },
    {
        input: './index.polyfills.js',
        output: {
            file: 'dist/slpy.polyfills.js',
            format: 'umd',
            sourcemap: true,
        },
        context: 'window',
        moduleContext: 'window',
        external,
        treeshake: false,
        plugins: [
            ...basePlugins,
            polyfillBabel,
        ],
    }
];
