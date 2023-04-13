import esbuild from 'esbuild';
import {lessLoader} from "esbuild-plugin-less";

const context = await esbuild.context({
    entryPoints: ['./src/index.tsx'],
    outdir: './build',
    bundle: true,
    sourcemap: true,
    minify: true,
    publicPath: "/permittering/",
    loader: {
        ".svg": "file",
    },
    plugins: [
        lessLoader({})
    ],
})

try {
    if (process.argv.includes("--watch")) {
        await context.watch()
    } else {
        const result = await context.rebuild()
        console.log("build success", {result})
        await context.dispose()
    }
} catch (error) {
        console.error("build error", {error})
}

