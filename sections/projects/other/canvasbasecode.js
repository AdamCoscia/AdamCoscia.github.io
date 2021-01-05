/*
Loader Script
If script is being accessed by loader.html, this will create the elements
on the page. Otherwise, this script is ignored.
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
document.getElementById("title").innerHTML = ""; // set this
document.getElementById("header").innerHTML = ""; // set this

// Begin Canvas Drawing
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");