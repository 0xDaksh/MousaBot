const _ = require('iterate-js')
const request = require('request')

export default (bot) => {
	bot.commands = {
		hey: (msg) => {
			msg.reply(" Hello There!")
		},
		convert: (msg) => {
			msg.content = msg.content.toLowerCase()
			if(typeof msg.content.split('convert')[1] !== 'undefined' && msg.content.split('convert')[1].split(' ').length == 4) {
				let toConvert = {
					from: msg.content.split('convert')[1].split(' ')[1],
					to: msg.content.split('convert')[1].split(' ')[3]
				}
				request(`https://api.cryptonator.com/api/ticker/${toConvert.from}-${toConvert.to}`, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						body = JSON.parse(body)
						if(typeof body.error !== 'undefined' && body.error !== '' && body.error.toLowerCase() == 'pair not found') {
							msg.reply(' Currency Not Found!')
						}
						if(body.ticker && body.ticker.price && body.ticker.volume) {
							msg.reply(` The Price of ${body.ticker.base} in ${body.ticker.target} is ${parseFloat(body.ticker.price).toFixed(2)} and the Volume is ${parseFloat(body.ticker.volume).toFixed(2)}`)
						}
					} else {
						msg.reply(' Cannot Fetch The Prices atm, Please Check if the Currency is available or not.')
					}
				})
			} else {
				msg.reply(' Sorry! I cannot convert it. Please Check the Command Again!')
			}
		}
	}
}