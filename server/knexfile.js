// Update with your config settings.

  module.exports = {
    development: {
      client: 'pg',
      connection: {
        database: 'weather_app',
        username: 'tamara',
        password: 'tamara'
      },
      migrations: {
        directory: 'db/migrations',
      },
      seeds: {
        directory: 'db/seeds'
      },
    },
    production: {
      client: 'pg',
      connection: {
        database: 'weather_app',
        username: 'tamara',
        password: 'tamara'
      },
      migrations: {
        directory: 'db/migrations',
      },
      seeds: {
        directory: 'db/seeds'
      },
    },
  };