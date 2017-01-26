/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	const canvasEl = document.getElementById("canvas");
	const ctx = canvasEl.getContext("2d");
	const player = new Object("docs/Player/p1_stand.png", 400, 100, 66, 92);
	const max_block = 10;
	const block = new Array();

	for (let i = 0; i <= 6; i++) {
	  block[i] = new Object("docs/Tiles/grass.png", 50 + i * 70, 450, 70, 70);
	}
	block[7] = new Object("docs/Tiles/grass.png", 70 + block[6].x, 380, 70, 70);
	block[8] = new Object("docs/Tiles/grass.png", 70 + block[7].x, 310, 70, 70);
	block[9] = new Object("docs/Tiles/grass.png", 70 + block[8].x, 240, 70, 70);
	block[10] = new Object("docs/Tiles/grass.png", 70 + block[9].x, 310, 70, 70);

	let left_pressed = false;
	let right_pressed = false;
	let space_pressed = false;

	player.gravity = 20;
	player.weight = 0.8;

	function keyDown(e) {
	  if (String.fromCharCode(e.keyCode) === "%") {
	    left_pressed = true;
	  }
	  if (String.fromCharCode(e.keyCode) === "'") {
	    right_pressed = true;
	  }
	  if (String.fromCharCode(e.keyCode) === " ") {
	    space_pressed = true;
	  }
	}

	function keyUp(e) {
	  if (String.fromCharCode(e.keyCode) === "%") {
	    left_pressed = false;
	  }
	  if (String.fromCharCode(e.keyCode) === "'") {
	    right_pressed = false;
	  }
	  if (String.fromCharCode(e.keyCode) === " ") {
	    space_pressed = false;
	  }
	}

	Animate();
	function Animate() {
	  for (var i = 0; i <= max_block; i++) {
	    block[i].x -= player.velocity_x;
	  }
	  player.y += player.velocity_y;

	  if (left_pressed) {
	    player.velocity_x = -5;
	  }

	  if (right_pressed) {
	    player.velocity_x = 5;
	  }

	  if (!left_pressed && !right_pressed && player.velocity_y === 0) {
	    player.velocity_x = 0;
	  }

	  if (space_pressed && player.velocity_y === 0) {
	    player.velocity_y = -15
	  }

	  if (player.velocity_y < player.gravity) {
	    player.velocity_y += player.weight;
	  }

	  for (let i = 0; i <= max_block; i++) {
	    if (player.isCollidedWith(block[i]) && player.y + player.height < block[i].y + player.velocity_y) {
	      player.y = block[i].y - player.height;
	      player.velocity_y = 0;
	    }
	  }

	  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
	  for (let i = 0; i <= max_block; i++) {
	    ctx.drawImage(block[i].Sprite, block[i].x, block[i].y);
	  }
	  ctx.drawImage(player.Sprite, player.x, player.y);
	  setTimeout(Animate, 1000/60);
	}

	function Object(img, x, y, width, height) {
	  this.Sprite = new Image();
	  this.Sprite.src = img;
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.previous_x;
	  this.previous_y;
	  this.velocity_x = 0;
	  this.velocity_y = 0;
	  this.gravity = 0;
	  this.weight = 0;

	  this.isCollidedWith = function (obj) {
	    if (this.x > obj.x + obj.width) {
	      return false;
	    } else if (this.x + this.width < obj.x) {
	      return false;
	    } else if (this. y > obj.y + obj.height) {
	      return false;
	    } else if (this.y + this.height < obj.y) {
	      return false;
	    } else {
	      return true;
	    }
	  };
	}


/***/ }
/******/ ]);