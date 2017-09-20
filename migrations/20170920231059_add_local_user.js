
exports.up = function(knex, Promise) {
  return knex.schema.createTable('localUser', t => {
    t.string('id').primary()
    t.string('password').notNullable()
  })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('localUser')
};
