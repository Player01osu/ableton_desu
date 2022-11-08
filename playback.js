var playback = {
    toggle: false,
    beat_divisor: 0 | 0,
    beat: 0 | 0,
    beat_sub: 0 | 0
};

var activation_warning = false;

function playback_start() {
    var t = (((60 | 0) * (1000 | 0)) / (bpm * (4 | 0))) | 0;
    playback.beat_divisor = 0 | 0;
    playback.beat = 0 | 0;
    playback.beat_sub = 0 | 0;

    if (!metronome.toggle && channel_rack_is_empty() && !activation_warning) {
        alert("Warning!", "Nothing is activated");
        activation_warning = true;
    }

    return timedLoop(t, function() {
        if (metronome.toggle && playback.beat_divisor == 0) {
            playSound("soft-hitnormal.mp3", false);
        }

        channel_rack_play_beat_sub(playback.beat_sub);

        if (playback.beat_divisor === 0) {
            playback.beat = ((playback.beat + 1) % 4) | 0;
        }

        playback.beat_divisor = ((playback.beat_divisor + 1) % 4) | 0;
        playback.beat_sub = ((playback.beat_sub + 1) % 16) | 0;
    });
}

var metronome_warn = false;
var playback_handler = null;

onEvent("bpm_slider", "input", function() {
    if (playback.toggle) {
        stopTimedLoop(playback_handler);
        playback_handler = playback_start();
    }
});

onEvent("play_button", "click", function() {
    if (!playback.toggle) {
        setImageURL("play_button", "icon://fa-pause");
        playback_handler = playback_start();
    } else {
        setImageURL("play_button", "icon://fa-play");
        stopTimedLoop(playback_handler);
        activation_warning = false;
    }
    playback.toggle = !playback.toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
