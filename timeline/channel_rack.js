var CHANNEL_RACK_BUTTON_RADIUS = 24 | 0;
var CHANNEL_RACK_BUTTON_GAP = 19 | 0;
var CHANNEL_RACK_BUTTON_Y_GAP = 40 | 0;
var CHANNEL_RACK_BUTTON_OFFSET = 3 | 0;
var CHANNEL_RACK_BUTTON_ICON_GAP = 38 | 0;
var CHANNEL_RACK_BUTTON_ICON_SIZE = 35 | 0;
var CHANNEL_RACK_BUTTON_Y = 280 | 0;

function beat_toggle(sample, idx) {
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

var channel_rack = {
    snare: {
        beats: fill_n_false(16 | 0),
        name: "snare",
        idx: 0
    },
    kick: {
        beats: fill_n_false(16 | 0),
        name: "kick",
        idx: 1
    },
    hihat: {
        beats: fill_n_false(16 | 0),
        name: "hihat",
        idx: 2
    }
};

function channel_rack_reset(tab) {
    // FIXME Overwrite with empty because this is slow.
    for (var idx = 0; idx < 16; ++idx) {
        if (channel_rack.snare.beats[idx]) {
            beat_toggle(channel_rack.snare, idx);
        }
        if (channel_rack.kick.beats[idx]) {
            beat_toggle(channel_rack.kick, idx);
        }
        if (channel_rack.hihat.beats[idx]) {
            beat_toggle(channel_rack.hihat, idx);
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
        beat_toggle(sample, idx);
    });

    tabs_insert_element(tab, element_id);
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
