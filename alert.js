var alert_n = 0 | 0;
function alert_border(n) {
    image("alert_border" + "_" + n, "Untitled.png");
    setProperty("alert_border" + "_" + n, "width", 130);
    setProperty("alert_border" + "_" + n, "height", 83);
    setProperty("alert_border" + "_" + n, "x", 180);
    setProperty("alert_border" + "_" + n, "y", 10);
    setProperty("alert_border" + "_" + n, "fit", "fill");
    setProperty("alert_border" + "_" + n, "border-width", 6);
    setProperty("alert_border" + "_" + n, "border-color", rgb(159, 159, 159, 0.9));
}

function alert_head(text, n) {
    textLabel("alert_head" + "_" + n, text);
    setPosition("alert_head" + "_" + n, 190, 20, 100, 25);
    setProperty("alert_head" + "_" + n, "text-color", rgb(181, 188, 193));
    setProperty("alert_head" + "_" + n, "font-size", 14);
}

function alert_sub(text, n) {
    textLabel("alert_sub" + "_" + n, text);
    setPosition("alert_sub" + "_" + n, 190, 40, 125, 50);
    setProperty("alert_sub" + "_" + n, "text-color", rgb(181, 188, 193));
    setProperty("alert_sub" + "_" + n, "font-size", 11);
}

function alert(head, sub) {
    alert_border(alert_n);
    alert_head(head, alert_n);
    alert_sub(sub, alert_n);

    var alert_n_scoped = alert_n;
    setTimeout(function() {
        deleteElement("alert_head" + "_" + alert_n_scoped);
        deleteElement("alert_sub" + "_" + alert_n_scoped);
        deleteElement("alert_border" + "_" + alert_n_scoped);
        --alert_n;
    }, 3000 | 0);
    ++alert_n;
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
