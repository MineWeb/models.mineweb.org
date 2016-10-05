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
    }
  }
};
