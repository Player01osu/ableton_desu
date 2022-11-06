FILES := ux.js state.js timeline/*.js  playback.js alert.js tabs.js
OUTPUT := "app.js"

all:
	cat $(FILES) > $(OUTPUT)

clean:
	rm -f $(OUTPUT)
