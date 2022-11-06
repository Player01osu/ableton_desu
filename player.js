var playback = {
    toggle: false,
    beat_divisor: 0 | 0,
    beat: 0 | 0,
    beat_sub: 0 | 0
};

function player() {
    var t = (((60 | 0) * (1000 | 0)) / (bpm * (4 | 0))) | 0;

    timedLoop(t, function() {
        if (metronome.toggle && playback.beat_divisor == 0) {
            playSound("soft-hitnormal.mp3", false);
        }

        if (channel_rack.snare.beats[playback.beat_sub]) {
            playSound("normal-hitclap2.mp3", false);
        }

        if (channel_rack.kick.beats[playback.beat_sub]) {
            playSound("drum-hitwhistle.mp3", false);
        }

        if (channel_rack.hihat.beats[playback.beat_sub]) {
            playSound("drum-hitnormalh.mp3", false);
        }

        if (playback.beat_divisor === 0) {
            playback.beat = ((playback.beat + 1) % 4) | 0;
        }

        playback.beat_divisor = ((playback.beat_divisor + 1) % 4) | 0;
        playback.beat_sub = ((playback.beat_sub + 1) % 16) | 0;
    });
}

var metronome_warn = false;

onEvent("bpm_slider", "input", function() {
    if (playback.toggle) {
        stopTimedLoop();
        player();
    }
});

onEvent("play_button", "click", function() {
    if (!playback.toggle) {
        setImageURL("play_button", "icon://fa-pause");
        player();
    } else {
        setImageURL("play_button", "icon://fa-play");
        stopTimedLoop();
    }
    playback.toggle = !playback.toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
