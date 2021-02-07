class abstractGameState {
  constructor() {
    const methods = [
      // Setup and destroy the state
      [this.Init, "Init"],
      [this.Cleanup, "Cleanup"],
      // Used when temporarily transitioning to another state
      [this.Pause, "Pause"],
      [this.Resume, "Resume"],
      // The three important actions within a game loop
      [this.HandleEvents, "HandleEvents"],
      [this.Update, "Update"],
      [this.Draw, "Draw"],
    ];
    const mask = methods.map((method) => method[0] === undefined);
    const filtered = methods.filter((_, i) => mask[i]);
    if (filtered.length)
      throw new TypeError(
        `Missing methods: ${filtered.map((method) => method[1])}`
      );
  }
}

class abstractGameEngine {
  states; // the stack of states
  running; // bool whether game is running or not

  constructor() {
    const methods = [
      // Creating and destroying the state machine
      [this.Init, "Init"],
      [this.Cleanup, "Cleanup"],
      // Transit between states
      [this.ChangeState, "ChangeState(state)"],
      [this.PushState, "PushState(state)"],
      [this.PopState, "PopState"],
      // The three important actions within a game loop
      // (these will be handled by the top state in the stack)
      [this.HandleEvents, "HandleEvents"],
      [this.Update, "Update"],
      [this.Draw, "Draw"],
    ];
    const mask = methods.map((method) => method[0] === undefined);
    const filtered = methods.filter((_, i) => mask[i]);
    if (filtered.length)
      throw new TypeError(
        `Missing methods: ${filtered.map((method) => method[1])}`
      );
  }

  /**
   * engine status
   */
  Running() {
    return running;
  }

  Quit() {
    running = false;
  }
}

// GET canvas, set properties
var canvas = document.getElementById("board");
canvas.width = Math.floor(
  Math.min(
    window.innerWidth - canvas.parentNode.clientWidth,
    window.innerHeight - 26
  )
);
canvas.height = canvas.width;
canvas.style.background = "black";
canvas.style.border = "5px solid gray";

// CONSTANTS
var GAMETIMER; // Holds interval that runs game.

// Game properties
var conf = {
  gameSpeed: 200, // ms between draw events => lower to make harder
  tileCount: 20, // The number of tiles in a row or column.
  tileWidth: canvas.width / 20, // Tile width on the canvas in pixels.
  tileHeight: canvas.height / 20, // Tile height on the canvas in pixels.
};

// Player properties
var player = {
  vx: 1, // Player x velocity in tiles per tick.
  vy: 0, // Player y velocity in tiles per tick.
  head: {
    x: Math.floor(conf.tileCount / 2), // Player position relative to number of tiles in a row or column.
    y: Math.floor(conf.tileCount / 2), // Player position relative to number of tiles in a row or column.
  },
  tail: {
    nodes: [], // Stores the previous head positions to draw the tail.
    maxLength: 4, // tail length NOT including the head of the snake at (player.head.x, player.head.y).
  },
};

// Apple properties
var apple = {
  x: 0, // Apple x position relative to number of tiles in a row or column.
  y: 0, // Apple y position relative to number of tiles in a row or column.
};

var CTX = canvas.getContext("2d");

function init() {
  // Draw the head of the snake.
  CTX.beginPath();
  CTX.fillStyle = "lime";
  CTX.fillRect(
    player.head.x * conf.tileWidth,
    player.head.y * conf.tileHeight,
    conf.tileWidth,
    conf.tileHeight
  );
  // Draw First Apple.
  drawApple();
  // Give the game direction control.
  document.addEventListener("keydown", keyPush);
  // Set game timer.
  GAMETIMER = setInterval(game, conf.gameSpeed);
}

function keyPush(event) {
  switch (event.keyCode) {
    case 37: // The left key.
      if (player.vx != 1) {
        player.vx = -1;
        player.vy = 0;
      }
      break;
    case 38: // The top key.
      if (player.vy != 1) {
        player.vx = 0;
        player.vy = -1;
      }
      break;
    case 39: // The right key.
      if (player.vx != -1) {
        player.vx = 1;
        player.vy = 0;
      }
      break;
    case 40: // The bottom key.
      if (player.vy != -1) {
        player.vx = 0;
        player.vy = 1;
      }
      break;
  }
}

function game() {
  // Add previous head position to the beginning of tail nodes.
  player.tail.nodes.unshift({ x: player.head.x, y: player.head.y });

  // Move snake head forward.
  player.head.x += player.vx;
  player.head.y += player.vy;

  // If snake head goes out of the game screen, clear the game timer and alert the player.
  if (
    player.head.x == -1 ||
    player.head.x == conf.tileCount ||
    player.head.y == -1 ||
    player.head.y == conf.tileCount
  ) {
    clearInterval(GAMETIMER);
    alert("Game Over!");
    return;
  }

  // If snake head touches its tail, clear the game timer and alert the player.
  for (i = 0; i < player.tail.nodes.length; i++) {
    if (
      player.head.x == player.tail.nodes[i].x &&
      player.head.y == player.tail.nodes[i].y
    ) {
      clearInterval(GAMETIMER);
      alert("Game Over!");
      return;
    }
  }

  // If snake touches the apple, move the apple to a random location, draw it,
  // and make the maxLength longer.
  if (player.head.x == apple.x && player.head.y == apple.y) {
    drawApple();
    player.tail.maxLength++;
  }

  // Draw the new head of the snake.
  CTX.beginPath();
  CTX.fillStyle = "lime";
  CTX.fillRect(
    player.head.x * conf.tileWidth,
    player.head.y * conf.tileHeight,
    conf.tileWidth,
    conf.tileHeight
  );

  // If the number of positions in the tail is longer than the tail length, remove the last position.
  if (player.tail.nodes.length > player.tail.maxLength) {
    clearTailEnd();
  }
}

function drawApple() {
  // Check if the apple is not being drawn on top of the snake.
  var redraw = true;
  while (redraw) {
    apple.x = Math.floor(Math.random() * (conf.tileCount - 1) + 1);
    apple.y = Math.floor(Math.random() * (conf.tileCount - 1) + 1);
    redraw = false;
    if (apple.x == player.head.x && apple.y == player.head.y) {
      // apple is drawn on top of player head
      redraw = true;
    } else {
      for (i = 0; i < player.tail.nodes.length; i++) {
        if (
          apple.x == player.tail.nodes[i].x &&
          apple.y == player.tail.nodes[i].y
        ) {
          // apple is drawn on one of the tail nodes
          redraw = true;
          break;
        }
      }
    }
  }
  // Draw Apple
  CTX.beginPath();
  CTX.fillStyle = "red";
  CTX.fillRect(
    apple.x * conf.tileWidth,
    apple.y * conf.tileHeight,
    conf.tileWidth,
    conf.tileHeight
  );
}

function clearTailEnd() {
  var end = player.tail.nodes.pop(); // Remove last tail segment from the tail positions.
  CTX.beginPath();
  CTX.fillStyle = "black";
  CTX.fillRect(
    end.x * conf.tileWidth,
    end.y * conf.tileHeight,
    conf.tileWidth,
    conf.tileHeight
  ); // Color it black
}
