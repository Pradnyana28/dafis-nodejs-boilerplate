# Dafis Node.js Boilerplate

Dafis Node.js Boilerplate is a personal project by Kadek Pradnyana. It save my time from struggling with boilerplating the Node.js app based on TypeScript. Inspired by the simplicity of Laravel, and try to make it more simple in Node.js environment. Please feel free to hit me on [twitter][@kadekpradnyana] if you have any thought about this project.

# Features!

- Authentication
- Email Notification

### Tech

This boilerplate uses a number of open source projects:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run mix
$ nodemon
```

For production environments...

```sh
$ npm install
$ npm run production
$ pm2 start /dist/app.js
```

### Development

Want to contribute? Great!

Dafis boilerplate use Laravel Mix for fast developing.

### Docker

Dafis boilerplate is already has Docker compose file to run it easily on any server. Use command below to use docker.

```sh
docker-compose up --build
```

## License

MIT

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[prad]: https://github.com/Pradnyana28
[git-repo-url]: https://github.com/Pradnyana28/dafis-nodejs-boilerplate.git
[node.js]: http://nodejs.org
[@kadekpradnyana]: https://twitter.com/kadekpradnyana
[express]: http://expressjs.com
