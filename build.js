// build.js
import { build } from 'vite'
import config from './vite.config.js'

build(config).then(() => console.log('Build completed!'))