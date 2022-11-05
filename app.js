
//intro
onEvent("button5", "click", function( ) {
    setScreen("start_proj");
    
});
var proj_name = null;
var bpm = null | 0;
var MAX_INPUT_LENGTH = 24 | 0;

setText("name","my_project");
setText("bpm", "120");

function alert(head, sub) {
    showElement("alert_head");
    showElement("alert_sub");
    showElement("alert_border");
    setText("alert_head", head);
    setText("alert_sub", sub);
    
    setTimeout(function() {
        hideElement("alert_head");
        hideElement("alert_sub");
        setProperty("alert_border", "hidden", true);
    }, 3000);
}

function limit_input(id) {
    onEvent(id, "input", function() {
        var buf = getText(id);
        if (buf.length > MAX_INPUT_LENGTH) {
            setText(id, buf.slice(0, MAX_INPUT_LENGTH));
        }
    });
}

function number_input(id) {
    onEvent(id, "input", function() {
        var buf = getText(id);
        if (!isFinite(buf)) {
            // Pop last char
            setText(id, buf.slice(0, -1));
        }
    });
}

function screen_to_onclick(id, screen) {
    onEvent(id, "click", function() {
        setScreen(screen);
    });
}

onEvent("start", "click", function() {
    proj_name = getText("name");
    bpm = getText("bpm");
    
    // Both name and bpm fields must be filled
    if (!proj_name) {
        alert("Warning!", "Must have project name");
        return;
    }
    
    if (!bpm) {
        alert("Warning!", "Must have bpm set (default: 120)");
        return;
    }
    
    if (!isFinite(bpm)) {
        alert("Warning!", "bpm must be a positive number");
        return;
    }
    
    if (getNumber("bpm") < 10 || getNumber("bpm") > 400) {
        alert("Warning!", "bpm must be between 10-400");
        return;
    }
    bpm |= 0;
    
    setText("bpm_box", bpm + " bpm");
    setNumber("bpm_slider", getNumber("bpm"));
    setScreen("timeline");
});

onEvent("bpm_slider", "input", function() {
    bpm = getNumber("bpm_slider") | 0;
    setText("bpm_box", bpm + " bpm");
});

number_input("bpm");
limit_input("bpm");
limit_input("name");

screen_to_onclick("timeline_b", "timeline");
screen_to_onclick("effects_b", "effects");
screen_to_onclick("filters_b", "filters");

screen_to_onclick("timeline_bb", "timeline");
screen_to_onclick("effects_bb", "effects");
screen_to_onclick("filters_bb", "filters");

screen_to_onclick("timeline_bbb", "timeline");
screen_to_onclick("effects_bbb", "effects");
screen_to_onclick("filters_bbb", "filters");

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var metronome_toggle = false;

onEvent("metronome_button", "click", function() {
    if (!metronome_toggle) {
        setProperty("metronome_button", "border-width", 5);
    } else {
        setProperty("metronome_button", "border-width", 0);
    }
    metronome_toggle = !metronome_toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4

var playing = false;

function player() {
    var t = 1.0 / (60 * 1000 * bpm);
    
    timedLoop(t, function() {
        console.log("nuts");
    });
}

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

onEvent("button6", "click", function( ) {
  
  setScreen("playlist");

});

onEvent("channel_rack_button", "click", function( ) {
  setScreen("channel_rack");
  //dropdown("dropdown3", "kick-kick&snare-kick-kick&snare", "kick-HiHat-snare-kick-Hihat-snare", "kick-snare-kick-kick-snare");
  
    
});

onEvent("dropdown3", "change", function() {
  
var dropdown = getProperty("dropdown3", "value");
  if (dropdown == "kick-kick&snare-kick-kick&snare") {
    playSound("Track-5-(consolidated)_27.mp3", false);
  } else if ((dropdown == "kick-HiHat-snare-kick-Hihat-snare")) {
    playSound("Track-7-(consolidated)_31.mp3", false);
  } else if (dropdown == "kick-snare-kick-kick-snare") {
    playSound("Track-9-(consolidated)_48.mp3", false);
  }

  

});

