var metronome_toggle = false;

onEvent("metronome_button", "click", function() {
    if (!metronome_toggle) {
        setProperty("metronome_button", "border-width", 5);
    } else {
        setProperty("metronome_button", "border-width", 0);
    }
    metronome_toggle = !metronome_toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
