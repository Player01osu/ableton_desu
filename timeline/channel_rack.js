function channel_rack_tab() {
    var tabs = screen.timeline.state.tabs;
    tabs_clear(tabs);

    textLabel("test", "test");
    setPosition("test", 40, 305, 100, 100);
    tabs_insert_element(tabs, "test");
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
