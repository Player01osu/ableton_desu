var metronome = {
    toggle: false,
    beat_divisor: 1
};

onEvent("metronome_button", "click", function() {
    setProperty("metronome_button", "border-color", rgb(0, 0, 0, !metronome.toggle | 0));
    metronome.toggle = !metronome.toggle;
});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
