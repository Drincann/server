module.exports = function (app) {
    app.post('/', require('./query'));
}