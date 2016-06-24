
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var fs = require("fs");
var app = express(); 

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');

    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}
app.use(express.static(path.join(__dirname, './build')));




/*fs.readFile(__dirname +'/build/assets/css/promo-s/promo-s.css', "utf8", function(err, data){
  if ( err ){ throw err;}
  console.log("Reading file asynchronously");
  //console.log(data);
  //writeSourcePath(data)
});*/

function writeSourcePath(data) {
var writeSource = __dirname+'/build/assets/css/test/promo-s.html';

fs.writeFile(writeSource, data, {"encoding":'utf8'}, function(err){
  if ( err ) { throw err; }
  console.log("*** File written successfully");
  //Now reading the same file to confirm data written
  fs.readFile(writeSource, "utf8", function(err, data){
    if ( err ){ throw err;}
    console.log("*** Reading just written file");
    //console.log(data);
  });

});
}

/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
