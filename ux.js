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

var proj_name = null;
var bpm = null | 0;
var MAX_INPUT_LENGTH = 24 | 0;
var screen_sel = null;

setText("name","my_project");
setText("bpm", "120");

var ux_buttons = [];

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
    setProperty(id, "border-width", 1);
    setProperty(id, "border-color", rgb(77, 87, 95));
    setProperty(id, "border-radius", 4);
}

var BUTTON_TEXT_COLOR = rgb(255, 255, 255);
var BUTTON_BG = [rgb(122, 0, 255), rgb(122, 0, 255, 0.82)];

var ux_buttons_drawn = false;

function redraw_ux_buttons() {
    if (ux_buttons_drawn) {
        deleteElement("timeline_b");
        deleteElement("effects_b");
        deleteElement("filters_b");
    }
    ux_buttons_drawn = true;
    var BUTTON_WIDTH = 100;
    var BUTTON_HEIGHT = 40;

    a_button(
        "timeline_b",
        "Timeline",
        5,
        10,
        BUTTON_WIDTH,
        BUTTON_HEIGHT,
        BUTTON_TEXT_COLOR,
        BUTTON_BG[(screen_sel == "timeline") | 0],
        15
    );

    a_button(
        "effects_b",
        "Effects",
        110,
        10,
        BUTTON_WIDTH,
        BUTTON_HEIGHT,
        BUTTON_TEXT_COLOR,
        BUTTON_BG[(screen_sel == "effects") | 0],
        15
    );

    a_button(
        "filters_b",
        "Filters",
        215,
        10,
        BUTTON_WIDTH,
        BUTTON_HEIGHT,
        BUTTON_TEXT_COLOR,
        BUTTON_BG[(screen_sel == "filters") | 0],
        15
    );

    screen_to_onclick("timeline_b", "timeline");
    screen_to_onclick("effects_b", "effects");
    screen_to_onclick("filters_b", "filters");
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
        screen_sel = screen;
        setScreen(screen);
        redraw_ux_buttons();
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
    screen_sel = "timeline";
    setScreen("timeline");
    redraw_ux_buttons();
});

onEvent("bpm_slider", "input", function() {
    bpm = getNumber("bpm_slider") | 0;
    setText("bpm_box", bpm + " bpm");
});

number_input("bpm");
limit_input("bpm");
limit_input("name");

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
