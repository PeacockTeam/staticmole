var ctx;

var samples;
var next_beat;
var next_onset;

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
    //toggleSpinner();

    $.ajax({
        type: 'POST',
        url: "/report/",
        data: { data: $("input.repo").val() },
        success: function(r) {
            //toggleSpinner();
            console.log("yep");
            if (r.error) {
                $("#reportItem").text('Error: ' + r.error);
				console.log('Error: ' + r.error);
            } else {
				buidReport(r.report);
				//console.log(r.report);
				//playSong(url);
            }
        }
    });
}

function buildReport(report){
  var i;
  reportArr=report.split("\r");
  
  //for ( i=0; i<reportArr.length; i++){
  
  //}
  $("#reportItem").text(reportArr.join("\n"));
}              
