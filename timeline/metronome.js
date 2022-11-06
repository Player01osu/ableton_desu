var metronome = {
    toggle: false,
    beat_divisor: 1
};

onEvent("metronome_button", "click", function() {
    if (!metronome.toggle) {
        setProperty("metronome_button", "border-width", 5 | 0);
    } else {
        setProperty("metronome_button", "border-width", 0 | 0);
    }
    metronome.toggle = !metronome.toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
