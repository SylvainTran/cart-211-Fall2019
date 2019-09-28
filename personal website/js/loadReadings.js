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
 
	Fill the readingsDisplay div after the user clicks on the readings in the menu.
	
*/
function displayReadings(){
	console.log("Loading the XML into the website...");				

    let notebook = dataContainer;
	let readings = notebook.getElementsByTagName("readings");
	let readingDisplay = document.getElementById('readingsDisplay');
	console.log("Number of readings found: " + readings[0].childNodes.length);

	// Create a new div element for each reading.
	for(let i = 0; i < readings.length; i++){
		if(readings[i].hasChildNodes()){
			// loop through each each class's one or two readings
			let children = readings[i].childNodes;
			console.log("reading #" + i);

			for(let j = 0; j < children.length; j++){
				if(children[j].nodeName === "firstReading" || children[j].nodeName === "secondReading")
				{
					console.log("...reading # " + j + "...of reading # " + i);
					readingDisplay.append(children[j]);
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
}