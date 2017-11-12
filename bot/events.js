const _ = require('iterate-js');
const parseMessage = (msg) => {
	msg.meta = msg.content.split(' ')
	var x = msg.meta.slice()
	msg.cmd = x.shift().replace(bot.symbol, '')
	msg.details = x.join(' ')
	return msg;
}

export default (bot) => {
	_.all({

	})
}