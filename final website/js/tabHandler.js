/**
  Handles the scenes: checks current tab, and if the game state
  requests to change to the next tab.

*/
class TabHandler {
  constructor(tabObjects, tabData, tabConfig) {
    // Scene data: the objects and the config file
    this.tabObjects = tabObjects;
    this.tabData = tabData;
    this.tabConfig = tabConfig;
    // Start at the game tab. This property is used to know which is the current scene
    this.currentTabName = tabConfig.gameTab.tabName;
    // A string property that keeps the name of the previous game scene (non in-game menu type)
    this.previousTabName = "gameTab";
    // Starts at true for the main scene. Property that shields us from the discrepancy between mousePressed() events and process() calls
    this.tabWasChanged = true;
  }
  /**
    A series of simple hash tables. Boots the current SceneObject as defined by its name in the scene config
    Checks if the scene was changed too for an updates flag (to prevent non-scene changes to trigger a next scene).
    This function is only concerned with the current scene's properties and ignores other scenes.

  */
  process() {
    // Updates the sceneWasChanged flag gating (to prevent discrepancy between mousePressed() and process()
    if(this.tabWasChanged === true) {
      this.tabConfig[this.currentTabName].readyForNextTab = true;
    }
    else {
      this.tabConfig[this.currentTabName].readyForNextTab = false;
    }
  }
  /**
    Checks what's going on within the scenes.
    The sceneWasChanged property is only set to true if this event
    occurred in a change scene type of event.

  */
  handleTabKeyEvent(sceneKeyPressEvent) {
    // sceneKeyPressEvent is already garanteed to be non-null
    switch(sceneKeyPressEvent) {
      case "exitedSuccessfully":
        this.sceneWasChanged = true;
        this.goingToScene = "gameplayTutorial";
        break;
      case "successfullyComplained":
        this.sceneWasChanged = true;
        this.goingToScene = "zombieAttack";
        break;
      default:
        break;
    }
    if(this.sceneConfig[this.currentSceneName].readyForNextScene) {
      this.changeScene();
    }
  }

  /**
    This function deals with the previous and processing scenes in the queue
    to update their flag parameters (currentScene)
    Updates the processing and current scenes queues
    Updates the previous game scene name so to be able to update its properties

  */
  trackTabs() {
    // Should keep up to date the currentScene information
    //console.log("Current game scene name: " + this.sceneConfig[this.currentSceneName].sceneName);
    //console.log("Previous game scene name: " + this.previousGameScene);
    this.sceneConfig[this.previousGameScene].currentScene = false;
    this.sceneConfig[this.previousGameScene].readyForNextScene = false;
  }

  changeTab() {
    // Updates the previous game scene property by using the last scene in the queue
    this.previousGameScene = this.currentSceneQueue.dequeue();
    // Updates the current scene queue
    this.currentSceneQueue.enqueue(this.goingToScene);
    // Adds the new scene to the queue of scenes that are processing
    this.processingQueue = this.currentSceneQueue.front();
    // Go to the next scene by using its name
    this.sceneObjects[this.goingToScene].updateScene();
    // Update the currentSceneName property for the scene we are transitioning to
    this.currentSceneName = this.goingToScene;
    // Update the scene config file
    this.sceneConfig[this.currentSceneName].currentScene = true;
  }
}
