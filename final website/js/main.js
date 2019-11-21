/**
  Main entry point of the web app.

*/
// Scene related variables
let tabConfig;
let tabData;
let tabObjects;
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

function removeHrefsTwine() {
  alert("removing hrefs");
  const twLinks1 = document.querySelectorAll('tw-link');
  alert(twLinks1.length);
  for(let i = 0; i < twLinks1.length; i++) {
    twLinks1.removeAttribute('href');
    alert("removed attr");
  }
}
