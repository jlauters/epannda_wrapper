var request = require('request');

module.exports = function(app, config) {

    return {
        taxon_lookup: function(req, res, callback) {
        
            var base_name    = req.params.taxon;
            var pbdb_options = { url: 'https://paleobiodb.org/data1.2/taxa/refs.json?base_name=' + base_name + '&textresult' };

            request.get(pbdb_options, function(err, response, body) {
                if(!err && response.statusCode == 200) {

                    var pbdb_results = [];
                    var json = JSON.parse(body);
                    for( var idx = 0; idx < 200; idx++) {

                        if( undefined !== json.records[idx].tit && undefined !== json.records[idx].pbt ) {
                            var auth1       = '';
                            var auth2       = '';
                            var oauth       = '';
                            var publication = '';

                            if( undefined !== json.records[idx].al1 ) { auth1 = json.records[idx].al1; }
                            if( undefined !== json.records[idx].al2 ) { auth2 = json.records[idx].al2; }
                            if( undefined !== json.records[idx].oau ) { oauth = json.records[idx].oau; }
                            if( undefined !== json.records[idx].pbt ) { publication = json.records[idx].pbt; }

                            var pbdb_obj = {
                                'oid': json.records[idx].oid.replace('ref:', ''),
                                'auth1': auth1,
                                'auth2': auth2,
                                'oauth': oauth,
                                'title': json.records[idx].tit,
                                'publication': publication,
                                'year': json.records[idx].pby,
                                'volume': json.records[idx].vol,
                                'titleID': '',
                                'itemID': [],
                                'page_link': '',
                                'ocr': '',
                    
                            };
                
                            pbdb_results.push( pbdb_obj );
                        }
                   }

                   res.setHeader('Content-Type', 'application/json');
                   res.send( JSON.stringify(pbdb_results, 0, 4) );
                   res.end();
               } else {
                   console.log('PBDB GET Error!');
                   console.log(error);
               }
            });
        }
    }
};
