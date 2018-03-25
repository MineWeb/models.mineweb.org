/**
 * License.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('node-uuid')

module.exports = {

  price: 0,

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

    type: {
      type: 'string',
      defaultsTo: 'BASIC',
      alphanumeric: true,
      size: 10,
      in: ['BASIC', 'USER_DEV', 'DEV']
    },

    key: {
      type: 'string',
      unique: true,
      defaultsTo: function () {
        return uuid.v4().substr(4, 24)
      },
      size: 24
    },

    state: {
      type: 'boolean',
      defaultsTo: true
    },

    host: {
      type: 'string'
    },

    secretKey: {
      type: 'string',
      alphanumeric: true
    },

    expireAt: {
      type: 'datetime',
      defaultsTo: function () {
        var d = new Date()
        d.setMonth(d.getMonth() + 1)
        return d
      }
    },

    suspended: {
      type: 'text'
    },

    hosting: {
      model: 'Hosting'
    },

    purchase: {
      model: 'Purchase'
    }

  },

  generate: function (userId, host, next) {
    // Save license
    License.create({
      user: userId,
      host: host,
      expireAt: null
    }).exec(function (err, license) {
      if (err && sails)
        sails.log.error(err)

      return next(err, license.id)
    })
  }

}
