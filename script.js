function loadJSONFile(file, callback) {
	var client = new XMLHttpRequest();
	client.open('GET', file);
	client.onreadystatechange = function() {
		if (client.readyState === XMLHttpRequest.DONE) {
		  	callback(JSON.parse(client.responseText));
	    }
	}
	client.send();
}

function loadVersions() {
	loadJSONFile('./static-data/versions.json', function(content) {
		renderUpdates(content)
	})
}

function renderUpdates(updates) {
	for (var i = updates.length - 1; i >= 0; i--) {
		renderUpdate(updates[i])
	}	
}

function renderUpdate(update) {
	var html = '<div class="detail-row"><div><span class="version">' 
		+ update.version
		+ '</span><span class="footnote">'
		+ update.date 
		+ '</span></div><div><ul>'
	for (var i = 0; i <= update.changes.length - 1; i++) {
		html += '<li>' + update.changes[i] + '</li>'
	}
	html += '</ul></div></div>'
	document.getElementById("versions").innerHTML += html
}

function loadScreenshots() {
	loadJSONFile('./static-data/screenshots.json', function(content) {
		renderScreenshots(content)
	})
}

function renderScreenshots(screenshots) {
	for (var i = 0; i <= screenshots.length - 1; i++) {
		renderScreenshot(screenshots[i])
	}	
}

function renderScreenshot(screenshot) {
	const fileName = screenshot.name + "." + screenshot.file_extension
	const fileNameTwo = screenshot.name + "@2x." + screenshot.file_extension + " 2x"
	const html = '<img src="./images/' 
		+ fileName
		+ '" srcset="'
		+ fileName
		+ ','
		+ fileNameTwo
		+ '" class="screenshot" alt="'
		+ screenshot.alt 
		+ '" />'
	document.getElementById("screenshots").innerHTML += html

}