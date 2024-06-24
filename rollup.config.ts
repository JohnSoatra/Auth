import dotenv from 'dotenv';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import del from 'rollup-plugin-delete';
import { defineConfig } from 'rollup';

dotenv.config();

const developMode = process.env.NODE_ENV === 'development'; 

const options = defineConfig([
    {
        input: "./exports/provider.ts",
        output: [
            {
                file: 'dist/provider.js',
                format: "cjs",
                exports: 'named',
            },
            {
                file: 'dist/provider.mjs',
                format: "esm",
            },
        ],
        plugins: [  
            typescript({
                tsconfig: './tsconfig.json'
            }),
            peerDepsExternal(),
            resolve(),
            commonjs(),
            babel({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                exclude: 'node_modules/**',
                babelHelpers: 'bundled'
            }),
            ...(developMode ? [] : [terser({
                compress: {
                    directives: false
                }  
            })]),
        ],
        external: ["react", "react-dom"]
    },
    {
        input: "./exports/provider.ts",
        output: [
            {
                file: "dist/provider.d.ts",
                format: "es"
            },
        ],
        plugins: [
            dts(),
            del({
                targets: [
                    'dist/*'
                ],
                ignore: [
                    'dist/provider.js',
                    'dist/provider.mjs',
                ],
            })
        ]
    },

    {
        input: "./exports/context.ts",
        output: [
            {
                file: 'dist/context.js',
                banner: `'use client';`,
                format: "cjs",
            },
            {
                file: 'dist/context.mjs',
                format: "esm",
            },
        ],
        external: ["react", "react-dom"],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
            }),
            resolve(),
            commonjs(),
            babel({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                exclude: 'node_modules/**',
                babelHelpers: 'bundled'
            }),
            ...(developMode ? [] : [terser({
                compress: {
                    directives: false
                }  
            })]),
        ]
    },
    {
        input: "./exports/context.ts",
        output: [
            {
                file: "dist/context.d.ts",
                format: "es"
            },
        ],
        plugins: [
            dts(),
            del({
                targets: [
                    'dist/*'
                ],
                ignore: [
                    'dist/provider.js',
                    'dist/provider.mjs',
                    "dist/provider.d.ts",
                    'dist/context.js',
                    'dist/context.mjs',
                ]
            })
        ]
    },
]);

export default options;