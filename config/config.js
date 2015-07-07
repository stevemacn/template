//Configures mongo database depending upon the environment type

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'lightteams'
    },
    port: 3000,
    db: 'mongodb://localhost/bridgesapi-development'
  },
  production: {
    root: rootPath,
    app: {
      name: 'lightteams'
    },
    port: 3000,
    db: 'mongodb://localhost/bridgesapi-production'
  }
};

module.exports = config[env];
