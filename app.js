/*
 * Great question! Short answer: Game Lab & App Lab only support $ES5 features$ for
 * now. const and let, unfortunately, weren’t added until ES6.
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
 * get there. So, in the meantime, we’re stuck with only var.
 *
 * -Jessica, Code.org 3 Engineer
 * Feb 2020
 */
var MAX_INPUT_LENGTH = 24 | 0;
var BUTTON_TEXT_COLOR = rgb(255, 255, 255);
var BUTTON_BG = [rgb(122, 0, 255), rgb(122, 0, 255, 0.82)];

var proj_name = null;
var bpm = null | 0;
var screen_sel = null;

function new_state(tabs, tab_default) {
    var state = {
        tabs: {
            callbacks: [],
            created: false,
            current: tab_default,
            list: tabs,
            elements_id: []
        }
    };

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
            ["nut", "Channel Rack"],
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
    callbacks.forEach(function(callback) {
        tabs.callbacks.push(callback);
    });
}

set_tabs_callbacks(
    screen.timeline.state.tabs,
    [
        function(){tabs_clear(screen.timeline.state.tabs)},
        function(){channel_rack_tab()}
    ]
);

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
function channel_rack_tab() {
    var tabs = screen.timeline.state.tabs;
    tabs_clear(tabs);

    textLabel("test", "test");
    setPosition("test", 40, 305, 100, 100);
    tabs_insert_element(tabs, "test");
}
// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var metronome_toggle = false;

onEvent("metronome_button", "click", function() {
    if (!metronome_toggle) {
        setProperty("metronome_button", "border-width", 5 | 0);
    } else {
        setProperty("metronome_button", "border-width", 0 | 0);
    }
    metronome_toggle = !metronome_toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4

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
/// Takes in array of strings, and creates
/// tab buttons.
function tabs_create(tabs) {
    var len = tabs.list.length | 0;
    var BUTTON_WIDTH = (300 / len) | 0;
    var BUTTON_HEIGHT = 24 | 0;
    var BUTTON_GAP = 4 | 0;
    var BUTTON_Y = 230 | 0;
    var BUTTON_FONT_SIZE = 10 | 0;

    tabs.list.forEach(function(tab_name, idx) {
        var tab_id = tab_name.replace(' ', '_');
        if (tabs.current === tab_name) {
            tabs.callbacks[idx]();
        }
        a_button(
            tab_id,
            tab_name,
            ((idx * (BUTTON_GAP + BUTTON_WIDTH))) + 2 | 0,
            BUTTON_Y,
            BUTTON_WIDTH,
            BUTTON_HEIGHT,
            BUTTON_TEXT_COLOR,
            BUTTON_BG[(tabs.current === tab_name) | 0],
            BUTTON_FONT_SIZE
        );

        onEvent(tab_id, "click", function() {
            tabs_select(tabs, tab_name);
        });
    });
}

function tabs_select(tabs, tab_name) {
    tabs.current = tab_name;
    tabs.list.forEach(function(tab_name, idx) {
        var tab_id = tab_name.replace(' ', '_');
        if (tabs.current === tab_name) {
            tabs.callbacks[idx]();
        }

        setProperty(
            tab_id,
            "background-color",
            BUTTON_BG[(tabs.current === tab_name) | 0]
        );
    });
}

function tabs_clear(tabs) {
	tabs.elements_id.forEach(function(id) {
		deleteElement(id);
	});
    tabs.elements_id = [];
}

function tabs_insert_element(tabs, element_id) {
    tabs.elements_id.push(element_id);
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
