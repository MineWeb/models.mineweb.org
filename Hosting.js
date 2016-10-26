/**
 * Hosting.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('node-uuid')

module.exports = {

  price: 1.5,

  attributes: {

		id : {
			type: 'integer',
			unique: true,
    	autoIncrement: true,
    	primaryKey: true,
		},

    hostType: {
			type: 'string',
			required: true,
      defaultsTo: 'SUBDOMAIN',
			in: ['SUBDOMAIN', 'DOMAIN'],
      size: 9
		},

    ftpUser: {
      type: 'string'
    },

    ftpPassword: {
      type: 'string'
    },

    license: {
      model: 'License'
    },

    user: {
			model: 'User',
			required: true
		}

  },

  generate: function (userId, host, next) {
    // Save license
    License.create({
      user: userId,
      host: host
    }).exec(function (err, license) {
      if (err && sails)
        return sails.log.error(err)

      // Send command to server for generate hosting if asked to
      // generate Hosting entry
      Hosting.create({
        hostType: 'SUBDOMAIN',
        license: license.id,
        user: license.user
      }).exec(function (err, hosting) {
        if (err && sails)
          return sails.log.error(err)
        // update license
        License.update({id: license.id}, {hosting: hosting.id}).exec(function (err, licenseUpdated) {
          if (err && sails)
            return sails.log.error(err)
          HostingService.create(hosting, license.id, host, function (err) {
            return next(err, hosting.id)
          })
        })

      })

    })
  },

  checkSubdomainAvailability: function (subdomain, next) {
    License.query("SELECT COUNT(*) AS count FROM license INNER JOIN `hosting` ON `license`.`hosting` = `hosting`.`id` WHERE license.host = '" + subdomain + "' AND hosting.hostType = 'SUBDOMAIN'", function (err, count) {

			if (err) {
				sails.log.error(err)
				return next(false)
			}

			if (count !== undefined && count[0].count > 0)
				return next(false)

      return next(true)
    })
  }

};
