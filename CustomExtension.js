module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },

    type: {
      type: 'string',
      in: ['PLUGIN', 'THEME'],
      size: 6,
      required: true
    },

    state: {
      type: 'string',
      in: ['PENDING', 'SUCCESS', 'FAILED'],
      defaultsTo: 'PENDING',
      size: 7,
      required: true
    },

    slug: {
      type: 'string',
      required: true,
      size: 50
    },

    author: {
      model: 'User',
      required: true
    },

    secure: {
      type: 'json',
      required: false,
      null: true,
      defaultsTo: null
    }
  }
}
