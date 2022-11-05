
var playing = false;

function player() {
    var t = (((60 | 0) * (1000 | 0)) / bpm) | 0;

    timedLoop(t, function() {
        if (metronome_toggle) {
            playSound("soft-hitnormal.mp3", false);
        }
    });
}

var metronome_warn_timer = true;

onEvent("bpm_slider", "input", function() {
    if (metronome_toggle && playing && metronome_warn_timer) {
        alert("Warning!", "Metronome will not be affected until re-played");
        metronome_warn_timer = false;
        setTimeout(function() {metronome_warn_timer = true}, 3000 | 0);
    }
});

onEvent("play_button", "click", function() {
    if (!playing) {
        setImageURL("play_button", "icon://fa-pause");
        player();
    } else {
        setImageURL("play_button", "icon://fa-play");
        stopTimedLoop();
    }
    playing = !playing;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
