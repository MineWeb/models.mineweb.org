/**
 * UserLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: /*process.env.NODE_ENV === 'production' ? 'mongodb' :*/ 'main_sql',

  attributes: {

    id: {
      type: 'integer',
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },

    action: {
      type: 'string',
      required: true,
      in: ['TRY_LOGIN', 'LOGIN']
    },

    ip: {
      type: 'string',
      required: true,
      ip: true
    },

    status: {
      type: 'boolean',
      required: true
    },

    error: {
      type: 'string'
    },

    user: {
      model: 'User'
    },

    location: {
      type: 'string',
      defaultsTo: null
    },

    agent: {
      type: 'string',
      defaultsTo: null
    },

    deviceName: {
      type: 'string',
      defaultsTo: null
    }

  }
}
