FILES := ux.js timeline/*.js player.js alert.js
OUTPUT := "app.js"

all:
	cat $(FILES) > $(OUTPUT)

clean:
	rm -f $(OUTPUT)
