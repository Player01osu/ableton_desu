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

var alert_n = 0 | 0;

var ALERT_BORDER_WIDTH = 130 | 0;
var ALERT_BORDER_HEIGHT = 83 | 0;
var ALERT_BORDER_Y_OFFSET = 10 | 0;

function alert_border(id) {
    var alert_border_id = "alert_border_" + id;
    var y = ALERT_BORDER_Y_OFFSET + (ALERT_BORDER_HEIGHT * queue_length(alert_queue));

    image(alert_border_id, "icon://fa-stop");
    setPosition(alert_border_id, 180, y, ALERT_BORDER_WIDTH, ALERT_BORDER_HEIGHT);
    setProperty(alert_border_id, "fit", "none");
    setProperty(alert_border_id, "icon-color", rgb(218,92,201,0.9));
    setProperty(alert_border_id, "border-width", 6);
    setProperty(alert_border_id, "border-color", rgb(159, 159, 159, 0.9));

    return alert_border_id;
}

var ALERT_HEAD_WIDTH = 100 | 0;
var ALERT_HEAD_HEIGHT = 25 | 0;
var ALERT_HEAD_Y_OFFSET = 20 | 0;

function alert_head(text, id) {
    var alert_head_id = "alert_head_" + id;
    var y = ALERT_HEAD_Y_OFFSET + (ALERT_BORDER_HEIGHT * queue_length(alert_queue));

    textLabel(alert_head_id, text);
    setPosition(alert_head_id, 190, y, ALERT_HEAD_WIDTH, ALERT_HEAD_HEIGHT);
    setProperty(alert_head_id, "text-color", rgb(181, 188, 193));
    setProperty(alert_head_id, "font-size", 14);
    return alert_head_id;
}

var ALERT_SUB_WIDTH = 125 | 0;
var ALERT_SUB_HEIGHT = 50 | 0;
var ALERT_SUB_Y_OFFSET = 40 | 0;

function alert_sub(text, id) {
    var alert_sub_id = "alert_sub_" + id;
    var y = ALERT_SUB_Y_OFFSET + (ALERT_BORDER_HEIGHT * queue_length(alert_queue));

    textLabel(alert_sub_id, text);
    setPosition(alert_sub_id, 190, y, ALERT_SUB_WIDTH, ALERT_SUB_HEIGHT);
    setProperty(alert_sub_id, "text-color", rgb(181, 188, 193));
    setProperty(alert_sub_id, "font-size", 11);
    return alert_sub_id;
}

var alert_queue = queue_new();
var alert_n = 0 | 0;

function alert(head, sub) {
    var border_id = alert_border(alert_n);
    var head_id = alert_head(head, alert_n);
    var sub_id = alert_sub(sub, alert_n);

    var alert_this = {
        border_id: border_id,
        head_id: head_id,
        sub_id: sub_id
    };
    queue_enqueue(alert_queue, alert_this);

    setTimeout(function() {
        var alert_pop = queue_dequeue(alert_queue);

        var le_head_id = alert_pop.head_id;
        var le_border_id = alert_pop.border_id;
        var le_sub_id = alert_pop.sub_id;

        deleteElement(le_head_id);
        deleteElement(le_border_id);
        deleteElement(le_sub_id);

        queue_for_each(alert_queue, function(alert) {
            var head_cur = getProperty(alert.head_id, "y");
            var sub_cur = getProperty(alert.sub_id, "y");
            var border_cur = getProperty(alert.border_id, "y");

            setProperty(alert.head_id, "y", head_cur - ALERT_BORDER_HEIGHT);
            setProperty(alert.sub_id, "y", sub_cur - ALERT_BORDER_HEIGHT);
            setProperty(alert.border_id, "y", border_cur - ALERT_BORDER_HEIGHT);
        });
    }, 3000 | 0);
    ++alert_n;
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
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

function queue_new() {
    var queue = {
        elements: {},
        head: 0,
        tail: 0
    };
    return queue;
}

function queue_enqueue(queue, element) {
    queue.elements[queue.tail] = element;
    queue.tail++;
}

function queue_dequeue(queue) {
    var element = queue.elements[queue.head];
    delete queue.elements[queue.head];
    queue.head++;
    return element;
}

function queue_length(queue) {
    return queue.tail - queue.head;
}

function queue_is_empty(queue) {
    return queue_length(queue) === 0;
}

function queue_for_each(queue, callback) {
    for (var i = queue.head; i < queue.tail; ++i) {
        callback(queue.elements[i]);
    }
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4

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

    // FIXME Tabs idx for faster lookup.
    // Reason: Tabs are statically created, and
    // therefore their idx can be statically
    // declared.
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

var TIMELINE_CHANNEL_RACK_TAB_IDX = 0 | 0;
var TIMELINE_SOUND_PANEL_TAB_IDX = 1 | 0;

var screen = {
    start_proj: {
        id: "start_proj",
        idx: 0,
        state: null
    },
    timeline: {
        id: "timeline",
        idx: 1,
        state: new_state(
            ["Channel Rack", "Sound Panel"],
            "Channel Rack"
        )
    },
    effects: {
        id: "effects",
        idx: 2,
        state: null
    },
    filters: {
        id: "filters",
        idx: 3,
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

function load_tab_state(state) {
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
        // FIXME Tabs idx for faster lookup.
        // Reason: Tabs are statically created, and
        // therefore their idx can be statically
        // declared.
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
    // FIXME Tabs idx for faster lookup.
    // Reason: Tabs are statically created, and
    // therefore their idx can be statically
    // declared.
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
}

// Tabs hold references to elements within said
// tab. References are explicit, and must be added
// through the tabs_insert_element() function.
function tabs_show(tab) {
    if (tab != null) {
        tab.elements_id.forEach(function(id) {
            showElement(id);
        });
    }
}

// Add reference to tab. This allows tabs to manage
// state of elements inside of themselves, such as
// showing and hiding elements.
function tabs_insert_element(tab, element_id) {
    tab.elements_id.push(element_id);
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
//
// ToolTip {
//     Icon: {
//         Id: String,
//         Position: {
//             x: Int,
//             y: Int
//         },
//         Image: URL
//     },
//     Message: {
//         Position: {
//             x: Int,
//             y: Int
//         },
//         Background: {
//             Id: String,
//         },
//         Text: {
//             Id: String,
//             Content: String
//         }
//     }
// }

/// Position object must contain an x and y
function tooltip_new(id, content, position, below) {
    if (!isFinite(position.x) || !isFinite(position.y)) {
        console.log("Invalid position argument");
        return null;
    }

    var CONTENT_Y_OFFSET = 72 | 0;

    var content_pos = {
        x: position.x,
        y: position.y - CONTENT_Y_OFFSET
    };

    if (below) {
        content_pos.y = (position.y + (CONTENT_Y_OFFSET / 2) - 4) | 0;
    }

    var message = new_message("tooltip_" + id, content, position, {w: 130 | 0, h: 80 | 0});

    var tooltip = {
        icon: {
            id: "tooltip_icon_" + id,
            position: position
        },
        message: message
    };

    // TODO dynamically sized message
    //messagePosition(message, {x: message.position.x, y: message.position.y, w: 130 | 0, h: 80 | 0});
    messageProperty(message, "hidden", true);

    var icon = tooltip.icon;
    image(icon.id, "icon://fa-question-circle");
    setPosition(icon.id, icon.position.x, icon.position.y, 30 | 0, 30 | 0);
    setProperty(icon.id, "icon-color", rgb(193, 193, 193, 0.81));

    function hide_mouseover(id, message) {
        onEvent(id, "mouseover", function() {
            messageProperty(message, "hidden", false);
        });
        onEvent(id, "mouseout", function() {
            messageProperty(message, "hidden", true);
        });
    }

    hide_mouseover(icon.id, message);
    hide_mouseover(message.text.id, message);

    return tooltip;
}

tooltip_new("bruh", "test_yee", {x: 100, y: 120});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var MAX_INPUT_LENGTH = 24 | 0;
var BUTTON_TEXT_COLOR = rgb(255, 255, 255);
var BUTTON_BG = [rgb(122, 0, 255), rgb(122, 0, 255, 0.50)];

var proj_name = null;
var bpm = null | 0;
var screen_sel = null;

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

function messagePosition(message, position) {
    setPosition(message.text.id, position.x, position.y, position.w, position.h);
    setPosition(message.background.id, position.x, position.y, position.w, position.h);
}

function messageProperty(message, property, value) {
    setProperty(message.text.id, property, value);
    setProperty(message.background.id, property, value);
}

/// Position object must contain an x and y
/// Size object {w: int, h: int}
function new_message(id, content, position, size) {
    if (!isFinite(position.x) || !isFinite(position.y)) {
        console.log("Invalid position argument");
        return null;
    }

    var message = {
        text: {
            id: id + "_message_content",
            content: content
        },
        background: {
            id: id + "_message_background",
        },
        position: position,
        size: size
    };

    var background = message.background;
    image(background.id, "icon://fa-stop");
    setProperty(background.id, "fit", "none");
    setProperty(background.id, "icon-color", rgb(218 , 92, 201, 0.9));
    setProperty(background.id, "border-width", 2 | 0);
    setProperty(background.id, "border-color", rgb(159, 159, 159, 0.9));

    var text = message.text;
    textLabel(text.id, text.content);
    setProperty(text.id, "text-align", "center");
    setProperty(text.id, "font-size", 11 | 0);

    messagePosition(
        message,
        {
            x: message.position.x,
            y: message.position.y,
            w: message.size.w,
            h: message.size.h
        }
    );

    return message;
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
        load_tab_state(screen_name.state);
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

function switch_screen(screen_name) {
    setScreen(screen_name.id);
    screen_sel = screen_name.id;

    redraw_ux_buttons(screen_name);
    load_tab_state(screen_name.state);
}

onEvent("bpm_slider", "input", function() {
    bpm = getNumber("bpm_slider") | 0;
    setText("bpm_box", bpm + " bpm");
});

number_input("bpm");
limit_input("bpm");
limit_input("name");

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var CHANNEL_RACK_BUTTON_RADIUS = 24 | 0;
var CHANNEL_RACK_BUTTON_GAP = 19 | 0;
var CHANNEL_RACK_BUTTON_Y_GAP = 40 | 0;
var CHANNEL_RACK_BUTTON_OFFSET = 3 | 0;
var CHANNEL_RACK_BUTTON_ICON_GAP = 38 | 0;
var CHANNEL_RACK_BUTTON_ICON_SIZE = 35 | 0;
var CHANNEL_RACK_BUTTON_Y = 280 | 0;

function channel_rack_beat_toggle(sample, idx) {
    var is_checked = sample.beats[idx];
    var element_id = channel_rack_element_id(sample, idx);

    if (is_checked) {
        setImageURL(element_id, "icon://fa-circle-thin");
        sample.beats[idx] = false;
    } else {
        setImageURL(element_id, "icon://fa-circle");
        sample.beats[idx] = true;
    }
}


function fill_n_false(n) {
    var array = [];
    var i = 0;
    for (i = 0 | 0; i < (n | 0); ++i) {
        array[i] = false;
    }
    return array;
}

function fill_n_string(n) {
    var array = [];
    var i = 0;
    for (i = 0 | 0; i < (n | 0); ++i) {
        array[i] = "";
    }
    return array;
}

var channel_rack = {
    snare: {
        beats: fill_n_false(16 | 0),
        samples: ["", "normal-hitclap2.mp3", "LR2_DSnare.mp3", "normal-hitclap99.mp3"],
        sample_idx: 1,
        name: "snare",
        idx: 0
    },
    kick: {
        beats: fill_n_false(16 | 0),
        samples: ["", "drum-hitwhistle.mp3", "LR2_KickBassD2.mp3", "LR2_Kick-Total-beat.mp3"],
        sample_idx: 1,
        name: "kick",
        idx: 1
    },
    hihat: {
        beats: fill_n_false(16 | 0),
        samples: ["", "drum-hitnormalh.mp3"],
        sample_idx: 1,
        name: "hihat",
        idx: 2
    }
};

function channel_rack_play_beat_sub(beat) {
    if (channel_rack.snare.beats[beat]) {
        playSound(channel_rack.snare.samples[channel_rack.snare.sample_idx]);
    }

    if (channel_rack.kick.beats[beat]) {
        playSound(channel_rack.kick.samples[channel_rack.kick.sample_idx]);
    }

    if (channel_rack.hihat.beats[beat]) {
        playSound(channel_rack.hihat.samples[channel_rack.hihat.sample_idx]);
    }
}

function channel_rack_reset(tab) {
    // FIXME Overwrite with empty because this is slow.
    for (var idx = 0; idx < 16; ++idx) {
        if (channel_rack.snare.beats[idx]) {
            channel_rack_beat_toggle(channel_rack.snare, idx);
        }
        if (channel_rack.kick.beats[idx]) {
            channel_rack_beat_toggle(channel_rack.kick, idx);
        }
        if (channel_rack.hihat.beats[idx]) {
            channel_rack_beat_toggle(channel_rack.hihat, idx);
        }
    }
}


function channel_rack_is_beat(idx) {
    return channel_rack.snare.beats[idx] ||
        channel_rack.kick.beats[idx] ||
        channel_rack.hihat.beats[idx];
}

function channel_rack_is_empty() {
    for (var i = 0; i < 16; ++i) {
        if (channel_rack_is_beat(i)) {
            return false;
        }
    }
    return true;
}

function channel_rack_icons(tab, element_id, url, n) {
    image(
        element_id,
        url
    );

    setPosition(
        element_id,
        130,
        CHANNEL_RACK_BUTTON_Y
            - (((CHANNEL_RACK_BUTTON_ICON_GAP)
            - ((CHANNEL_RACK_BUTTON_Y_GAP + (23 | 0)) * n))),
        CHANNEL_RACK_BUTTON_ICON_SIZE,
        CHANNEL_RACK_BUTTON_ICON_SIZE
    );

    onEvent(element_id, "click", function(e) {
        var inc = 1;
        if (e.ctrlKey) {
            inc = -1;
        }

        switch (n) {
            case 0:
                channel_rack.snare.sample_idx =
                    (channel_rack.snare.sample_idx + inc)
                    % channel_rack.snare.samples.length;
                break;
            case 1:
                channel_rack.kick.sample_idx =
                    (channel_rack.kick.sample_idx + inc)
                    % channel_rack.kick.samples.length;
                break;
            case 2:
                channel_rack.hihat.sample_idx =
                    (channel_rack.hihat.sample_idx + inc)
                    % channel_rack.hihat.samples.length;
                break;
            default:
                console.log("Unreachable: function channel_rack_icons(tab, element_id, url, n)");
        }
    });

    tabs_insert_element(tab, element_id);
}

function channel_rack_tab() {
    var tab = screen.timeline.state.tabs.tab[TIMELINE_CHANNEL_RACK_TAB_IDX];
    if (tab.loaded) {
        tabs_show(tab);
        return true;
    }

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

    var reset_element_id = "channel_rack_reset_b";
    a_button(
        reset_element_id,
        "Reset",
        236,
        245,
        75,
        23,
        BUTTON_TEXT_COLOR,
        BUTTON_BG[0],
        10 | 0
    );

    onEvent(reset_element_id, "click", function() {channel_rack_reset(tab)});

    tabs_insert_element(tab, reset_element_id);

    var i = 0;
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
    return false;
}

function channel_rack_element_id(sample, idx) {
    return sample.name + idx;
}

function channel_rack_buttons(tab, idx, sample) {
    var element_id = channel_rack_element_id(sample, idx);
    image(element_id, "icon://fa-circle-thin");

    var y = CHANNEL_RACK_BUTTON_Y +
        ((CHANNEL_RACK_BUTTON_GAP + CHANNEL_RACK_BUTTON_Y_GAP) *
        (sample.idx | 0)) | 0;

    setPosition(
        element_id,
        (idx * CHANNEL_RACK_BUTTON_GAP) + CHANNEL_RACK_BUTTON_OFFSET,
        y,
        CHANNEL_RACK_BUTTON_RADIUS,
        CHANNEL_RACK_BUTTON_RADIUS
    );

    onEvent(element_id, "click", function() {
        channel_rack_beat_toggle(sample, idx);
    });

    tabs_insert_element(tab, element_id);
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var metronome = {
    toggle: false,
    beat_divisor: 1
};

onEvent("metronome_button", "click", function() {
    setProperty("metronome_button", "border-color", rgb(0, 0, 0, !metronome.toggle | 0));
    metronome.toggle = !metronome.toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
var audio = {
    master_audio: 100 | 0,
    snare: 90 | 0,
    kick: 60 | 0,
    hihat: 70 | 0
};

function sound_panel_tab(screen_name) {
    var tab = screen_name.state.tabs.tab[TIMELINE_SOUND_PANEL_TAB_IDX];

    if (tab.loaded) {
        tabs_show(tab);
        return true;
    }

    switch (screen_name.idx) {
        case 1:
            setProperty("audio_master_timeline_label", "hidden", false);
            setProperty("audio_master_timeline_slider", "hidden", false);

            setProperty("audio_snare_label", "hidden", false);
            setProperty("audio_snare_slider", "hidden", false);

            setProperty("audio_kick_label", "hidden", false);
            setProperty("audio_kick_slider", "hidden", false);

            setProperty("audio_hihat_label", "hidden", false);
            setProperty("audio_hihat_slider", "hidden", false);

            tabs_insert_element(tab, "audio_master_timeline_slider");
            tabs_insert_element(tab, "audio_master_timeline_label");

            tabs_insert_element(tab, "audio_snare_slider");
            tabs_insert_element(tab, "audio_snare_label");

            tabs_insert_element(tab, "audio_kick_slider");
            tabs_insert_element(tab, "audio_kick_label");

            tabs_insert_element(tab, "audio_hihat_slider");
            tabs_insert_element(tab, "audio_hihat_label");

            setProperty("audio_master_timeline_slider", "value", audio.master_audio);
            setProperty("audio_snare_slider", "value", audio.snare);
            setProperty("audio_kick_slider", "value", audio.kick);
            setProperty("audio_hihat_slider", "value", audio.hihat);

            tab.loaded = true;
            break;
        default:
            console.log("UNREACHABLE: function sound_panel_tab(screen_name)");
    }
    return false;
}
// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
