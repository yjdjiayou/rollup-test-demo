// 帮助 Rollup 查找外部模块，然后导入
import resolve from '@rollup/plugin-node-resolve';

// 将 CommonJS 模块转换为 ES2015 供 Rollup 处理
import commonjs from '@rollup/plugin-commonjs';

// 让我们可以使用 es6 新特性来编写代码
import babel from 'rollup-plugin-babel';

// 压缩js代码，包括es6代码压缩
import {terser} from 'rollup-plugin-terser';

import typescript from 'rollup-plugin-typescript2';

import postcss from 'rollup-plugin-postcss';

import json from '@rollup/plugin-json';

// https://www.npmjs.com/package/@rollup/plugin-alias
// import alias from '@rollup/plugin-alias';


// js代码检测
// import { eslint } from 'rollup-plugin-eslint';

// https://blog.csdn.net/qq_35771567/article/details/101050378
// https://github.com/MrXujiang/timeout_rollup
// https://blog.csdn.net/weixin_33711647/article/details/89032401
// https://blog.csdn.net/mjzhang1993/article/details/85063754
// https://www.npmjs.com/package/rollup-plugin-postcss


const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';
const projectRootDir = path.resolve(__dirname);

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/main.tsx',
        output: [
            {
                name: 'AAA',
                file: 'dist/umd/umd.js',
                format: 'umd',
                sourcemap: true,
                exports: 'named',
                globals: {
                    axios: 'axios',
                    react: 'React',
                },
            },
            {
                file: 'dist/cjs/cjs.js',
                format: 'cjs',
                exports: 'named',
                // sourcemap: true,
            },
            {
                file: 'dist/esm/esm.js',
                format: 'esm',
                exports: 'named',
                // sourcemap: true,
            }
        ],
        plugins: [
            // rollup-plugin-commonjs应该用在其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏CommonJS的检测
            // 作用：将CommonJS模块转换为 ES2015 供 Rollup 处理
            commonjs(),
            // 作用：告诉 Rollup 如何查找外部模块
            resolve({}),
            // 作用：处理json格式文件
            json(),
            typescript({

            }),
            postcss({
                extensions: ['.less', '.scss', '.css',],
                // .module.less/.module.css/.module.scss 自动模块化处理
                // modules: true,
                // minimize: true,
                extract: true,
                plugins: []
            }),
            babel({
                exclude: 'node_modules/**',
                // 使 plugin-transform-runtime 生效
                runtimeHelpers: true,
            }),
            !isDev && terser(),
            // alias({
            //     resolve: ['.tsx','.ts','.jsx', '.js'],
            //     entries: [
            //         {
            //             find: 'src/**/*',
            //             replacement: path.resolve(projectRootDir, '@src/**/*')
            //         }
            //     ]
            // }),
        ],

        // 设置哪些模块不被打包，视为外部模块
        external: ['axios', 'react']
    }
];
