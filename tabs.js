var tab_sel = null;

/// Takes in array of strings, and creates
/// tab buttons.
function create_tabs(tab_list) {
	var len = tab_list.length | 0;
	var BUTTON_WIDTH = (300 / len) | 0;
	var BUTTON_HEIGHT = 24 | 0;
	var BUTTON_GAP = 4 | 0;
	var BUTTON_Y = 230 | 0;
	var BUTTON_FONT_SIZE = 10 | 0;

	tab_list.forEach(function(tab, idx) {
		a_button(
			tab,
			tab,
			((idx * (BUTTON_GAP + BUTTON_WIDTH))) + 2 | 0,
			BUTTON_Y,
			BUTTON_WIDTH,
			BUTTON_HEIGHT,
			BUTTON_TEXT_COLOR,
			BUTTON_BG[(tab_sel == tab) | 0],
			BUTTON_FONT_SIZE
		);
	});
}
