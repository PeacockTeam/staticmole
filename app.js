
var util = require("util"),
    url = require("url"),
    express = require("express"),
    getsamples = require('./getrepos.js'),
    exec = require('child_process').exec,
    querystring = require("querystring"),
    fs = require('fs');
var app = module.exports = express.createServer();

// Don't crash on errors.
process.on("uncaughtException", function(error) {
  util.log(error.stack);
});

app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(require('stylus').middleware({ src: __dirname + '/public' }));
        app.use(app.router);
        app.use(express.static(__dirname + '/public'));
        });

app.configure('development', function(){
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
        });

app.configure('production', function(){
        app.use(express.errorHandler()); 
        });

app.use(express.bodyParser());
app.use(app.router);

//Routes

function addHeaders(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
}

app.all('/*',function(req, res, next) {
    addHeaders(res);
    next(); 
});

app.get('/', function(req, res){
      res.render('index', { title: 'StaticMole Based on Jshint' });
});

app.get('/About', function(req, res){
      res.render('index', { title: 'StaticMole Based on Jshint' });
});

app.get('/Contact', function(req, res){
      res.render('index', { title: 'StaticMole Based on Jshint' });
});

app.post('/report/', function(req, res, next) {
  getreport(req.body.data, res);
});

function getreport(url, res, report){
  console.log("Request handler 'analize' was called.");
  var gitClone = "git clone "+url+" test"; 
  console.log(gitClone);
  exec(gitClone, function (error) {
    console.log("repo created");
    //var jshintRun="\"C:\\Program Files (x86)\\nodejs\\node_modules\\.bin\\jshint.cmd\" test > 1.txt";
    var arr = url.split("/");
	var ar = arr[4].split(".");
	var jshintRun="jshint test > reports/"+ar[0]; 
    report = "";
	exec(jshintRun, function (error) {
      console.log("analize done");
      fs.readFile("reports/"+ar[0], "ascii", function (err, data) {
        if (err) throw err;
        //console.log(data);
		report+=data;
	    console.log(report);
        if (report == "") {
          console.log("=================================");
	      res.send({ "error": "failed to get report" });
	      res.end();
	    } else {
	      console.log("**************************************");
          console.log(report);
	      res.send({ "report": report });
	      res.end();
	    } 
	  });
      exec("rm -rf test", function(error){console.log("cleaned");  });  //linux
	  //exec("RD /S/Q test");  //windows
    });
  });
}

app.listen(5555);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
