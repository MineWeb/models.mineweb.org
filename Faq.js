/**
 * Faq.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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

    question: {
      type: 'string',
      required: true,
      unique: true
    },

    answer: {
      type: 'text',
      required: true
    },

    lang: {
      type: 'string',
      required: true,
      defaultsTo: 'fr_FR'
    }

  }
}
