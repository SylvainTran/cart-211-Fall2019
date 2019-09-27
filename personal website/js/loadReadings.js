function createConnection(){
	let xhr = new XMLHttpRequest();
	let xml = xhr.responseXML;
}

function LoadXML(xml, readingsDisplay)
{
    //Opens the xml file

	try{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
                xhr.open("GET", "./readings/readings.xml", true);
                xhr.send();		
			}
		}
	}
	catch(e)
	{
		alert("Error with html http request...");
    }
    
    let notebook = xml.responseXML;
    let readings = notebook.getElementsByTagName("reading");
    
    /**
     
        Fill the readingsDisplay div.
     
    */
	for(let i = 0; i < readings.length; i++)
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
	}
}