module.exports = function(app, config) {

    // controllers
    var home    = require('../controllers/home')(app, config);
    var pbdb    = require('../controllers/pbdb')(app, config);
    var idigbio = require('../controllers/idigbio')(app, config);
    var bhl     = require('../controllers/bhl')(app, config);

    app.get('/', home.index);

    // PBDB
    app.get('/pbdb_lookup/:taxon', pbdb.taxon_lookup);

    // iDigBio
    app.get('/idigbio_lookup/:scientific_name/:state_province', idigbio.search);

    // BHL
    app.get('/bhl_title/:title', bhl.title_search);
    app.get('/bhl_title_items/:title_id', bhl.title_items);
    app.get('/bhl_item_meta/:item_id', bhl.item_metadata);

    // 404
    app.use(function(err, req, res, callback) {
        if(err) { callback( err ); }
        else {
            res.status(404).json({"error":"Not Found"});
            callback();
        }
    });
}
