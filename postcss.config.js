const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  map: !isProd,
  plugins: [
    require('postcss-import'),
    isProd && require('cssnano'),
  ]
}
