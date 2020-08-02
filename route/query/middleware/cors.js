module.exports = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "content-type,x-requested-with");
    res.header('Access-Control-Allow-Credentials', true);
    console.log(1);
    next();
};
