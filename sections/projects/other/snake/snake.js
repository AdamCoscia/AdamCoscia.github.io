/*
Loader Script
If script is being accessed by loader.html, this will create the elements
on the page. Otherwise, this part of the script is ignored.
*/
try {
  // Check if the loader is calling this script, and change its title to the script's saved title.
  document.getElementById("loadingScreen").id = "title";
  var h1 = document.createElement("h1");
  h1.id = "header";
  h1.style.cssText =
    "padding:10px 10px; font-size:6em; color:green; " +
    "margin:auto; text-align:center; text-decoration:underline";
  document.body.append(h1);
  var canv = document.createElement("canvas");
  canv.id = "board";
  canv.width = 400;
  canv.height = 400;
  canv.style.cssText = "margin:auto; display:block;";
  document.body.append(canv);
} catch (TypeError) {}

// Begin Canvas Drawing
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
canvas.style.background = "black";
canvas.style.border = "5px solid gray";

var gametimer; // Holds interval that runs game.
var tc = 20; // The number of tiles in a row or column.
var tw = canvas.width / tc; // Tile width on the canvas in pixels.
var th = canvas.height / tc; // Tile height on the canvas in pixels.
var px = (py = Math.floor(tc / 2)); // Player position relative to number of tiles in a row or column.
var ax = 0; // Apple position relative to number of tiles in a row or column.
var ay = 0; // Apple position relative to number of tiles in a row or column.
var vx = 1; // Player x velocity in tiles per tick.
var vy = 0; // Player y velocity in tiles per tick.
var trail = []; // Stores the previous head positions to draw the tail.
var tail = 4; //Tail length NOT including the head of the snake at (px,py).

window.onload = function () {
  //Draw the head of the snake.
  ctx.beginPath();
  ctx.fillStyle = "lime";
  ctx.fillRect(px * tw, py * th, tw, th);
  // Draw First Apple.
  drawApple();
  // Give the game direction control.
  document.addEventListener("keydown", keyPush);
  // Set game timer.
  gametimer = setInterval(game, 200);
};

function keyPush(event) {
  switch (event.keyCode) {
    case 37: // The left key.
      if (vx != 1) {
        vx = -1;
        vy = 0;
      }
      break;
    case 38: // The top key.
      if (vy != 1) {
        vx = 0;
        vy = -1;
      }
      break;
    case 39: // The right key.
      if (vx != -1) {
        vx = 1;
        vy = 0;
      }
      break;
    case 40: // The bottom key.
      if (vy != -1) {
        vx = 0;
        vy = 1;
      }
      break;
  }
}

function game() {
  //Add previous head position to the beginning of trail positions.
  trail.unshift([px, py]);

  //Move snake head forward.
  px += vx;
  py += vy;

  //If snake head goes out of the game screen, clear the game timer and alert the player.
  if (px == -1 || px == tc || py == -1 || py == tc) {
    clearInterval(gametimer);
    alert("Game Over!");
    return;
  }

  //If snake head touches its tail, clear the game timer and alert the player.
  for (i = 0; i < trail.length; i++) {
    if (px == trail[i][0] && py == trail[i][1]) {
      clearInterval(gametimer);
      alert("Game Over!");
      return;
    }
  }

  //If snake touches the apple, move the apple to a random location, draw it, and make the tail longer.
  if (px == ax && py == ay) {
    drawApple();
    tail++;
  }

  //Draw the new head of the snake.
  ctx.beginPath();
  ctx.fillStyle = "lime";
  ctx.fillRect(px * tw, py * th, tw, th);

  //If the number of positions in the tail is longer than the tail length, remove the last position.
  if (trail.length > tail) {
    clearTailEnd();
  }
}

function drawApple() {
  // Check if the apple is not being drawn on top of the snake.
  var redraw = true;
  while (redraw) {
    ax = Math.floor(Math.random() * (tc - 1) + 1);
    ay = Math.floor(Math.random() * (tc - 1) + 1);
    redraw = false;
    for (i = 0; i < trail.length; i++) {
      if ((ax == trail[i][0] && ay == trail[i][1]) || (ax == px && ay == py)) {
        redraw = true;
        break;
      }
    }
  }
  //Draw Apple
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(ax * tw, ay * th, tw, th);
}

function clearTailEnd() {
  var end = trail.pop(); // Remove last tail segment from the tail positions.
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(end[0] * tw, end[1] * th, tw, th); // Color it black
}
