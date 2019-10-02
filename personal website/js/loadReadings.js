// the readings' data from the XML file
let dataContainer;

console.log("Creating... a connection...");

function createConnection(){
	console.log("Attempting to fetch the XML file...");

	let xhr = new XMLHttpRequest();
	let xml = xhr.responseXML;
	//Opens the xml file asynchronously

	$.ajax(
		{
			url: '../readings.xml',
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

	Clears the page's current display.

*/
function clearCurrentContent(){
	let currentContent = document.getElementsByClassName('treeDisplay')[0];
	$('.treeDisplay, .projectsDisplay, .artDisplay').each
	(
		function(i, obj)
		{
			this.remove();
		}
	)
}

/**

	Displays accordion for the table of readings.

*/
function loadTableOfReadings(){
	clearCurrentContent();
	console.log("Loading table of readings");
	//Tree view
	let treeParent = document.createElement('div');
	let mainDisplay = document.getElementsByClassName('mainDisplay')[0];
	mainDisplay.append(treeParent);

	treeParent.classList.add("treeDisplay");
	let fieldsetTree = document.createElement("FIELDSET");
	fieldsetTree.setAttribute("id", "fieldsetTreeView"); // TODO change to class if intends to re-use
	let tree = "<ul id=\"readingsTreeView\">" +
				    "<li><span class=\"caret\">First Class</span>" +
						"<ul class=\"nested\">" + //beginning of nested ul
							"<a href=\"#FIRSTCLASS\"><li>Roy Rosenzweig, Writing the History of the Internet</li></a>" +
						"</ul></a>" +
					"<li><span class=\"caret\">Second Class</span>" +
						"<ul class=\"nested\">" +
							"<a href=\"#SECONDCLASS\"><li>Daniel Joseph, The Time Canada Wanted Its Own Internet Because" +
							"It Thought the US Would Mess It Up" +
							"</li></a>" +
							"<a href=\"#THIRDCLASS\"><li>Fred Turner, From Counterculture to Cyberculture</span></li></a>" +
						"</ul>" +
					"<li><span class=\"caret\">Third Class</span>" +
						"<ul class=\"nested\">" +
							"<a href=\"#FOURTHCLASS\"><li>Rachel Greene, Web Work: A History of Internet Art</li></a>" +
							"<a href=\"#FIFTHCLASS\"><li>Carolina Miranda, The New World of Net Art</li></a>" +
					"</ul>" +
				"</ul>";//end of nested ul
	fieldsetTree.innerHTML = tree;
	treeParent.appendChild(fieldsetTree);
}

function loadAccordion(){
	let treeParent = document.getElementsByClassName('treeDisplay')[0];
	console.log("Loading the XML into the website...");
	let mainDisplay = document.getElementById("MainDisplay");
	let titles = ""; // Contains the date of the classes (cart 211)
	let readingTexts = []; // Contains the actual text

	// Would put in a loop to iterate over the DOM elements... but... this seemed easier to read for this exercise
	readingTexts[0] = dataContainer.firstChild.firstChild.firstChild.firstChild.nodeValue;
	console.log("First reading" + readingTexts[0]);

	readingTexts[1] = dataContainer.firstChild.firstChild.nextElementSibling.firstChild.firstChild.nodeValue;
	console.log("Second reading: " + readingTexts[1]);

	readingTexts[2] = dataContainer.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling.firstChild.nodeValue;
	console.log("Third reading: " + readingTexts[2]);

	readingTexts[3] = dataContainer.firstChild.firstChild.nextElementSibling.nextElementSibling.firstChild.firstChild.nodeValue;
	console.log("Fourth reading: " + readingTexts[3]);

	readingTexts[4] = dataContainer.firstChild.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.nodeValue;
	console.log("Fifth reading: " + readingTexts[4]);

	// Start at the firstClass node
	let iterator = dataContainer.firstChild.firstChild;
	let xmlDocLength = dataContainer.firstChild.childNodes.length;

	for(let i = 0; i < xmlDocLength; i++)
	{
		if(iterator.nodeType === 1) // If it	 is an element tag and not some stray line jump
		{
			titles += iterator.nodeName.toUpperCase();
			// Add it to the title array in uppercase format
			titles += ", "; // Add a comma to the title to parse it into an array later
			iterator = iterator.nextSibling; // Go to the next sibling
		}
	}

	console.log("titles: " + titles);

	// Parse the titles string
	let tokenTitles = titles.split(",");
	tokenTitles.pop(); // Remove the last stray ','
	let titleElements = [];

	// Create the h2 titles
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
		let button = document.createElement("BUTTON");
		button.setAttribute("id", title.id);
		button.setAttribute("onclick", "UnfoldText(this.id)");

		let panel = document.createElement("PANEL");
		panel.setAttribute("id", title.id);
		button.append(title);
		treeParent.appendChild(button);
		treeParent.appendChild(panel);
	}

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

function UnfoldText(clickedId){
	let mainDisplay = document.getElementsByClassName('mainDisplay')[0];
	let panels = mainDisplay.getElementsByTagName('panel');
	console.log("Unfolding this accordion");

	// Get the id of which H2 title was clicked.
	// By this id, hide the panel corresponding to this id

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

	Fill the readingsDisplay div after the user clicks on the readings in the menu.

*/
function displayReadings(){
	console.log("Loading the XML into the website...");

    let notebook = dataContainer;
	let readings = notebook.getElementsByTagName("readings");
	let secondaryDisplay = document.getElementsByClassName('secondaryDisplay')[0];
	let readingsDisplay = document.createElement('div');

	readingsDisplay.classList.add('readingsDisplay');
	secondaryDisplay.append(readingsDisplay);
	console.log("Number of readings found: " + readings[0].childNodes.length);

	// Create a new div element for each reading.
	for(let i = 0; i < readings.length; i++){
		// If there are reading notes for a given week
		if(readings[i].hasChildNodes()){
			// loop through each each class's one or two readings
			let children = readings[i].childNodes;
			console.log("reading #" + i);

			for(let j = 0; j < children.length; j++){
				if(children[j].nodeName === "firstReading" || children[j].nodeName === "secondReading")
				{
					console.log("...reading # " + j + "...of reading # " + i);
					readingsDisplay.append(children[j]);
				}
			}
		}
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
				"<li> Computer science: web and mobile apps" +
				"<li> Indie, edgy video games" +
				"<li> .NET art websites and Javascript WebGL frameworks" +
				"<li>Optionally, to get a job" +
				"</ol>";
	projectsDisplay.innerHTML = titles + pBody + pList;
	mainDisplay.append(projectsDisplay);
}


/**

	Display blog page.

*/
function displayBlog(){
	clearCurrentContent();

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

}

// Parse, beginning from the first reading, each of them into their divs

/* 	for(let i = 0; i < readings.length; i++)
	{
		let imgProd = document.createElement("img");
		let imgSrc = readings[i].childNodes[5].childNodes[0].textContent; //<img><src> x </src></img>
		let imgAlt = readings[i].childNodes[4].textContent;
        let imgId = readings[i].childNodes[5].childNodes[1].textContent;

		imgProd.setAttribute("src", imgSrc);
		imgProd.setAttribute("height", "350px");
		imgProd.setAttribute("width", "275px");
		imgProd.setAttribute("alt", imgAlt);
        imgProd.setAttribute("id", imgId);

		arrayProd.rows[0].cells[i].appendChild(imgProd); //image
		arrayProd.rows[1].cells[i].innerHTML = x[i].childNodes[0].textContent;
		arrayProd.rows[2].cells[i].innerHTML = x[i].childNodes[1].textContent;
		arrayProd.rows[3].cells[i].innerHTML = x[i].childNodes[2].textContent;
		arrayProd.rows[4].cells[i].innerHTML = x[i].childNodes[3].textContent;
	} */
