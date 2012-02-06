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
                $("#reportItem").text("blablaba");
				console.log('Error: ', r.error);
            } else {
				$("#reportItem").text(r.report);
                console.log(r.report);
				//playSong(url);
            }
        }
    });
}

function playSong(url) {
    music = soundManager.createSound({
        id: 'music',
        url: url,
        volume: 100,
        autoLoad: true,
        stream: false,
        autoPlay: true,
        whileplaying: whilePlaying,
        onfinish: function() {
            resetCanvas();
        }
    });
}

function whilePlaying() {
    var now = this.position / 1000;

    function randomColor() {
        return "#"+((1<<24)*Math.random()|0).toString(16);
    }
   
    while (samples.beats[next_beat][0] < now) {
        var color = randomColor();
        //for (var i = 0; i < 1; i++) {
        //    drawRandomCircle(300, color);
        //}
        //fillBG(color);
        drawRandomCircle(300, color);
        next_beat++;
    }
    
    var color = randomColor();
    while (samples.onsets[next_onset][0] < now) {
        //for (var i = 0; i < 5; i++) {
        //    drawRandomCircle(100, color);
        //}
        drawRandomCircle(100, color);
        next_onset++;
    }
}

function drawRandomCircle(radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(40 + 920*Math.random(), 40 + 520*Math.random(), radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function fillBG(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1000, 600);
}

