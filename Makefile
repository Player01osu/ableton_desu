FILES := "ux.js"
OUTPUT := "app.js"

all:
	cat $(FILES) > $(OUTPUT)

clean:
	rm -f $(OUTPUT)
