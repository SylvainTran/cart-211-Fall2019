let sceneData, sceneConfig;
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
