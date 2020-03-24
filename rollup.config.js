import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import { sep } from 'path'

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [typescript(), resolve(), commonjs(), nodePolyfills()],
  manualChunks (id) {
    if (id.includes('node_modules/')) {
      const dirsInPath = id.split(sep)
      const moduleName = dirsInPath[dirsInPath.indexOf('node_modules') + 1]
      if (moduleName) return `vendor/${moduleName}`
      return 'vendor/other'
    }
  },
}
