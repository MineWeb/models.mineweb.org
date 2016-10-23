/**
 * TicketMessage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var autolinks = require('autolinks')

module.exports = {

  attributes: {

    id: {
      type: 'integer',
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },

    user: {
      model: 'User',
      required: true
    },

    ticket: {
      model: 'Ticket',
      defaultsTo: null,
      required: true
    },

    content: {
      type: 'text',
      required: true
    }

  },

  // Lifecycle Callbacks
  beforeCreate: function (values, next) {
    values.content = autolinks(values.content.replace("\n", '<br>')) // autolinks + br
    next()
  },

  addSignature: function (content, user, lang) {
    var newContent = ''
    lang = lang.toLowerCase()

    // hello
    var d = new Date()
    var moment = (d.getHours() > 3 && d.getHours() < 18) ? 'day' : 'night'
    if (sails.config.ticket[lang] !== undefined)
      newContent += sails.config.ticket[lang].hello[moment] + "<br><br>" + content
    else
      newContent += sails.config.ticket['en-us'].hello[moment] + "<br><br>" + content
    // signature
    if (sails.config.ticket[lang] !== undefined)
      var signature = sails.config.ticket[lang].signature
    else
      var signature = sails.config.ticket['en-us'].signature
    if (user.rolename === undefined)
      user.rolename = ''
    signature = signature.replace('{USERNAME}', user.username).replace('{ROLENAME}', user.rolename)

    newContent += '<br>' + signature

    return newContent
  }

}
