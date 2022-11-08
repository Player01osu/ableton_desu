//
// ToolTip {
//     Icon: {
//         Id: String,
//         Position: {
//             x: Int,
//             y: Int
//         },
//         Image: URL
//     },
//     Message: {
//         Position: {
//             x: Int,
//             y: Int
//         },
//         Background: {
//             Id: String,
//         },
//         Text: {
//             Id: String,
//             Content: String
//         }
//     }
// }

/// Position object must contain an x and y
function tooltip_new(id, content, position, below) {
    if (!isFinite(position.x) || !isFinite(position.y)) {
        console.log("Invalid position argument");
        return null;
    }

    var CONTENT_Y_OFFSET = 72 | 0;

    var content_pos = {
        x: position.x,
        y: position.y - CONTENT_Y_OFFSET
    };

    if (below) {
        content_pos.y = (position.y + (CONTENT_Y_OFFSET / 2) - 4) | 0;
    }

    var message = new_message("tooltip_" + id, content, position, {w: 130 | 0, h: 80 | 0});

    var tooltip = {
        icon: {
            id: "tooltip_icon_" + id,
            position: position
        },
        message: message
    };

    // TODO dynamically sized message
    //messagePosition(message, {x: message.position.x, y: message.position.y, w: 130 | 0, h: 80 | 0});
    messageProperty(message, "hidden", true);

    var icon = tooltip.icon;
    image(icon.id, "icon://fa-question-circle");
    setPosition(icon.id, icon.position.x, icon.position.y, 30 | 0, 30 | 0);
    setProperty(icon.id, "icon-color", rgb(193, 193, 193, 0.81));

    function hide_mouseover(id, message) {
        onEvent(id, "mouseover", function() {
            messageProperty(message, "hidden", false);
        });
        onEvent(id, "mouseout", function() {
            messageProperty(message, "hidden", true);
        });
    }

    hide_mouseover(icon.id, message);
    hide_mouseover(message.text.id, message);

    return tooltip;
}

tooltip_new("bruh", "test_yee", {x: 100, y: 120});

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
