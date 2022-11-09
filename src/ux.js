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
