const _ = require('iterate-js')
const request = require('request')

var skinPrices;
request('https://api.csgofast.com/sih/all', async function(err, res, body) {
	skinPrices = await JSON.parse(body)	
})

export default (bot) => {
	bot.commands = {
		hey: (msg) => {
			msg.reply(" Hello There!")
		},
		convert: (msg) => {
			msg.content = msg.content.toLowerCase()
			if(
				typeof msg.content.split('convert')[1] !== 'undefined' && 
				typeof msg.content.split('convert')[1].split(' ').length !== 'undefined' &&
				msg.content.split('convert')[1].split(' ').length == 4
				) {
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
						if(body.ticker && body.ticker.price) {
							msg.reply(` The Price of ${body.ticker.base} in ${body.ticker.target} is ${parseFloat(body.ticker.price).toFixed(2)} and the Volume is ${body.ticker.volume !== '' ? parseFloat(body.ticker.volume).toFixed(2) : 'Nill'}`)
						}
					} else {
						msg.reply(' Cannot Fetch The Prices atm, Please Check if the Currency is available or not.')
					}
				})
			} else {
				msg.reply(' Sorry! I cannot convert it. Please Check the Command Again!')
			}
		},
		skinprice: (msg) => {
			msg.content = msg.content.toLowerCase()
			if(msg.content.split(bot.symbol + 'skinprice ')[0] === '=skinprice'	) {
				msg.reply(' Can you Please Provide the Name of the Skin?')
			} else {
				let name = msg.content.split(bot.symbol + 'skinprice ')[1].toLowerCase()
				let flag = 0
				for(let i = 0; i < Object.keys(skinPrices.prices).length; i++) {
					if(
						Object.keys(skinPrices.prices)[i].toLowerCase().indexOf(name) !== -1 &&
						Object.keys(skinPrices.prices)[i].toLowerCase().indexOf('stattrak') === -1
					) {
						msg.reply('The price of: ' + Object.keys(skinPrices.prices)[i] + ' is ' + skinPrices.prices[Object.keys(skinPrices.prices)[i]])
						flag = 1
						break
					} 
				}
				if(flag == 0) {
					msg.reply(' The Skin was not found!')
				}
			}
		}
	}
}