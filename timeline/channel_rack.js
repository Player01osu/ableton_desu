var CHANNEL_RACK_BUTTON_RADIUS = 24 | 0;
var CHANNEL_RACK_BUTTON_GAP = 19 | 0;
var CHANNEL_RACK_BUTTON_Y_GAP = 40 | 0;
var CHANNEL_RACK_BUTTON_OFFSET = 3 | 0;
var CHANNEL_RACK_BUTTON_ICON_GAP = 38 | 0;
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
            - (((CHANNEL_RACK_BUTTON_ICON_GAP)
            - ((CHANNEL_RACK_BUTTON_Y_GAP + (22 | 0)) * n))),
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
