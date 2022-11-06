/*
 * Great question! Short answer: Game Lab & App Lab only support $ES5 features$ for
 * now. const and let, unfortunately, weren't added until ES6.
 *
 * Long answer: JavaScript does support other keywords for variable declaration as
 * you mentioned. We use const and let all the time in our own code base. These are
 * handy keywords that were added in ES6 (the 6th iteration of JavaScript) due to
 * high demand. The tough part is that each new version of the JavaScript spec
 * brings in lots of changes. Each browser has to update their interpreter to
 * handle all these changes (in fact, Internet Explorer still lacks support for
 * most ES6 features). Our own interpreter for Game Lab and App Lab, while a pretty
 * fancy piece of software, was designed to work with the previous version of the
 * JavaScript spec, ES5. It is a goal of ours to eventually be able to support all
 * the new language features that are part of ES6, but it will be a lot of work to
 * get there. So, in the meantime, we're stuck with only var.
 *
 * -Jessica, Code.org 3 Engineer
 * Feb 2020
 */

var MAX_INPUT_LENGTH = 24 | 0;
var BUTTON_TEXT_COLOR = rgb(255, 255, 255);
var BUTTON_BG = [rgb(122, 0, 255), rgb(122, 0, 255, 0.50)];

var proj_name = null;
var bpm = null | 0;
var screen_sel = null;

function new_state(tabs, tab_default) {
    var state = {
        tabs: {
            tab: [
                //
                //callback: function() {},
                //loaded: false,
                //name: null,
                //id: null,
                //elements_id: null
                //
            ],
            created: false,
            current: tab_default,
        }
    };

    tabs.forEach(function(tab){
        state.tabs.tab.push({
            callback: function() {},
            loaded: false,
            name: tab,
            id: tab.replace(' ', '_'),
            elements_id: [],
        });
    });

    return state;
}

var screen = {
    start_proj: {
        id: "start_proj",
        state: null
    },
    timeline: {
        id: "timeline",
        state: new_state(
            ["Channel Rack", "Sound Panel"],
            "Channel Rack"
        )
    },
    effects: {
        id: "effects",
        state: null
    },
    filters: {
        id: "filters",
        state: null
    }
};

function set_tabs_callbacks(tabs, callbacks) {
    callbacks.forEach(function(callback, idx) {
        tabs.tab[idx].callback = callback;
    });
}

set_tabs_callbacks(
    screen.timeline.state.tabs,
    [
        function(){channel_rack_tab()},
        function(){sound_panel_tab(screen.timeline)},
    ]
);

onEvent("github", "click", function() {
    open("https://github.com/Player01osu/ableton_desu");
});

setText("name","my_project");
setText("bpm", "120");

function a_button(
    id,
    text,
    x,
    y,
    width,
    height,
    text_color,
    background_color,
    font_size
) {
    button(id, text);
    setPosition(id, x, y, width, height);
    setProperty(id, "text-color", text_color);
    setProperty(id, "background-color", background_color);
    setProperty(id, "font-size", font_size);
    setProperty(id, "border-width", 1 | 0);
    setProperty(id, "border-color", rgb(77, 87, 95));
    setProperty(id, "border-radius", 4 | 0);
}

var ux_buttons_drawn = false;

function redraw_ux_buttons() {
    if (ux_buttons_drawn) {
        deleteElement("timeline_b");
        deleteElement("effects_b");
        deleteElement("filters_b");
    }
    ux_buttons_drawn = true;
    var BUTTON_WIDTH = 100 | 0;
    var BUTTON_HEIGHT = 40 | 0;

    a_button(
        "timeline_b",
        "Timeline",
        5 | 0,
        10 | 0,
        BUTTON_WIDTH,
        BUTTON_HEIGHT,
        BUTTON_TEXT_COLOR,
        BUTTON_BG[(screen_sel == screen.timeline.id) | 0],
        15 | 0
    );

    a_button(
        "effects_b",
        "Effects",
        110 | 0,
        10 | 0,
        BUTTON_WIDTH,
        BUTTON_HEIGHT,
        BUTTON_TEXT_COLOR,
        BUTTON_BG[(screen_sel == screen.effects.id) | 0],
        15 | 0
    );

    a_button(
        "filters_b",
        "Filters",
        215 | 0,
        10 | 0,
        BUTTON_WIDTH,
        BUTTON_HEIGHT,
        BUTTON_TEXT_COLOR,
        BUTTON_BG[(screen_sel == "filters") | 0],
        15 | 0
    );

    screen_to_onclick("timeline_b", screen.timeline);
    screen_to_onclick("effects_b", screen.effects);
    screen_to_onclick("filters_b", screen.filters);
}

function screen_to_onclick(id, screen_name) {
    onEvent(id, "click", function() {
        screen_sel = screen_name.id;
        setScreen(screen_name.id);
        redraw_ux_buttons();
        load_state(screen_name.state);
    });
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

    switch_screen(screen.timeline);
});

function load_state(state) {
    if (state == null) {
        return;
    }

    if (state.tabs.created) {
        tabs_select(state.tabs, state.tabs.current);
    } else {
        tabs_create(state.tabs);
        state.tabs.created = true;
    }
}

function switch_screen(screen_name) {
    setScreen(screen_name.id);
    screen_sel = screen_name.id;

    redraw_ux_buttons(screen_name);
    load_state(screen_name.state);
}

onEvent("bpm_slider", "input", function() {
    bpm = getNumber("bpm_slider") | 0;
    setText("bpm_box", bpm + " bpm");
});

number_input("bpm");
limit_input("bpm");
limit_input("name");

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var CHANNEL_RACK_BUTTON_RADIUS = 35 | 0;
var CHANNEL_RACK_BUTTON_GAP = 20 | 0;
var CHANNEL_RACK_BUTTON_Y_GAP = 40 | 0;
var CHANNEL_RACK_BUTTON_OFFSET = -8 | 0;
var CHANNEL_RACK_BUTTON_ICON_GAP = 40 | 0;
var CHANNEL_RACK_BUTTON_ICON_SIZE = 35 | 0;
var CHANNEL_RACK_BUTTON_Y = 280 | 0;

function fill_n_false(n) {
    var array = [];
    for (i = 0 | 0; i < (n | 0); ++i) {
        array.push(false);
    }
    return array
}

var channel_rack = {
    snare: {
        beats: fill_n_false(16 | 0),
        name: "snare"
    },
    kick: {
        beats: fill_n_false(16 | 0),
        name: "kick"
    },
    hihat: {
        beats: fill_n_false(16 | 0),
        name: "hihat"
    }
};

function channel_rack_icons(tab, element_id, url, n) {
    image(
        element_id,
        url
    );

    setPosition(
        element_id,
        130,
        CHANNEL_RACK_BUTTON_Y
            - (((CHANNEL_RACK_BUTTON_GAP + (16 | 0))
            - ((CHANNEL_RACK_BUTTON_Y_GAP + (24 | 0)) * n))),
        CHANNEL_RACK_BUTTON_ICON_SIZE,
        CHANNEL_RACK_BUTTON_ICON_SIZE
    );

    tabs_insert_element(tab, element_id);
}

function channel_rack_tab() {
    var tab_idx = 0;
    for (; tab_idx < screen.timeline.state.tabs.tab.length; ++tab_idx) {
        if (screen.timeline.state.tabs.tab[tab_idx].name === "Channel Rack") {
            break;
        }
    }

    var tab = screen.timeline.state.tabs.tab[tab_idx];
    if (tab.loaded) {
        tabs_show(tab);
    } else {
        channel_rack_icons(
            tab,
            "snare_icon",
            "https://cdn1.iconfinder.com/data/icons/music-outline-8/32/icon_music_24_icon_-07-1024.png",
            0 | 0
        );

        channel_rack_icons(
            tab,
            "kick_icon",
            "https://cdn3.iconfinder.com/data/icons/drummer-set/100/kickdrumm-1024.png",
            1 | 0
        );

        channel_rack_icons(
            tab,
            "hihat",
            "https://cdn4.iconfinder.com/data/icons/music-208/32/Music_band_drums_cymbals_hihat_play_rhythm-1024.png",
            2 | 0
        );

        for (i = 0 | 0; i < ((4 | 0) * (4 | 0) | 0); ++i) {
            channel_rack_buttons(tab, i, channel_rack.snare);
        }

        for (i = 0 | 0; i < ((4 | 0) * (4 | 0) | 0); ++i) {
            channel_rack_buttons(tab, i, channel_rack.kick);
        }

        for (i = 0 | 0; i < ((4 | 0) * (4 | 0) | 0); ++i) {
            channel_rack_buttons(tab, i, channel_rack.hihat);
        }

        tab.loaded = true;
    }
}

function channel_rack_buttons(tab, idx, sample) {
    var element_id = sample.name + idx;
    if (sample.beats[idx]) {
        image(element_id, "icon://fa-circle");
    } else {
        image(element_id, "icon://fa-circle-thin");
    }

    var y = CHANNEL_RACK_BUTTON_Y;

    if (sample.name === "snare") {
        y += CHANNEL_RACK_BUTTON_GAP * 0 | 0;
    }

    if (sample.name === "kick") {
        y += (CHANNEL_RACK_BUTTON_GAP + CHANNEL_RACK_BUTTON_Y_GAP) * (1 | 0) | 0;
    }

    if (sample.name === "hihat") {
        y += (CHANNEL_RACK_BUTTON_GAP + CHANNEL_RACK_BUTTON_Y_GAP) * (2 | 0) | 0;
    }

    setPosition(
        element_id,
        (idx * CHANNEL_RACK_BUTTON_GAP) + CHANNEL_RACK_BUTTON_OFFSET,
        y,
        CHANNEL_RACK_BUTTON_RADIUS,
        CHANNEL_RACK_BUTTON_RADIUS
    );

    onEvent(element_id, "click", function() {
        var is_checked = sample.beats[idx];
        if (is_checked) {
            setImageURL(element_id, "icon://fa-circle-thin");
        } else {
            setImageURL(element_id, "icon://fa-circle");
        }
        sample.beats[idx] = !is_checked;
    });

    tabs_insert_element(tab, element_id);
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var metronome = {
    toggle: false,
    beat_divisor: 1
};

onEvent("metronome_button", "click", function() {
    if (!metronome.toggle) {
        setProperty("metronome_button", "border-width", 5 | 0);
    } else {
        setProperty("metronome_button", "border-width", 0 | 0);
    }
    metronome.toggle = !metronome.toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var audio = {
	master_audio: 100,
	snare: 90,
	kick: 60,
	hihat: 70
};

function sound_panel_tab(screen_name) {
	//var tabs = screen_name.state.tabs;
	//tabs_clear(tabs);

}
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
var alert_n = 0 | 0;
function alert_border(n) {
    image("alert_border" + "_" + n, "Untitled.png");
    setProperty("alert_border" + "_" + n, "width", 130);
    setProperty("alert_border" + "_" + n, "height", 83);
    setProperty("alert_border" + "_" + n, "x", 180);
    setProperty("alert_border" + "_" + n, "y", 10);
    setProperty("alert_border" + "_" + n, "fit", "fill");
    setProperty("alert_border" + "_" + n, "border-width", 6);
    setProperty("alert_border" + "_" + n, "border-color", rgb(159, 159, 159, 0.9));
}

function alert_head(text, n) {
    textLabel("alert_head" + "_" + n, text);
    setPosition("alert_head" + "_" + n, 190, 20, 100, 25);
    setProperty("alert_head" + "_" + n, "text-color", rgb(181, 188, 193));
    setProperty("alert_head" + "_" + n, "font-size", 14);
}

function alert_sub(text, n) {
    textLabel("alert_sub" + "_" + n, text);
    setPosition("alert_sub" + "_" + n, 190, 40, 125, 50);
    setProperty("alert_sub" + "_" + n, "text-color", rgb(181, 188, 193));
    setProperty("alert_sub" + "_" + n, "font-size", 11);
}

function alert(head, sub) {
    alert_border(alert_n);
    alert_head(head, alert_n);
    alert_sub(sub, alert_n);

    var alert_n_scoped = alert_n;
    setTimeout(function() {
        deleteElement("alert_head" + "_" + alert_n_scoped);
        deleteElement("alert_sub" + "_" + alert_n_scoped);
        deleteElement("alert_border" + "_" + alert_n_scoped);
        --alert_n;
    }, 3000 | 0);
    ++alert_n;
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var TAB_BUTTON_HEIGHT = 24 | 0;
var TAB_BUTTON_GAP = 4 | 0;
var TAB_BUTTON_Y = 210 | 0;
var TAB_BUTTON_FONT_SIZE = 10 | 0;

/// Takes in array of strings, and creates
/// tab buttons.
function tabs_create(tabs) {
    var len = tabs.tab.length | 0;
    var TAB_BUTTON_WIDTH = (300 / len) | 0;

    tabs.tab.forEach(function(tab, idx) {
        if (tabs.current === tab.name) {
            tab.callback();
        }
        a_button(
            tab.id,
            tab.name,
            ((idx * (TAB_BUTTON_GAP + TAB_BUTTON_WIDTH))) + 8 | 0,
            TAB_BUTTON_Y,
            TAB_BUTTON_WIDTH,
            TAB_BUTTON_HEIGHT,
            BUTTON_TEXT_COLOR,
            BUTTON_BG[(tabs.current === tab.name) | 0],
            TAB_BUTTON_FONT_SIZE
        );

        onEvent(tab.id, "click", function() {
            tabs_select(tabs, tab.name);
        });
    });
}

function tabs_select(tabs, tab_name) {
    tabs.tab.forEach(function(tab) {
        if (tabs.current === tab.name) {
            tabs_clear(tab);
        }
    });
    tabs.current = tab_name;
    tabs.tab.forEach(function(tab) {
        if (tabs.current === tab.name) {
            tab.callback();
        }
        setProperty(
            tab.id,
            "background-color",
            BUTTON_BG[(tabs.current === tab.name) | 0]
        );
    });
}

function tabs_clear(tab) {
    if (tab != null) {
        tab.elements_id.forEach(function(id) {
            hideElement(id);
        });
    }
    //tabs.elements_id = [];
}

function tabs_show(tab) {
    if (tab != null) {
        tab.elements_id.forEach(function(id) {
            showElement(id);
        });
    }
}

function tabs_insert_element(tab, element_id) {
    tab.elements_id.push(element_id);
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
