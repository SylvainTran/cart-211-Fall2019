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
				console.log("Successfully fetched the XML file.");				
				dataContainer = data;
			}
		}
	);
}

/**
 
	Displays accordion for the table of readings.
	
*/
function loadTableOfReadings(){
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
						"<li>Roy Rosenzweig, Writing the History of the Internet</li>" +
						"<li>Daniel Joseph, The Time Canada Wanted Its Own Internet Because" +
						"It Thought the US Would Mess It Up" + 
						"</li>" + 
						"<li><span class=\"caret\">Fred Turner, From Counterculture to Cyberculture</span>" +
						"<li>Rachel Greene, Web Work: A History of Internet Art</li>" +
						"<li>Carolina Miranda, The New World of Net Art</li>" + 
						"</ul>" +
				"</ul>";//end of nested ul
	fieldsetTree.innerHTML = tree;
	treeParent.appendChild(fieldsetTree);
}

function loadAccordion(){
	let treeParent = document.getElementsByClassName('treeDisplay')[0];
	//Insertion of xml-parsed lore database
	let mainDisplay = document.getElementById("MainDisplay");
	let xLen = dataContainer.firstChild.childNodes.length; // 11 in total, but we only need the elements that contain the readings
	let iterator = dataContainer.firstChild.firstChild; // Placed at the 3rd level, <readings>
	console.log(xLen + " elements found. Iterating...");

	let titles = ""; // Contains the date of the classes (cart 211)
	let readingTexts = []; // Contains the actual text

	for(let i = 0; i < xLen; i++)
	{
		if(iterator.nodeType === 1) // If it is an element tag
		{
			// Add it to the title array in uppercase format
			titles += iterator.nodeName.toUpperCase();
			// if there is a reading for that class
			if(iterator.nodeName === "firstReading" || "secondReading")
			{
				readingTexts[i] = iterator.textContent;
			}
		}
		console.log(readingTexts[i]);
		if(iterator.nodeName != "readings") titles += ", "; // if it's no longer a reading element, add a comma to the titles
		iterator = iterator.nextSibling;
	}

	console.log("titles: " + titles);

	// Parse the titles string
	let tokenTitles = titles.split(",");
	var titlesArray = [];

	// Create the h2 titles
	for(let i = 0; i < tokenTitles.length; i++)
	{
		titlesArray[i] = document.createElement("H2");
		//set an id attribute for event handling
		titlesArray[i].setAttribute("id", tokenTitles[i]);
		//titlesArray[i].setAttribute("onclick", "UnfoldChildren(this, readingTitles, xLen);");
		let textBlock = document.createTextNode(tokenTitles[i]);		
		titlesArray[i].appendChild(textBlock);
		console.log(titlesArray[i].firstChild);
	}	

	// Append the accordions below the tree display, for each DOM element in the titlesArray
	for(const title of titlesArray)
	{
		let accordionBt = document.createElement("BUTTON");
		accordionBt.setAttribute("class", "accordion");
		let panel = document.createElement("PANEL");
		panel.setAttribute("class", "panel");
		//console.log(titlesArray[i].;
		accordionBt.append(title);	
		treeParent.appendChild(accordionBt);
		treeParent.appendChild(panel);
	}	

	let j = 0;
	// Fill texts in accordion
	for(let i = 0; i < readingTexts.length; i++)
	{
		// Get all the panel by class date (first class etc.)
		let panels = document.getElementsByClassName('panel');
		panels[j++].append(readingTexts[i]);			
	}

	let acc = document.getElementsByClassName("accordion");
	let i;

	for(i = 0; i < acc.length; i++)
	{
		acc[i].addEventListener("click", function(){
			this.classList.toggle("active");
			let panelAcc = this.nextElementSibling;;
			if(panelAcc.style.maxHeight)
			{
				panelAcc.style.maxHeight = null;
			}
			else
			{
				panelAcc.style.maxHeight = panelAcc.scrollHeight + "50px";
			}
		});
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
