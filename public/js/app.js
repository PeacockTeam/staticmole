var ctx;

var samples;
var next_beat;
var next_onset;

var opts = {
  lines: 12, // The number of lines to draw
  length: 7, // The length of each line
  width: 5, // The line thickness
  radius: 10, // The radius of the inner circle
  color: '#000', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false // Whether to use hardware acceleration
};
var target = document.getElementById('reportItem');
var spinner = new Spinner(opts);

$().ready(function () {
});


function resetState() {
    if (music) {
        music.destruct();
    }
    resetCanvas();
};

function resetCanvas() {
    next_beat = 0;
    next_onset = 0;
    fillBG('#ffffff');
}

function getRepo() {
    spinner.spin(target);
    console.log("spinner started");
    $.ajax({
        type: 'POST',
        url: "/report/",
        data: { data: $("input.repo").val() },
        success: function(r) {
            spinner.stop(target);
			console.log("spinner stopped");
            if (r.error) {
                $("#reportItem").text('Error: ' + r.error);
				console.log('Error: ' + r.error);
            } else {
				buildReport(r.report);
            }
        }
    });
}

function buildReport(report){
  var i;
  reportArr=report.split("\n");
  
  //for ( i=0; i<reportArr.length; i++){
  
  //}
  $("#reportItem").html(reportArr.join("<br>"));
}              
