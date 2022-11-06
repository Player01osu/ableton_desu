var TAB_BUTTON_HEIGHT = 24 | 0;
var TAB_BUTTON_GAP = 4 | 0;
var TAB_BUTTON_Y = 210 | 0;
var TAB_BUTTON_FONT_SIZE = 10 | 0;

/// Takes in array of strings, and creates
/// tab buttons.
function tabs_create(tabs) {
    var len = tabs.list.length | 0;
    var TAB_BUTTON_WIDTH = (300 / len) | 0;

    tabs.list.forEach(function(tab_name, idx) {
        var tab_id = tab_name.replace(' ', '_');
        if (tabs.current === tab_name) {
            tabs.callbacks[idx]();
        }
        a_button(
            tab_id,
            tab_name,
            ((idx * (TAB_BUTTON_GAP + TAB_BUTTON_WIDTH))) + 8 | 0,
            TAB_BUTTON_Y,
            TAB_BUTTON_WIDTH,
            TAB_BUTTON_HEIGHT,
            BUTTON_TEXT_COLOR,
            BUTTON_BG[(tabs.current === tab_name) | 0],
            TAB_BUTTON_FONT_SIZE
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
