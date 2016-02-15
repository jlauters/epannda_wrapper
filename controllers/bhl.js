var request = require('request');

module.exports = function(app, config) {

    return {
 
        title_search: function(req, res, callback) {
 
            var title = req.params.title;
            var bio_options = {
                url: "http://www.biodiversitylibrary.org/api2/httpquery.ashx?op=TitleSearchSimple&title=" + title + "&apikey=" + config.bhl_key + "&format=json",
                pool: { maxSockets: 1 }
            };

            if(title) {
                request.get(bio_options, function(err, response, body) {
                    if(!err && response.statusCode == 200) {

                        var titleID = '';
                        var bio_results = JSON.parse( body );
        
                        if("ok" == bio_results.Status) {
                            for( var bidx in bio_results.Result ) {
                 
                                (function(bidx) {

                                    // Data sanitization
                                    var bhl_title = bio_results.Result[bidx].FullTitle.replace('.', '');
                                    if(title == bhl_title) {
                                        titleID = bio_results.Result[bidx].TitleID;
                                        return titleID;
                                    } 

                                })(bidx);
                            }

                            res.setHeader("Content-Type", "application/json");
                            res.send('{"titleID": "' + titleID + '" }');
                        }
                    }
                });
            } else {
                res.setHeader("Content-Type", "application/json");
                res.send('{"titleID": ""}');
            }
        },

        title_items: function(req, res, callback) {

            var title_id = req.params.title_id;
            var bio_api_key = config.bhl_key;
    
            var bio_options = {
                url: "http://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetTitleItems&titleid=" + title_id + "&apikey=" + bio_api_key + "&format=json"
            };

            request.get(bio_options, function(err, response, body) {
                if(!err && response.statusCode == 200) {
                    var title_items = JSON.parse( body );
                    if("ok" == title_items.Status) {
                        res.setHeader("Content-Type", "application/json");
                        res.send('{"title_items": ' + JSON.stringify( title_items.Result ) + '}');
                    }
                }
            });
        },

        item_metadata: function(req, res, callback) {

            var item_id = req.params.item_id;
            var bio_api_key = config.bhl_key;

            var bio_options = {
                url: "http://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetItemMetadata&itemid=" + item_id +
                "&pages=t&ocr=t&parts=t&apikey=" + bio_api_key + "&format=json"
            };

            request.get(bio_options, function(err, response, body) {
                if(!err && response.statusCode == 200) {
            
                    console.log('typeof body: ' + typeof body);

                    if( typeof body !== 'string' && 0 = body.indexOf('<')) {
                        var item_meta = JSON.parse(body);

                        if("ok" == item_meta.Status) {
                            res.setHeader("Content-Type", "application/json");
                            res.send('{"item_meta": ' + JSON.stringify( item_meta.Result ) + '}');
                        }
                    }
                }
            });
        }
    }
};
