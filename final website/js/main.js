/**
  Main entry point of the web app.

*/
// Scene related variables
let tabData;
let tabObjects;
let tabConfig;
// Tab Handler
let tabHandler;

document.addEventListener("click", function() {
  let leftCanvasText = document.querySelector('.main__Section__game--left-display-text');
  leftCanvasText.innerHTML = "Welcome, Joachim";
});
/**
  Sets up a canvas and creates objects for the Human and three prey.

*/
function tabSetup() {
  tabObjects = {
    "GameTab": new GameTab(),
    "FriendListTab": new FriendListTab(),
    "InventoryTab": new InventoryTab(),
    "CharacterStatsTab": new CharacterStatsTab(),
    "PhoneTab": new PhoneTab(),
    "ServerStatusTab": new ServerStatusTab()
  }
  tabHandler = new tabHandler(tabData, tabObjects, tabConfig);
}
