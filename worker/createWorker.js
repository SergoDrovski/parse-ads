const { Worker, parentPort} = require('node:worker_threads');
const { StopWorkerError, AnonWorkerError} = require('./Exception/WorkerError');
const { v4: uuidv4 } = require('uuid');
const path = require("node:path");

const workerState = {};

function runWorker(path, cb, workerData) {
    const worker = new Worker(path, { workerData });

    worker.on('message', cb);
    worker.on('error', () => cb(new AnonWorkerError(2)));

    worker.on('exit', (exitCode) => {
        if (exitCode === 0) {
            return null;
        }
        cb(new StopWorkerError(exitCode));
    });

    return worker;
}


exports.run = function run(callback) {
    const id = uuidv4();
    workerState[id] = runWorker(path.join(__dirname, './parseWorker.js'), callback)
    return id;
}

exports.workerState = workerState;

exports.stopWorker = function stopWorker(id) {
    workerState[id].terminate();
}