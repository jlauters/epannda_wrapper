module.exports = function(app, config) {

    return {
        index: function(req, res, callback) {
            res.write("ePANNDA API Wrapper");
            res.end();
        }
    }
};
