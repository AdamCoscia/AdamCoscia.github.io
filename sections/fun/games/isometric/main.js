/** GLOBALS */

// Document Elements
var canvas = document.getElementById("board");
var CTX = canvas.getContext("2d");

// Game Objects
var gameTimer = false; // Holds interval that runs game.
var opt; // Game props
var usr; // User props
var pc; // Player props

// Window events
window.onload = function () {
  setCanvas(); // set canvas size and style
  setDefaults(); // initialize game objects
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
        up: null,
        down: null,
      },
      a: {
        code: "KeyA",
        up: null,
        down: null,
      },
      s: {
        code: "KeyS",
        up: null,
        down: null,
      },
      d: {
        code: "KeyD",
        up: null,
        down: null,
      },
      p: {
        code: "KeyP",
        up: null,
        down: null,
      },
      " ": {
        code: "Space",
        up: null,
        down: null,
      },
      ArrowLeft: {
        code: "ArrowLeft",
        up: null,
        down: null,
      },
      ArrowUp: {
        code: "ArrowUp",
        up: null,
        down: null,
      },
      ArrowRight: {
        code: "ArrowRight",
        up: null,
        down: null,
      },
      ArrowDown: {
        code: "ArrowDown",
        up: null,
        down: null,
      },
    };
    /**
     * On-screen click inputs.
     */
    this.clickMap = {
      leftArrow: {
        press: null,
        depress: null,
        elem: document.getElementById("leftarrow"),
      },
      upArrow: {
        press: null,
        depress: null,
        elem: document.getElementById("uparrow"),
      },
      rightArrow: {
        press: null,
        depress: null,
        elem: document.getElementById("rightarrow"),
      },
      downArrow: {
        press: null,
        depress: null,
        elem: document.getElementById("downarrow"),
      },
    };
  }

  attach() {
    document.addEventListener("keydown", (e) => {
      console.log(e.type + " " + e.key);
      if (this.keyMap[e.key]) console.log(this.keyMap[e.key].code);
    });
    document.addEventListener("keyup", (e) => {
      console.log(e.type + " " + e.key);
      if (this.keyMap[e.key]) console.log(this.keyMap[e.key].code);
    });
    // for (inp in this.clickMap) {
    //   this.clickMap[inp].elem.on("mousedown touchstart", this.clickMap[inp].press);
    //   this.clickMap[inp].elem.on("mouseup touchend", this.clickMap[inp].depress);
    // }
  }
}

function gameLoop() {
  // TODO
}
