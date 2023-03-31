import esbuild from 'esbuild';
import {lessLoader} from "esbuild-plugin-less";
import LessPluginNpmImport from 'less-plugin-npm-import';

esbuild.build({
    entryPoints: ['./src/index.tsx'],
    outdir: './build',
    bundle: true,
    sourcemap: true,
    minify: true,
    publicPath: "/permittering/",
    loader: {
        ".svg": "file"
    },
    plugins: [
        // alias({
        //     "~nav-frontend-core":  path.resolve(__dirname, "node_modules/nav-frontend-core")
        // }),
        lessLoader({
            plugins: [
                new LessPluginNpmImport({
                    prefix: '~'
                })
            ]
            // paths: ["./node_modules/"]
        })
    ],
    // watch: process.argv.includes("--watch"),
})
    .then(result => console.log("build success", {result}))
    .catch(error => console.error("build error", {error}))