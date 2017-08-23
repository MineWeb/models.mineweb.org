/**
 * Contributor.js
 *
 * @description :: List of contributors of an extension (plugin/theme)
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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

    type: {
      type: 'string',
      size: 6,
      required: true
    },

    extension: {
      type: 'integer',
      required: true
    }
  }
}
