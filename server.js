
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


function readWriteDynamicFile(readWriteDynamicFile,writeFilename) {

  fs.readFile(readWriteDynamicFile, "utf8", function(err, data){
    if ( err ){ throw err;}
    console.log("Reading file asynchronously");
    //console.log(data);
    writeSourcePath("<pre>"+data+"</pre>",writeFilename)
  });

  function writeSourcePath(data,writeFilename) {
   var writeSource= writeFilename.replace(/\\/g,"/").replace('.scss', '-css.html') 
  //var writeSource = __dirname+'/dev/modules/promo-s/css.html';

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

}

var skipDirectives=['common','aboutToolkit','promo-m'];  
function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    console.log(startPath)
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);



        if (stat.isDirectory()){

            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) { 
            //console.log('-- found: ',filename);
            for(var i=0; i<skipDirectives.length; i++) {
              //console.log(new RegExp(skipDirectives[i]).test(filename))
                /*if(new RegExp(skipDirectives[i]).test(filename)) {

                  return true
                }*/
                //else {
                   readFileName=(filename.replace(/\\/g,"/").replace('.scss', '.css')).replace('dev/modules', "build/assets/css");

                    readWriteDynamicFile(readFileName,filename)
               // }
            }
           
           /* console.log("old"+filename)
            console.log("new"+readFileName)*/
        };
    };
};
fromDir( __dirname+'/dev/modules/','.scss');



/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
