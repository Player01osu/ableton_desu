
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
