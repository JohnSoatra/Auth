import dotenv from 'dotenv';
import { minify } from "terser";
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';

dotenv.config();

let counter = -1;

const RootDir = 'lib';

const developMode = process.env.MODE === 'develop';

const Extension = [
    '',
    'cjs/'
];

function minifyBundles(run?: boolean) {
    return {
        name: "minifyBundles",
        generateBundle: run !== true ? undefined : async (_: any, bundle: any) => {
            for (const key in bundle) {
                if (bundle[key].type == 'chunk' && key.endsWith('.js')) {
                    const minifyCode = await minify(
                        bundle[key].code
                    );
                    bundle[key].code = minifyCode.code;
                }
            }

            return bundle;
        }
    }
}

export default defineConfig({
    plugins: [
        preserveDirectives(),
        react({
            devTarget: 'es2015'
        }),
        dts({
            include: [RootDir]
        }),
        minifyBundles(!developMode)
    ],
    build: {
        lib: {
            entry: resolve(__dirname, `${RootDir}/index.ts`),
            formats: ['es', 'cjs'],
        },
        minify: developMode ? false : 'terser',
        copyPublicDir: false,
        rollupOptions: {
            external: [
                'next',
                'next/headers',
                'next/navigation',
                'react',
                'react/jsx-runtime',
                'js-cookie'
            ],
            output: {
                preserveModules: true,
                preserveModulesRoot: RootDir,
                entryFileNames: ({ name, isEntry }) => {
                    if (isEntry === true) {
                        counter += 1;
                    }

                    return `${Extension[counter]}${name}.js`;
                },
            }
        }
    },
});
