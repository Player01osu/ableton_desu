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
