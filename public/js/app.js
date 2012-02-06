var ctx;


$().ready(function () {
});

function getRepo() {
    $('#divToSpin').append(spinner.el);
    console.log("spinner started");
    $.ajax({
        type: 'POST',
        url: "/report/",
        data: { data: $("input.repo").val() },
        success: function(r) {
            spinner.stop();
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
