const esbuild = require('esbuild')

const common = {
  target: 'esnext',
  entryPoints: [
    { in: './src/index.ts', out: 'index' },
  ],
  bundle: true,
}

esbuild.build({
  ...common,
  format: 'esm',
  outdir: 'dist/esm',
  outExtension: {
    '.js': '.mjs'
  }
})

esbuild.build({
  ...common,
  format: 'cjs',
  outdir: 'dist/cjs',
  outExtension: {
    '.js': '.cjs'
  }
})
