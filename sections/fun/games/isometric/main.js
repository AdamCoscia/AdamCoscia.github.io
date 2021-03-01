/** GLOBALS */

class inputController {
  keyMap;
  clickMap;

  constructor() {
    this.keyMap = {};
    this.clickMap = {};
  }

  bind() {
    /**
     * Keyboard inputs.
     */
    this.keyMap = {
      w: {
        code: "KeyW",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      a: {
        code: "KeyA",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      s: {
        code: "KeyS",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      d: {
        code: "KeyD",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      p: {
        code: "KeyP",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      " ": {
        code: "Space",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      ArrowLeft: {
        code: "ArrowLeft",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      ArrowUp: {
        code: "ArrowUp",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      ArrowRight: {
        code: "ArrowRight",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
      ArrowDown: {
        code: "ArrowDown",
        up: () => console.log("keyup"),
        down: () => console.log("keydown"),
      },
    };
    /**
     * On-screen click inputs.
     */
    this.clickMap = {
      leftarrow: {
        ref: document.getElementById("leftarrow"),
        press: () => console.log("mousedown touchstart"),
        depress: () => console.log("mouseup touchend"),
      },
      uparrow: {
        ref: document.getElementById("uparrow"),
        press: () => console.log("mousedown touchstart"),
        depress: () => console.log("mouseup touchend"),
      },
      rightarrow: {
        ref: document.getElementById("rightarrow"),
        press: () => console.log("mousedown touchstart"),
        depress: () => console.log("mouseup touchend"),
      },
      downarrow: {
        ref: document.getElementById("downarrow"),
        press: () => console.log("mousedown touchstart"),
        depress: () => console.log("mouseup touchend"),
      },
    };
  }

  attach() {
    let context = this;
    document.addEventListener(
      "keydown",
      (e) => {
        e.preventDefault();
        if (context.keyMap[e.key] && !e.repeat) context.keyMap[e.key].down();
      },
      false
    );
    document.addEventListener(
      "keyup",
      (e) => {
        e.preventDefault();
        if (context.keyMap[e.key] && !e.repeat) context.keyMap[e.key].up();
      },
      false
    );
    for (const [id, el] of Object.entries(this.clickMap)) {
      el.ref.addEventListener("mousedown", el.press);
      el.ref.addEventListener("touchstart", el.press);
      el.ref.addEventListener("mouseup", el.depress);
      el.ref.addEventListener("touchend", el.depress);
    }
  }
}

// Document Elements
var canvas = document.getElementById("board");
var CTX = canvas.getContext("2d");

// Game Objects
var inputs = new inputController();
var gameTimer = false; // Holds interval that runs game.
var opt; // Game props
var usr; // User props
var pc; // Player props

// Window events
window.onload = function () {
  setCanvas(); // set canvas size and style
  setDefaults(); // initialize game objects
  startGame(); // start the game
};
window.onresize = function () {
  location.reload(); // refresh the entire page
};

/** FUNCTIONS */

function setCanvas() {
  // width x height
  canvas.width = Math.floor(Math.min(window.innerWidth - canvas.parentNode.clientWidth, window.innerHeight - 24));
  canvas.height = canvas.width * (9 / 16); // Widescreen aspect ratio
  // style the canvas
  canvas.style.border = "5px solid gray";
}

function clearCanvas() {
  CTX.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.border = "5px solid gray";
}

function setDefaults() {
  opt = {};
  usr = {};
  pc = {
    x: 0, // Player x coord
    y: 0, // Player y coord
    vx: 0, // Player x velocity in tiles per tick.
    vy: 0, // Player y velocity in tiles per tick.
  };
}

function startGame() {
  // set default values for game objects and outputs
  setDefaults();
  // clear the canvas for drawing
  clearCanvas();
  // attach controls
  inputs.bind();
  inputs.attach();
  // Set game timer.
  gameTimer = setInterval(gameLoop, 1000 / 30);
}

function pauseGame() {
  // TODO
}

function continueGame() {
  // TODO
}

function endGame() {
  // TODO
}

function gameLoop() {
  // TODO
}
