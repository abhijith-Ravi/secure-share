const requestLog = [];
const MAX_REQUESTS = 100; // Maximum requests allowed in the time window
const TIME_WINDOW = 60000; // Time window in milliseconds (1 minute)
const userHits = {};

function logRequest(user) {
    const currentTime = Date.now();
    requestLog.push({ user, timestamp: currentTime });

    // Remove requests that are outside the time window
    while (requestLog.length > 0 && requestLog[0].timestamp < currentTime - TIME_WINDOW) {
        requestLog.shift();
    }

    // Check if the number of requests exceeds the limit
    if (requestLog.filter(log => log.user === user).length > MAX_REQUESTS) {
        console.warn(`Warning: User ${user} has exceeded the maximum request limit.`);
    }
}

function checkAnomaly(req, res, next) {
    const username = req.user.username;
    if (!userHits[username]) userHits[username] = [];
    const now = Date.now();
    userHits[username] = userHits[username].filter(ts => now - ts < 10000);
    userHits[username].push(now);

    if (userHits[username].length > 5) {
        console.warn(`Anomaly: ${username} hit /account/data > 5 times in 10s`);
        // Optionally log this event
    }
    next();
}

module.exports = { logRequest, checkAnomaly };