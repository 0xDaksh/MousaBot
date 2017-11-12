require('babel-register')({
	presets: ['es2015']
})
const credentials = require('./credentials')
const Mousa = require('./bot/index.js')
const mousa = new Mousa(credentials, '!')

mousa.login()