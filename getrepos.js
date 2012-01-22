var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    parseUrl = require('url').parse,
    exec = require('child_process').exec;
    //storage = require('./storage.js');

exports.getReport = function(url, result) {
    /*
    storage.getRepos({
        url: url,
        version: version
    },
    */
    
    processRepository(url, function(report) {
        /*
        storage.saveRepos({
            url: url,
            version: version,
            repos: repos
        });
        */
        result(report);
    });
};

function cloneCommand(url, folder) {
    return "git clone " + url + " " + folder;
}

function jshintCommand(url, folder) {
    return "jshint tmp /reports/" + "url";
}

function processRepository(url, result) {

    var folder = "tmp/" + Math.random(); 
    
    // Cloning repository
    exec(cloneCommand(url, folder),
        function(error) {
            if (error !== null) {
                // ERROR
                result();
            } else {
                console.log("Cloning succeed");
                analyzeLocalRepository(folder, result)
            }
        });
}

function analyzeLocalRepository(folder, result) {
    console.log("Performing analization...");
    /*
    exec(jshintCommand(url, folder),
        function (error) {
            if (error !== null) {
                result();
            } else {
                result(
                    
                );
                console.log("Jshint done\n");
                removeLocalRepository(folder, result);
            }
        });
    */
    removeLocalRepository(folder, result); 
}
	

function removeLocalRepository(folder, result) {
    fs.rmdir(folder, function(error) {
        if (error) {
            console.log("WARNING: failed to remove temp folder [" + folder + "]");
        }
        result();
    });
}

exports.getReport("git@github.com:PeacockTeam/staticmole.git", function() { console.log("Finished!"); });
