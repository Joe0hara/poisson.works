module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        // host: env("DATABASE_HOST", "localhost"),
        // port: env.int("DATABASE_PORT", 5432),
        // database: env("DATABASE_NAME", "strapi"),
        // username: env("DATABASE_USERNAME", "strapi"),
		// password: env("DATABASE_PASSWORD", "strapi"),
		host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        schema: "public",
        ssl: { rejectUnauthorized: false }
      },
      options: {
		  "pool":{
			"min":0,
			"max":15,
			"idleTimeoutMillis":30000,
			"createTimeoutMillis":30000,
			"acquireTimeoutMillis":30000
   		}}
    }
  }
});
