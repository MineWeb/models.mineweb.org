/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var crypto = require('crypto');
var salt = 'DR2G0FgaC9mYhGUubWwqyJfIxfs2vn93b0guVoii';

module.exports = {

  attributes: {

    id: {
      type: 'integer',
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: 'string',
      required: true,
      unique: true,
      min: 4,
      max: 25,
      size: 25
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    paypalDeveloperEmail: { // For paypals payements (developers)
      type: 'string',
      required: false,
      unique: true
    },

    pushbulletEmail: { // For support notification (admin)
      type: 'string',
      required: false,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    role: {
      type: 'string',
      defaultsTo: 'USER',
      in: ['USER', 'DEVELOPER', 'MOD', 'ADMIN', 'FOUNDER'],
      size: 9
    },

    customRoleName: { // for staff
      type: 'string'
    },

    developer: {
      type: 'string',
      defaultsTo: 'NONE',
      in: ['NONE', 'CANDIDATE', 'CONFIRMED'],
      size: 9
    },

    developerCandidacy: {
      type: 'text'
    },

    ip: {
      type: 'string',
      ip: true
    },

    lang: {
      type: 'string',
      defaultsTo: 'fr-fr',
      size: 5
    },

    twoFactorAuthKey: {
      type: 'string',
      size: 100
    },

    tokens: {
      collection: 'Token',
      via: 'user'
    },

    licenses: {
      collection: 'License',
      via: 'user'
    },

    plugins: {
      collection: 'Plugin',
      via: 'author'
    },

    themes: {
      collection: 'Theme',
      via: 'author'
    },

    purchases: {
      collection: 'Purchase',
      via: 'user'
    },

    paypalPayments: {
      collection: 'PayPalHistory',
      via: 'user'
    },

    dedipassPayments: {
      collection: 'DedipassHistory',
      via: 'user'
    },

    getRoleName: function (user) {
      if (user.customRoleName) return user.customRoleName;

      switch (user.role) {
        case 'FOUNDER':
          return 'Fondateur'
        case 'ADMIN':
          return 'Administrateur'
        case 'DEVELOPER':
          return 'Développeur'
        case 'MOD':
          return 'Modérateur'
        default:
          return 'Utilisateur'
      }
    },

    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      delete user.tokens;
      delete user.ip;
      // create md5 email
      user.md5Email = crypto.createHash('md5').update(user.email).digest('hex')
      user.roleName = this.getRoleName(user);
      delete user.email;
      return user;
    }

  },

  getRoleName: function (user) {
    return this.attributes.getRoleName(user)
  },

  addMd5Email: function (user) {
    user.md5Email = crypto.createHash('md5').update(user.email).digest('hex')
    return user
  },

  getMd5Email: function (user) {
    if (user.md5Email)
      return user.md5Email
    return User.addMd5Email(user).md5Email
  },

  hashPassword: function (password) {
    return crypto.createHash('sha1').update(salt + password).digest('hex')
  },

  /**
   *  Before creating an account, hash his password using salt
   */
  beforeCreate: function (user, callback) {
    user.password = this.hashPassword(user.password)
    callback()
  },

  /**
   *  Before updating an user, hash his password using salt
   */
  beforeUpdate: function (user, callback) {
    if (user.password !== undefined)
      user.password = this.hashPassword(user.password)
    callback()
  }

}
