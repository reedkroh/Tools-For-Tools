require("dotenv").config();
module.exports = {
  "development": {
    "username": "root",
    "password": "Picori235",
    "database": "tools_example_2db", 
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "tools_DB",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "url": process.env.JAWSDB_URL,
    "dialect": "mysql"
  }
}
