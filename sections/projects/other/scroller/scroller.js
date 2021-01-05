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
	h1.style.cssText = "padding:10px 10px; font-size:6em; color:green; " +
	"margin:auto; text-align:center; text-decoration:underline";
	document.body.append(h1);
	var canv = document.createElement("canvas");
	canv.id = "board";
	canv.width = 400;
	canv.height = 400;
	canv.style.cssText = "margin:auto; display:block;";
	document.body.append(canv);
}
catch (TypeError) {}

// Title and Header of testpage.html
document.getElementById("title").innerHTML = "sidescroller"; // set this
document.getElementById("header").innerHTML = "2D Side Scroller"; // set this

// Begin Canvas Drawing
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");

var holdLeft = holdRight = false;
var onGround = true;
var grav = 0.6;
var px = py = vx = vy = 0;
var groundElements = [];

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
for (i=0;i<11;i++) {
	groundElements.push( 
	{
	x: i*100,
	y: canvas.height / 2 + 50 + Math.floor(Math.random() * (40 -10 + 1)) + 10,
	w: Math.floor(Math.random() * (40 - 20 + 1)) + 20,
	h: 10
	}
	)
}
setInterval(update, 1000/30);

function update() {
	// Handle Player movement.
	if (holdLeft) {vx = -3;}
	if (holdRight) {vx = 3;}
	px += vx;
	py += vy;
	if (onGround) {
		vx *= 0.8;
	}
	else if (vy < 10) {
		vy += grav;
	}
	onGround = false;
	if (py >= 0) {
		py = 0;
		onGround = true;
	}
	else {
		for (i=0;i<10;i++) {
			if (px > groundElements[i].x && px < groundElements[i].x+groundElements[i].w && canvas.height / 2 + 50 - py > groundElements[i].y && canvas.height / 2 + 50 - py < groundElements[i].y+groundElements[i].h) {
				vy = 0;
				onGround = true;
			}
		}
	}
	// Draw background
	context.fillStyle = "pink";
	context.fillRect(0, 0, canvas.width, canvas.height);
	// Draw Player
	context.fillStyle = "red";
	context.fillRect(canvas.width / 2 - 5, canvas.height / 2 + 75, 10, 25);
	// Draw Ground
	context.fillStyle = "black";
	context.fillRect(0, canvas.height / 2 + 100 - py, canvas.width, 10);
	// Draw Elements
	context.fillStyle = "green";
	for (i=0;i<11;i++) {
		context.fillRect(groundElements[i].x - px, groundElements[i].y - py, groundElements[i].w, groundElements[i].h);
	}
}

function keyDown(evt) {
	evt.preventDefault();
	switch (evt.keyCode) {
		case 37: // Left key
			holdLeft = true;
			break;
		case 38: // Up key
			if (onGround) {
				vy = -9;
			}
			break;
		case 39: // Right key
			holdRight = true;
			break;
	}
}

function keyUp(evt) {
	evt.preventDefault();
	switch (evt.keyCode) {
		case 37: // Left key
			holdLeft = false;
			break;
		case 38: // Up key
			break;
		case 39: // Right key
			holdRight = false;
			break;
	}
}