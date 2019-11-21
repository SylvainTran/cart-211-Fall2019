/**
  Handles the scenes: checks current tab, and if the game state
  requests to change to the next tab.

*/
class TabHandler {
  constructor(tabData, tabObjects, tabConfig) {
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
    // Updates the  flag gating (to prevent discrepancy between mousePressed() and process()
    if(this.tabWasChanged === true) {
      this.tabConfig[this.currentTabName].readyForNextTab = true;
    }
    else {
      this.tabConfig[this.currentTabName].readyForNextTab = false;
    }
  }
  /**
    Checks what's going on within the tabs.
    The  property is only set to true if this event
    occurred in a change scene type of event.

  */
  handleTabKeyEvent(sceneKeyPressEvent) {
  }

  /**
    This function deals with the previous and processing scenes in the queue
    to update their flag parameters (currentTab)
    Updates the processing and current scenes queues
    Updates the previous game scene name so to be able to update its properties

  */
  trackTabs() {
    // Should keep up to date the currentTab information
    //console.log("Current game scene name: " + this.sceneConfig[this.currentTabName].sceneName);
    //console.log("Previous game scene name: " + this.previousGameTab);
    this.sceneConfig[this.previousGameTab].currentTab = false;
    this.sceneConfig[this.previousGameTab].readyForNextTab = false;
  }

  changeTab() {
    // Updates the previous game scene property by using the last scene in the queue
    this.previousGameTab = this.currentTabQueue.dequeue();
    // Updates the current scene queue
    this.currentTabQueue.enqueue(this.goingToTab);
    // Adds the new scene to the queue of scenes that are processing
    this.processingQueue = this.currentTabQueue.front();
    // Go to the next scene by using its name
    this.sceneObjects[this.goingToTab].updateTab();
    // Update the currentTabName property for the scene we are transitioning to
    this.currentTabName = this.goingToTab;
    // Update the scene config file
    this.sceneConfig[this.currentTabName].currentTab = true;
  }
}
