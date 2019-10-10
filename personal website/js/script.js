// the readings' data from the XML file
let dataContainer;

console.log("Creating... a connection...");

/*
	Asynchronously, using ajax and jquery, fetches the xml for the readings page.

*/
function createConnection(){
	console.log("Attempting to fetch the XML file...");

	let xhr = new XMLHttpRequest();
	let xml = xhr.responseXML;
	//Opens the xml file asynchronously

	$.ajax(
		{
			url: 'data/readings.xml',
			type: 'GET',
			dataType: 'xml',
			timeout: 1000,
			error: function(){
				alert('Error loading the xml file.');
			},
			success: function(data){
				console.log("Successfully fetched the readings' XML file.");
				dataContainer = data;
			}
		}
	);
}

/**

	Clears the page's current display. Clears all the pages that could have
	been injected.

*/
function clearCurrentContent(){
	let currentContent = document.getElementsByClassName('treeDisplay')[0];
	$('.treeDisplay, .projectsDisplay, .blogDisplay, .artDisplay, .uxUiDisplay').each
	(
		function(i, obj)
		{
			this.remove();
		}
	)
}

/**

	Creates and displays the table of readings.

*/
function loadTableOfReadings(){
	clearCurrentContent();
	console.log("Loading table of readings");
	// Create a div and parents it to the main display. Adds a class to it.
	let treeParent = document.createElement('div');
	let mainDisplay = document.getElementsByClassName('mainDisplay')[0];
	mainDisplay.append(treeParent);
	treeParent.classList.add("treeDisplay");

	// Create our fieldset and the tree (table of readings) to be displayed inside
	let fieldsetTree = document.createElement("FIELDSET");
	fieldsetTree.setAttribute("id", "fieldsetTreeView"); // TODO change to class if intends to re-use
	let tree = "<ul id=\"readingsTreeView\">" +
				    "<li><span class=\"caret\">First Class</span>" +
						"<ul class=\"nested\">" + //beginning of nested ul
							"<a href=\"#FIRST_READING\"><li>Roy Rosenzweig, Writing the History of the Internet</li></a>" +
						"</ul></a>" +
					"<li><span class=\"caret\">Second Class</span>" +
						"<ul class=\"nested\">" +
							"<a href=\"#SECOND_READING\"><li>Daniel Joseph, The Time Canada Wanted Its Own Internet Because" +
							"It Thought the US Would Mess It Up" +
							"</li></a>" +
							"<a href=\"#THIRD_READING\"><li>Fred Turner, From Counterculture to Cyberculture</span></li></a>" +
						"</ul>" +
					"<li><span class=\"caret\">Third Class</span>" +
						"<ul class=\"nested\">" +
							"<a href=\"#FOURTH_READING\"><li>Rachel Greene, Web Work: A History of Internet Art</li></a>" +
							"<a href=\"#FIFTH_READING\"><li>Carolina Miranda, The New World of Net Art</li></a>" +
						"</ul>" +
					"<li><span class=\"caret\">Fifth Class</span>" +
						"<ul class=\"nested\">" +
							"<a href=\"#SIXTH_READING\"><li>Richard Stallman: The GNU Manifesto</li></a>" +
							"<a href=\"#SEVENTH_READING\"><li>Gavin Mueller: Digital Proudhonism</li></a>" +
						"</ul>" +
				"</ul>";//end of nested ul
	fieldsetTree.innerHTML = tree; // Injects the tree into the fieldset's innerhtml
	treeParent.appendChild(fieldsetTree); //appends the div of the tree to the fieldset
}


/**

	Creates and displays and the readings' accordion.

*/
function loadAccordion(){
	let treeParent = document.getElementsByClassName('treeDisplay')[0];
	console.log("Loading the XML into the website...");
	let mainDisplay = document.getElementById("MainDisplay");
	let titles = ""; // Contains the date of the classes (cart 211)
	let readingTexts = []; // Contains the actual text

	// Would put in a loop to iterate over the DOM elements... but... this seemed easier to read for this exercise

	/**
		Loop through the readings.

	*/
	// Use an iterator to go through the XML DOM.
	let iterator = dataContainer.firstChild;
	// iterator is placed on the first element of the document.

	if(!iterator) {
		alert("iterator null");
	}
	// While the iterator has not reached the end of the XML DOM.
	while(iterator.firstChild !== dataContainer.lastChild) {
			alert("Iterating through...");
			if(iterator.nodeType === "1") {
				// it's an element node
				alert(iterator.firstChild.nodeValue);
			}
			iterator = iterator.nextSibling;
	}

	readingTexts[0] = dataContainer.firstChild.firstChild.firstChild.nodeValue;
	console.log("First reading" + readingTexts[0]);

	readingTexts[1] = dataContainer.firstChild.firstChild.nextElementSibling.firstChild.nodeValue;
	console.log("Second reading: " + readingTexts[1]);

	readingTexts[2] = dataContainer.firstChild.firstChild.nextElementSibling.nextElementSibling.firstChild.nodeValue;
	console.log("Third reading: " + readingTexts[2]);

	readingTexts[3] = dataContainer.firstChild.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nodeValue;
	console.log("Fourth reading: " + readingTexts[3]);

	readingTexts[4] = dataContainer.firstChild.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nodeValue;
	console.log("Fifth reading: " + readingTexts[4]);

	readingTexts[5] = dataContainer.firstChild.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nodeValue;
	console.log("Sixth reading: " + readingTexts[5]);

	readingTexts[6] = dataContainer.firstChild.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nodeValue;
	console.log("Seventh reading: " + readingTexts[6]);

	// Start at the beginning of the xml document
	let iterator2 = dataContainer.firstChild.firstChild;
	let xmlDocLength = dataContainer.firstChild.childNodes.length;

	// Loop over the titles for the accordions as written in the xml's tags
	for(let i = 0; i < xmlDocLength; i++)
	{
		if(iterator.nodeType === 1) // Check if it is an element tag (nodeType === 1) and not some stray line jump
		{
			titles += iterator.nodeName.toUpperCase();
			// Add it to the title array in uppercase format
			titles += ", "; // Add a comma to the title to parse it into an array later
			iterator = iterator.nextSibling; // Go to the next sibling
		}
	}

	console.log("titles: " + titles);

	// Parse the titles' string using commas as separators
	let tokenTitles = titles.split(", ");
	tokenTitles.pop(); // Remove the last stray ','
	let titleElements = [];

	// Create the h2 titles and appends their textNodes to them
	for(let i = 0; i < tokenTitles.length; i++)
	{
		titleElements[i] = document.createElement("H2");
		titleElements[i].setAttribute("id", tokenTitles[i]);
		let textBlock = document.createTextNode(tokenTitles[i]);
		titleElements[i].appendChild(textBlock);
		console.log(titleElements[i].firstChild);
	}

	// Append the accordions below the tree display, for each DOM element in the titleElements
	for(const title of titleElements)
	{
		// Create the buttons and their attributes (with the onclick event to unfold the accordion)
		let button = document.createElement("BUTTON");
		button.setAttribute("id", title.id);
		button.setAttribute("onclick", "UnfoldText(this.id)");

		// Create the panels and their attributes
		let panel = document.createElement("PANEL");
		panel.setAttribute("id", title.id);

		// Append these after the table of readings (treeParent)
		button.append(title);
		treeParent.appendChild(button);
		treeParent.appendChild(panel);
	}

	// Iterator
	let j = 0;
	// Fill texts in accordion
	for(let i = 0; i < readingTexts.length; i++)
	{
		// Get all the panel by class date (first class etc.)
		let panels = document.getElementsByTagName('panel');
		panels[j++].append(readingTexts[i]);
	}

	// Hides the panels on launch and adds CSS class to them and their buttons
	styleButtonsAndPanels();
}

/**
	Hide or unhide the panels containing the readings onclick.

*/
function UnfoldText(clickedId){
	let mainDisplay = document.getElementsByClassName('mainDisplay')[0];
	let panels = mainDisplay.getElementsByTagName('panel');
	console.log("Unfolding accordion");

	for(panel of panels)
	{
		if(panel.id === clickedId)
		{
			if(panel.style.display === "none") // it's hidden already
			{
				panel.style.display = "flex";
			}
			else // it's unfolded already
			{
				panel.style.display = "none";
			}
		}
	}
}

/**
	Styles the buttons and panels, hide them panels at the beginning too.

*/
function styleButtonsAndPanels(){

	let buttons = document.getElementsByTagName('button');
	let panels = document.getElementsByTagName('panel');

	for(panel of panels)
	{
		panel.style = "display: none;" +
									"margin-top: 50px;" +
									"width: 75%;" +
									"font-size: 21px;" +
									"font-family: 'VT323', monospace;" +
									"color: white;" +
									"background-color: black;";
	}

	for(button of buttons)
	{
		button.style = "margin-top: 50px;" +
									 "width: 75%;" +
									 "border-radius: 4px;" +
									 "border: none;" +
									 "cursor: pointer;" +
									 "color: white;" +
									 "background-color: blue;";
	}

}

/**

	Display projects' page.

*/
function displayProjects(){
	clearCurrentContent();

	// Display some projects
	let mainDisplay = document.getElementsByClassName('mainDisplay')[0];
	let projectsDisplay = document.createElement('div');
	projectsDisplay.classList.add("projectsDisplay");

	let titles = "<h2>Projects in mind...</h2>";
	let pBody = "<p>TLDR; Become a legend</p>";
	let pList = "<ol>" +
				"<li> Grow as an immoral person" +
				"<li> Develop my brain" +
				"<li> Become moral (only as an artist)" +
				"<li> Computer science: Create web and mobile apps" +
				"<li> Make Christian indie, edgy video games" +
				"<li> Learn .NET art websites and Javascript WebGL frameworks" +
				"<li>Optionally get a job" +
				"</ol>";
	projectsDisplay.innerHTML = titles + pBody + pList;
	mainDisplay.append(projectsDisplay);
}


/**

	Display blog page.

*/
function displayBlog(){
	clearCurrentContent();

	let mainDisplay = document.getElementsByClassName('mainDisplay')[0];
	let blogDisplay = document.createElement('div');
	blogDisplay.classList.add("blogDisplay");

	blogDisplay.innerHTML = "I am not a blogger.";
	mainDisplay.append(blogDisplay);

}

/**

	Display art page.

*/
function displayArt(){
	clearCurrentContent();
	// Display some projects
	let mainDisplay = document.getElementsByClassName('mainDisplay')[0];
	let artDisplay = document.createElement('div');
	artDisplay.classList.add("artDisplay");

	let titles = "<h2>Art</h2>";
	let pBody = "<img src=\"./images/sheep.png\" style = \"width:300px; height: 300px;\"\"> + <img src=\"./images/singleSheep.png\" style = \"width:600px;height:600px;\">";
	artDisplay.innerHTML = titles + pBody;
	mainDisplay.append(artDisplay);

}

/**

	Display UxUi page.

*/
function displayUxUi(){
	clearCurrentContent();

	let mainDisplay = document.getElementsByClassName('mainDisplay')[0];
	let uxUiDisplay = document.createElement('div');
	uxUiDisplay.classList.add("uxUiDisplay");

	uxUiDisplay.innerHTML = "I am not a designer.";
	mainDisplay.append(uxUiDisplay);
}

/**
	Class exercise October 11, 2019. Animating a box using JS.

*/
let coordinateTop = 0;
let clock = setInterval(frame, 10);

function frame() {
	coordinateTop += 3; // each frame, increase the top's value by 2.
	console.log(coordinateTop);
	let theButton = document.querySelector('.firstBox');
	theButton.style.top = coordinateTop + 'px';

	if(coordinateTop >= 500) {
		clearInterval(clock);
	}
}