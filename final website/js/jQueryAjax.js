let sceneData, sceneConfig;
let consoleLogDefaultText = "Microsoft Windows [Version 10.0.17763.805] <br>" +
        "(c) 2018 Microsoft Corporation. All rights reserved. <br> <br>" +
        "C:\\Users\\jdesplan>";
let inventoryStatus;
/*
	Asynchronously, using Jquery Ajax, fetches the sceneData and sceneConfig.json.

*/
function getSceneData(){
	console.log("Attempting to fetch the scene data file...");
	$.ajax(
		{
			url: 'data/sceneData.json',
			type: 'GET',
			dataType: 'json',
			timeout: 1000,
			error: function(hro, textStatus, error){
        console.log(textStatus);
        console.log(error);
			},
			success: function(data){
				console.log("Successfully fetched the json scene data file.");
				sceneData = data;
			}
		}
	);
}
function getSceneConfig(){
	console.log("Attempting to fetch the scene config file...");
	$.ajax(
		{
			url: 'data/sceneConfig.json',
			type: 'GET',
			dataType: 'json',
			timeout: 1000,
			error: function(hro, textStatus, error){
        console.log(textStatus);
        console.log(error);
			},
			success: function(data){
				console.log("Successfully fetched the json config file.");
        console.log(data.gameTab.completedStory);
				sceneConfig = data;
			}
		}
	);
}
/*
	Gets the inventory from sceneData.json (for now, but will be using local storage later).
	Outputs it in the console log area below the Twine canvas. The variable is at the top of the scope for access in other tabs.

*/
function getInventory(){
	console.log("Attempting to fetch the inventory from the data stored earlier...");
	inventoryStatus = consoleLogDefaultText + " " + sceneData.inventory.items + sceneData.inventory.equipment + sceneData.inventory.spells;
	document.querySelector('.footer__console-status').innerHTML = inventoryStatus;
}
/*
	Gets the character stats from sceneData.json (for now, but will be using local storage later).
	Outputs it in the console log area below the Twine canvas.

*/
function getCharacterStats(){
	console.log("Attempting to fetch the character stats from the data stored earlier...");
	document.querySelector('.footer__console-status').innerHTML = consoleLogDefaultText + " " + "Acuity: " + sceneData.characterStats.acuity + " Courage: " + sceneData.characterStats.courage + " Resistance: " + sceneData.characterStats.resistance + " Wisdom: " + sceneData.characterStats.wisdom + " Strength: " + sceneData.characterStats.strength;
}
/*
	Gets the friends list from sceneData.json (for now, but will be using local storage later).
	Outputs it in the console log area below the Twine canvas.

*/
function getFriendsList(){
	console.log("Attempting to fetch the friends list from the data stored earlier...");
	document.querySelector('.footer__console-status').innerHTML = consoleLogDefaultText + " " + "Friends List: " + sceneData.friendsListTab[0].firstName + ", " + sceneData.friendsListTab[1].firstName;
}
