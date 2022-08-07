const esbuild = require('esbuild')

const common = {
  entryPoints: ['./src/index.ts'],
  target: 'esnext',
  bundle: true,
}

esbuild.buildSync({
  ...common,
  format: 'esm',
  outfile: './dist/esm/index.js',
})

esbuild.buildSync({
  ...common,
  format: 'cjs',
  outfile: './dist/cjs/index.js',
})
