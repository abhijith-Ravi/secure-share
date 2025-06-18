const fs = require('fs');

const logs = [];

function logRequest(user, route, dataAccessed) {
    logs.push({
        timestamp: Date.now(),
        user,
        route,
        action: 'fetch-account-data',
        dataAccessed
    });
}

function getLogs() {
    return logs;
}

function logger(req, res, next) {
  next();
}

module.exports = { logRequest, getLogs, logger };