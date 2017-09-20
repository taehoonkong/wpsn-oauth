const knex = require('./knex')
const bcrypt = require('bcrypt')
const validator = require('validator')

module.exports = {
  firstOrCreateUserByProvider(provider, provider_user_id, access_token=null, avatar_url=null) {
    return knex('user')
      .where({
        provider,
        provider_user_id
      })
      .first()
      .then(user => {
        if (user) {
          return user
        } else {
          return knex('user')
            .insert({
              provider,
              provider_user_id,
              access_token,
              avatar_url
            })
            .then(([id]) => {
              return knex('user')
                .where({id})
                .first()
            })
        }
      })
  },
  getUserById(provider_user_id) {
    return knex('user')
      .join('localuser', 'user.provider_user_id', '=', 'localuser.id')
      .select('user.provider', 'user.provider_user_id', 'localuser.password')
      .where({provider_user_id})
      .first()
  },
  createUser(provider, provider_user_id, password) {
    return knex('user')
      .insert({
        provider,
        provider_user_id,
      })
      .then(() => {
        return knex('localuser')
          .insert({
            id: provider_user_id,
            password
          })
      })
  }
}
