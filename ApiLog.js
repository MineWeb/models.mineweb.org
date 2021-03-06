/**
 * Log.js
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
      required: true
    },

    license: {
      model: 'License'
    },

    api_version: {
      type: 'integer',
      required: true,
      in: [1, 2]
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

    plugins: {
      type: 'json'
    },

    themes: {
      type: 'json'
    },

    current_theme: {
      type: 'string'
    },

    users_count: {
      type: 'integer'
    },

    error: {
      type: 'string'
    },

    data: {
      type: 'json'
    }
  }
}
