const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const Controller = require('./controller');

const PORT = process.env.PORT || process.env.npm_package_config_port || 3000;

function startExpress() {
    const app = express();
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(express.json({ limit: '50mb' }));
    app.use(cors({ origin: true }));
    app.use(helmet());
    Controller(app);
    return app;
}

// const cluster = require('cluster');
// if (cluster.isMaster) {
//     const numWorkers = require('os').cpus().length;
//     for (let i = 0; i < numWorkers; i++) {
//         cluster.fork();
//     }

//     cluster.on('online', function (worker) {
//         console.log('Worker ' + worker.process.pid + ' is online');
//     })

//     cluster.on('exit', function (worker, code, signal) {
//         console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//         console.log('Starting a new worker');
//         cluster.fork();
//     })
// } else {
//     startExpress().listen(PORT);
// }

startExpress().listen(PORT);
