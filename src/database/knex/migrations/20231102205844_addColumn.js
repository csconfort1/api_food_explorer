exports.up = knex =>
  knex.schema.alterTable("ordersMeals", table => {table.integer("mealAmount");});

exports.down = knex =>
  knex.schema.alterTable("ordersMeals", table => {table.dropColumn("mealAmount");});