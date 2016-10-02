/**
 * License.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('node-uuid');

module.exports = {

  price: 9.99,

  attributes: {

		id : {
			type: 'integer',
			unique: true,
    	autoIncrement: true,
    	primaryKey: true,
		},

		user: {
			model: 'User',
			required: true
		},

		key: {
			type: 'string',
			unique: true,
      defaultsTo: function () {
				return uuid.v4();
			},
      size: 24
		},

		state: {
			type: 'boolean',
			defaultsTo: true
		},

		host: {
			type: 'string',
			url: true
		},

		secretKey: {
			type: 'string',
			alphanumeric: true
		},

    expire_at: {
			type: 'datetime',
      defaultsTo: function () {
        var d = new Date();
        return d.setMonth(d.getMonth() + 1);
      }
		},

		suspended: {
			type: 'text'
		},

    hosting: {
      model: 'Hosting',
    },

    purchase: {
      model: 'Purchase'
    }

  },

  generate: function(userId, host, hosting, next) {
    // Save license
    License.create({
      user: userId,
      host: host
    }).exec(function (err, license) {
      if (err && sails)
        sails.log.error(err)
      
      // Send command to server for generate hosting if asked to
      if (hosting)
        HostingService.create(license, function (err) {
          return next(err, license.id)
        })
      else
        return next(err, license.id)
    })
  }

};
