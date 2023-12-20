exports.up = knex =>
  knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.varchar("image");
  });

exports.down = knex => knex.schema.dropTable("ingredients");