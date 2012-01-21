var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    parseUrl = require('url').parse,
    exec = require('child_process').exec,
    storage = require('./storage.js');

var version = "0.0.1";

exports.getGithubRepos = function(url, result) {
   
    storage.getRepos({
        url: url,
        version: version
    }, function(repos) {
        
        if (repos) {
            result(repos);
        } else {
            // Calculate reports...
            processRepos(url, function(repos) {
                // ...and save them to storage
                storage.saveRepos({
                    url: url,
                    version: version,
                    repos: repos
                });

                result(repos);
            });
        }
    });
};

function makeClone(url) {
    return "git clone " + url + " tmp";
}

function makeJshint(url) {
    return "jshint tmp /reports/"+"url";
}

function makeRm() {
    return "rm -a tmp";
}

function processAudio(url, result) {
    
    var command = makeClone(url);
    exec(command);
	console.log("clone done\n");
	var command = makeJshint(url);
   
    exec(command, function (error) {
        if (error !== null) {
            result();
        } else {
			result(
				
            );
        }
    });

	console.log("Jshint done\n");
	
	var command = makeRm();
	exec(command);
	console.log("rm done\n");
}

function parseFile(path, result) {

}
