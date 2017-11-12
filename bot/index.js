import discord from 'discord.js'
import events from './events'
import commands from './commands'

class Mousa {
  constructor(credentials, symbol) {
    this.token = credentials.token
    this.username = credentials.username
    this.symbol = symbol
    this.client = new discord.Client()
  }
  login() {
   this.client.login(this.token)
   commands(this)
   events(this)
   console.log('Logged In as %s', this.username) 
  }
}

module.exports = Mousa