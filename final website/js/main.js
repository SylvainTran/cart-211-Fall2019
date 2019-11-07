/**
  Main entry point of the web app.

*/
// The main canvas for actors
let mainCanvas;
// Scene related variables
let tabConfig;
let tabData;
let tabObjects;
// Tab Handler
let tabHandler;

function preload() {
  tabConfig = loadJSON("data/tabs/sceneConfig.json");
  tabData = loadJSON("data/tabs/sceneData.json");
}

/**
  Sets up a canvas and creates objects for the Human and three prey.

*/
function setup() {
  mainCanvas = createCanvas(TILE_MAP_SIZE, TILE_MAP_SIZE);
  mainCanvas.parent('mainDisplay');
  tabHandler = new tabHandler(tabData);
  tabObjects = {
    "GameTab": new GameTab(),
    "FriendListTab": new FriendListTab(),
    "InventoryTab": new InventoryTab(),
    "CharacterStatsTab": new CharacterStatsTab(),
    "PhoneTab": new PhoneTab(),
    "ServerStatusTab": new ServerStatusTab()
  }
}
