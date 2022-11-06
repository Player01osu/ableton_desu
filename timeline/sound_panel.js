var audio = {
	master_audio: 100 | 0,
	snare: 90 | 0,
	kick: 60 | 0,
	hihat: 70 | 0
};

function sound_panel_tab(screen_name) {
    var tab_idx = 0 | 0;
    for (; tab_idx < screen.timeline.state.tabs.tab.length; ++tab_idx) {
        if (screen.timeline.state.tabs.tab[tab_idx].name === "Sound Panel") {
            break;
        }
    }

    var tab = screen.timeline.state.tabs.tab[tab_idx];

	if (tab.loaded) {
		tabs_show(tab);
	} else {
		if (screen_name.id === "timeline") {
			setProperty("audio_master_timeline_label", "hidden", false);
			setProperty("audio_master_timeline_slider", "hidden", false);

			setProperty("audio_snare_label", "hidden", false);
			setProperty("audio_snare_slider", "hidden", false);

			setProperty("audio_kick_label", "hidden", false);
			setProperty("audio_kick_slider", "hidden", false);

			setProperty("audio_hihat_label", "hidden", false);
			setProperty("audio_hihat_slider", "hidden", false);

			tabs_insert_element(tab, "audio_master_timeline_slider");
			tabs_insert_element(tab, "audio_master_timeline_label");

			tabs_insert_element(tab, "audio_snare_slider");
			tabs_insert_element(tab, "audio_snare_label");

			tabs_insert_element(tab, "audio_kick_slider");
			tabs_insert_element(tab, "audio_kick_label");

			tabs_insert_element(tab, "audio_hihat_slider");
			tabs_insert_element(tab, "audio_hihat_label");

			setProperty("audio_master_timeline_slider", "value", audio.master_audio);
			setProperty("audio_snare_slider", "value", audio.snare);
			setProperty("audio_kick_slider", "value", audio.kick);
			setProperty("audio_hihat_slider", "value", audio.hihat);

			tab.loaded = true;
		}
	}
}
