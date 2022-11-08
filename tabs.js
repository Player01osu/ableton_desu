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
