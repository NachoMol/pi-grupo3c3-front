// build.js
const { build } = require('vite')
const config = require('./vite.config.js')

build(config).then(() => console.log('Build completed!'))