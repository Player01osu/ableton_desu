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
var proj_name = null;
var bpm = null;

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
        alert("Warning!", "bpm must be greater than 10, and less than 400");
        return;
    }

    setText("bpm_box", bpm + " bpm");
    setNumber("bpm_slider", getNumber("bpm"));
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

onEvent("bpm_slider", "input", function() {
    setText("bpm_box", getNumber("bpm_slider") + " bpm");
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
