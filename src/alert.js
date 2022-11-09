/*
 * Great question! Short answer: Game Lab & App Lab only support $ES5 features$ for
 * now. const and let, unfortunately, weren't added until ES6.
 *
 * Long answer: JavaScript does support other keywords for variable declaration as
 * you mentioned. We use const and let all the time in our own code base. These are
 * handy keywords that were added in ES6 (the 6th iteration of JavaScript) due to
 * high demand. The tough part is that each new version of the JavaScript spec
 * brings in lots of changes. Each browser has to update their interpreter to
 * handle all these changes (in fact, Internet Explorer still lacks support for
 * most ES6 features). Our own interpreter for Game Lab and App Lab, while a pretty
 * fancy piece of software, was designed to work with the previous version of the
 * JavaScript spec, ES5. It is a goal of ours to eventually be able to support all
 * the new language features that are part of ES6, but it will be a lot of work to
 * get there. So, in the meantime, we're stuck with only var.
 *
 * -Jessica, Code.org 3 Engineer
 * Feb 2020
 */

var alert_n = 0 | 0;

var ALERT_BORDER_WIDTH = 130 | 0;
var ALERT_BORDER_HEIGHT = 83 | 0;
var ALERT_BORDER_Y_OFFSET = 10 | 0;

function alert_border(id) {
    var alert_border_id = "alert_border_" + id;
    var y = ALERT_BORDER_Y_OFFSET + (ALERT_BORDER_HEIGHT * queue_length(alert_queue));

    image(alert_border_id, "icon://fa-stop");
    setPosition(alert_border_id, 180, y, ALERT_BORDER_WIDTH, ALERT_BORDER_HEIGHT);
    setProperty(alert_border_id, "fit", "none");
    setProperty(alert_border_id, "icon-color", rgb(218,92,201,0.9));
    setProperty(alert_border_id, "border-width", 6);
    setProperty(alert_border_id, "border-color", rgb(159, 159, 159, 0.9));

    return alert_border_id;
}

var ALERT_HEAD_WIDTH = 100 | 0;
var ALERT_HEAD_HEIGHT = 25 | 0;
var ALERT_HEAD_Y_OFFSET = 20 | 0;

function alert_head(text, id) {
    var alert_head_id = "alert_head_" + id;
    var y = ALERT_HEAD_Y_OFFSET + (ALERT_BORDER_HEIGHT * queue_length(alert_queue));

    textLabel(alert_head_id, text);
    setPosition(alert_head_id, 190, y, ALERT_HEAD_WIDTH, ALERT_HEAD_HEIGHT);
    setProperty(alert_head_id, "text-color", rgb(181, 188, 193));
    setProperty(alert_head_id, "font-size", 14);
    return alert_head_id;
}

var ALERT_SUB_WIDTH = 125 | 0;
var ALERT_SUB_HEIGHT = 50 | 0;
var ALERT_SUB_Y_OFFSET = 40 | 0;

function alert_sub(text, id) {
    var alert_sub_id = "alert_sub_" + id;
    var y = ALERT_SUB_Y_OFFSET + (ALERT_BORDER_HEIGHT * queue_length(alert_queue));

    textLabel(alert_sub_id, text);
    setPosition(alert_sub_id, 190, y, ALERT_SUB_WIDTH, ALERT_SUB_HEIGHT);
    setProperty(alert_sub_id, "text-color", rgb(181, 188, 193));
    setProperty(alert_sub_id, "font-size", 11);
    return alert_sub_id;
}

var alert_queue = queue_new();
var alert_n = 0 | 0;

function alert(head, sub) {
    var border_id = alert_border(alert_n);
    var head_id = alert_head(head, alert_n);
    var sub_id = alert_sub(sub, alert_n);

    var alert_this = {
        border_id: border_id,
        head_id: head_id,
        sub_id: sub_id
    };
    queue_enqueue(alert_queue, alert_this);

    setTimeout(function() {
        var alert_pop = queue_dequeue(alert_queue);

        var le_head_id = alert_pop.head_id;
        var le_border_id = alert_pop.border_id;
        var le_sub_id = alert_pop.sub_id;

        deleteElement(le_head_id);
        deleteElement(le_border_id);
        deleteElement(le_sub_id);

        queue_for_each(alert_queue, function(alert) {
            var head_cur = getProperty(alert.head_id, "y");
            var sub_cur = getProperty(alert.sub_id, "y");
            var border_cur = getProperty(alert.border_id, "y");

            setProperty(alert.head_id, "y", head_cur - ALERT_BORDER_HEIGHT);
            setProperty(alert.sub_id, "y", sub_cur - ALERT_BORDER_HEIGHT);
            setProperty(alert.border_id, "y", border_cur - ALERT_BORDER_HEIGHT);
        });
    }, 3000 | 0);
    ++alert_n;
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
