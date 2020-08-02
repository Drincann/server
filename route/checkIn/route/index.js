module.exports = function (app) {
    app.get('/isCheckIn', require('./isCheckIn'));
}