const _ = require('iterate-js')

export default (bot) => {
	bot.commands = {
		hey: (msg) => {
			msg.reply(" Hello There!")
		}
	}
}