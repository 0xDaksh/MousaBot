const _ = require('iterate-js');
const parseMessage = (msg, bot) => {
	msg.meta = msg.content.split(' ')
	var x = msg.meta.slice()
	msg.cmd = x.shift().replace(bot.symbol, '')
	msg.details = x.join(' ')
	return msg;
}

export default (bot) => {
	_.all({
		message: msg => {
			if(msg.author.id != bot.client.user.id && msg.content[0] == bot.symbol)
                console.log('{0}{1}{2} : {3}'.format(
                    msg.guild ? '{0} '.format(msg.guild.name) : '', 
                    msg.channel.name ? '#{0} @'.format(msg.channel.name) : 'PM @ ', 
                    msg.author.username, 
                    msg.content
                ))
            if(msg.content && msg.content[0] == bot.symbol) {
            	try {
            		var data = parseMessage(msg, bot)
            		var cmd = bot.commands[data.cmd]
            		if(_.is.function(cmd)) {
            			cmd(data)
            		}
            	} catch (e) {
            		console.log(e);
            	}
            }
		}
	}, (func, name) => {
		bot.client.on(name, func)
	})
}