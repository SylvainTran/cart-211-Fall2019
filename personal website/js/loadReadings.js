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
	fieldsetTree.setAttribute("id", "fieldsetTreeView");
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
				"</ul>";//end of nested ul
	fieldsetTree.innerHTML = tree;
	treeParent.appendChild(fieldsetTree);
}

function loadAccordion(){
	let readingDisplay = document.getElementById('readingsDisplay');
	//Insertion of xml-parsed lore database
	var mainDisplay = document.getElementById("MainDisplay");
	var readingTitles = dataContainer.getElementsByTagName("readings");
	var xLen = readingTitles.childNodes.length;
	var y = readingTitles.firstChild;

	console.log(xLen + y);
	var titles = "";
	for(let i = 0; i < xlen; i++)
	{
		if(y.nodeType == 1)
		{
			titles += y.nodeName.toUpperCase();
			if(y.nodeName != "readings") titles += ",";
		}
		y = y.nextSibling;
	}

	//parse the titles string
	let tokenTitles = titles.split(",");
	var titlesArray = [];

	for(let i = 0; i < tokenTitles.length; i++)
	{
		titlesArray[i] = document.createElement("H5");
		//set an id attribute for event handling
		titlesArray[i].setAttribute("id", tokenTitles[i]);
		//titlesArray[i].setAttribute("onclick", "UnfoldChildren(this, readingTitles, xlen);");
		let textBlock = document.createTextNode(tokenTitles[i]);		
		titlesArray[i].appendChild(textBlock);
	}	

	for(title in titlesArray )
	{
		var accordionBt = document.createElement("BUTTON");
		accordionBt.setAttribute("class", "accordion");
		var panel = document.createElement("PANEL");
		panel.setAttribute("class", "panel");
		accordionBt.appendChild(titlesArray[title]);	
		readingDisplay.appendChild(accordionBt);
		readingDisplay.appendChild(panel);
	}	
	var acc = document.getElementsByClassName("accordion");
	var i;

	for(i = 0; i < acc.length; i++)
	{
		acc[i].addEventListener("click", function(){
			this.classList.toggle("active");
			var panelAcc = this.nextElementSibling;;
			if(panelAcc.style.maxHeight)
			{
				panelAcc.style.maxHeight = null;
			}
			else
			{
				panel.style.maxHeight = panel.scrollHeight + "px";
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
