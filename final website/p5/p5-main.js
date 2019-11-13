"use strict";
let p5Canvas;
let discursiaBg;
/**
  Preloads assets.
*/
function preload() {
  discursiaBg = loadImage("img/discursiaBg.jpg");
}
/**
  Setups the scenes.
*/
function setup() {
  p5Canvas = createCanvas(440, 440);
  p5Canvas.parent('p5CanvasDisplay');
}
/**
  Handles the rendering, input, and movement of the system's objects.

*/
function draw() {
  // Test white background.
  p5Canvas.background(discursiaBg);
  push();
  textSize(24);
  fill(0, 255, 0);
  p5Canvas.text("Connecting to DISCURSIA ONLINE...", 15, height / 2);
  p5Canvas.text("\nPlease hold on...", 15, height / 2);
  p5Canvas.text("\n\nLoading dungeons, cities and all\nNPCs having breakfast...", 15, height / 2);
  pop();
}
