import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/index.js',
    format: 'esm',
    external: ["d3-scale", "d3-array", "luxon"],
}).catch(() => process.exit(1));