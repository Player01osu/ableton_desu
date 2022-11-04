setText("name","my_project");
setText("bpm", "120");

function alert(head, sub) {
    showElement("alert_head");
    showElement("alert_sub");
    showElement("alert_border");
    setText("alert_head", head);
    setText("alert_sub", sub);

    setTimeout(function() {
        hideElement("alert_head");
        hideElement("alert_sub");
        setProperty("alert_border", "hidden", true);
    }, 3000);

}

onEvent("start", "click", function() {
    // Both name and bpm fields must be filled
    if (!getText("name")) {
        alert("Warning!", "Must have project name");
        return;
    }

    if (!getText("bpm")) {
        alert("Warning!", "Must have bpm set (default: 120)");
        return;
    }

    setScreen("timeline");
});

onEvent("timeline_b", "click", function() {
    setScreen("timeline");
});

onEvent("effects_b", "click", function() {
    setScreen("effects");
});

onEvent("filters_b", "click", function() {
    setScreen("filters");
});

onEvent("timeline_bb", "click", function() {
    setScreen("timeline");
});

onEvent("effects_bb", "click", function() {
    setScreen("effects");
});

onEvent("filters_bb", "click", function() {
    setScreen("filters");
});

onEvent("timeline_bbb", "click", function() {
    setScreen("timeline");
});

onEvent("effects_bbb", "click", function() {
    setScreen("effects");
});

onEvent("filters_bbb", "click", function() {
    setScreen("filters");
});



// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
