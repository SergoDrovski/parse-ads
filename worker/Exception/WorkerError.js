class WorkerError extends Error {
    constructor(message) {
        super(message);
        this.name = "WorkerError";
    }
}

class StopWorkerError extends WorkerError {
    constructor(exitCode) {
        super(`Воркер остановлен с кодом:  ${exitCode}`);
        this.name = "StopWorkerError";
        this.exitCode = exitCode;
    }
}

class AnonWorkerError extends WorkerError {
    constructor(exitCode) {
        super(`Неизвестная ошибка с кодом:  ${exitCode}`);
        this.name = "AnonWorkerError";
        this.exitCode = exitCode;
    }
}

exports.StopWorkerError = StopWorkerError;
exports.AnonWorkerError = AnonWorkerError;