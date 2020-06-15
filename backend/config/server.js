module.exports = ({ env }) => ({
	host: env("HOST", "localhost"),
	port: process.env.PORT,
  });
