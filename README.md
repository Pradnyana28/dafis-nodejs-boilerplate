# Dafis Boilerplate for Node.js 🤠

Dafis Node.js Boilerplate is a personal project by Kadek Pradnyana. It save my time from making the project structures and setup this and that. Inspired by the simplicity of Laravel, and try to make it more simple in Node.js environment. Please feel free to hit me on [twitter][@kadekpradnyana] if you have any thought about this project.

![](https://img.shields.io/github/stars/Pradnyana28/dafis-nodejs-boilerplate.svg) ![](https://img.shields.io/github/forks/Pradnyana28/dafis-nodejs-boilerplate.svg) ![](https://img.shields.io/github/tag/Pradnyana28/dafis-nodejs-boilerplate.svg) ![](https://img.shields.io/github/release/Pradnyana28/dafis-nodejs-boilerplate.svg) ![](https://img.shields.io/github/issues/Pradnyana28/dafis-nodejs-boilerplate.svg)

### Features 🤗

- Authentication 📧 
- Email Notification 📩
- Responsive Template 📱

### Tech 💻

This boilerplate uses a number of open source projects: 📂

- [node.js] - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express] - Fast node.js network app framework
- [TypeScript] - JavaScript with static type definitions
- [MongoDB] - Document-based database
- [axios] - Promised based HTTP client
- [faker] - Fake contextual data generator
- [nodemailer] - Email sending for Node.js
- [passport.js] - Simple authentication for Node.js
- [pug] - Template engine
- [tailwindcss] - A utility-first CSS framework
- [redis] - In-memory data structure store
- [laravel-mix] - Webpack wrapper

### Installation 👨‍🔧

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

### Development 👨‍💻

Dafis boilerplate use Webpack and Laravel Mix for fast developing.

Want to contribute? Great! Just Star, and leave a Pull Request.

### Docker 🐳

Dafis boilerplate is already has Docker compose file setted up so you can run it easily on any server. Use command below to run.

```sh
docker-compose up --build
```

### Todos 📝

- Make more documentation
- Add API route
- Setup redis as middleware
- Add nginx service to docker
- Add redis service to docker

## License 😄

[MIT]
The MIT License is a permissive free software license originating at the Massachusetts Institute of Technology in the late 1980s. As a permissive license, it puts only very limited restriction on reuse and has, therefore, high license compatibility. It is compatible because it can be re-licensed under other licenses

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[prad]: https://github.com/Pradnyana28
[git-repo-url]: https://github.com/Pradnyana28/dafis-nodejs-boilerplate.git
[@kadekpradnyana]: https://twitter.com/kadekpradnyana
[mit]: https://en.wikipedia.org/wiki/MIT_License
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[typescript]: https://www.typescriptlang.org/
[mongodb]: https://www.mongodb.com/
[axios]: https://github.com/axios/axios
[faker]: https://www.npmjs.com/package/faker
[nodemailer]: https://nodemailer.com/about/
[passport.js]: http://www.passportjs.org/
[pug]: https://pugjs.org/api/getting-started.html
[tailwindcss]: https://tailwindcss.com/
[redis]: https://redis.io/
[laravel-mix]: https://laravel-mix.com/
