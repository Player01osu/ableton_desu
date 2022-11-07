FILES := ux.js state.js alert.js tabs.js tooltip.js playback.js queue.js timeline/*.js
OUTPUT := "app.js"

all:
	cat $(FILES) > $(OUTPUT)

clean:
	rm -f $(OUTPUT)
