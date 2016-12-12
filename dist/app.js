/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Game = __webpack_require__(1);
	var Keyboard = __webpack_require__(8);
	var Pointer = __webpack_require__(9);
	function bootstrap() {
	    Game.init();
	    Game.render();
	    $(window).mousemove(Pointer.onMove);
	    $(window).keydown(function (e) {
	        Keyboard.onKeyPress(e.keyCode, true);
	    }).keyup(function (e) {
	        Keyboard.onKeyPress(e.keyCode, false);
	    });
	}
	var ns = window;
	ns.bootstrap = bootstrap;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var World = __webpack_require__(2);
	var GameInput = __webpack_require__(7);
	var Game = (function () {
	    function Game() {
	        var _this = this;
	        this.clock = new THREE.Clock(true);
	        this.render = function () {
	            requestAnimationFrame(_this.render);
	            _this.tick(_this.clock.getDelta());
	            World.renderer.clearDepth();
	            World.renderer.render(World.scene, World.camera);
	        };
	    }
	    Game.prototype.init = function () {
	        World.renderer.resize();
	        this.buildLevel();
	        document.body.appendChild(World.renderer.domElement);
	    };
	    Game.prototype.buildFloorPlane = function (x, z, color) {
	        var geometry = new THREE.PlaneGeometry(5, 5, 2, 2);
	        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
	        var plane = new THREE.Mesh(geometry, material);
	        plane.position.set(x, -1.25, z);
	        plane.rotation.set(90 * Math.PI / 180, 0, 0);
	        World.scene.add(plane);
	    };
	    Game.prototype.buildCeilPlane = function (x, z, color) {
	        var geometry = new THREE.PlaneGeometry(5, 5, 2, 2);
	        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
	        var plane = new THREE.Mesh(geometry, material);
	        plane.position.set(x, 1.25, z);
	        plane.rotation.set(90 * Math.PI / 180, 0, 0);
	        World.scene.add(plane);
	    };
	    Game.prototype.buildNorthWallPlane = function (x, y, color) {
	        var geometry = new THREE.PlaneGeometry(5, 5, 2);
	        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
	        var plane = new THREE.Mesh(geometry, material);
	        plane.position.set(x, 0, y);
	        World.scene.add(plane);
	    };
	    Game.prototype.buildEastWallPlane = function (x, z, color) {
	        var geometry = new THREE.PlaneGeometry(5, 5, 2);
	        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
	        var plane = new THREE.Mesh(geometry, material);
	        plane.position.set(x, 0, z);
	        plane.rotation.set(0, 90 * Math.PI / 180, 0);
	        World.scene.add(plane);
	    };
	    Game.prototype.buildLevel = function () {
	        this.buildFloorPlane(0, 0, "#333");
	        this.buildNorthWallPlane(2.5, -5, "#a00");
	        this.buildNorthWallPlane(-2.5, -5, "#f33");
	        this.buildEastWallPlane(5, 2.5, "#3f3");
	        this.buildEastWallPlane(5, -2.5, "#0a0");
	        this.buildNorthWallPlane(2.5, 5, "#00a");
	        this.buildNorthWallPlane(-2.5, 5, "#33f");
	        this.buildEastWallPlane(-5, 2.5, "#aa0");
	        this.buildEastWallPlane(-5, -2.5, "#ff3");
	        this.buildCeilPlane(0, 0, "#a0a");
	    };
	    Game.prototype.tick = function (ticks) {
	        var rotY = 0;
	        if (GameInput.state.isLeft) {
	            rotY = 80 * ticks;
	        }
	        if (GameInput.state.isRight) {
	            rotY = -80 * ticks;
	        }
	        World.camera.updateAngle(rotY);
	    };
	    return Game;
	}());
	module.exports = new Game();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Scene = __webpack_require__(3);
	var Camera = __webpack_require__(4);
	var Renderer = __webpack_require__(6);
	var World = (function () {
	    function World() {
	    }
	    World.scene = new Scene();
	    World.camera = new Camera();
	    World.renderer = new Renderer();
	    return World;
	}());
	module.exports = World;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var GameScene = (function (_super) {
	    __extends(GameScene, _super);
	    function GameScene() {
	        _super.call(this);
	    }
	    GameScene.prototype.ambientLight = function (color) {
	        this.add(new THREE.AmbientLight(color));
	    };
	    GameScene.prototype.addAll = function (objects) {
	        var _this = this;
	        objects.forEach(function (obj) { return _this.add(obj); });
	    };
	    return GameScene;
	}(THREE.Scene));
	module.exports = GameScene;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Viewport = __webpack_require__(5);
	var GameCamera = (function (_super) {
	    __extends(GameCamera, _super);
	    function GameCamera() {
	        _super.call(this, 80, Viewport.width() / Viewport.height(), .1, 1000);
	        this.angle = 0;
	        this.position.z = 0;
	        this.position.x = 0;
	        this.position.y = 0;
	        this.rotation.x = 0;
	        this.updateAngle(0);
	    }
	    GameCamera.prototype.updateAngle = function (diff) {
	        this.angle += diff;
	        if (this.angle > 360) {
	            this.angle = 0;
	        }
	        if (this.angle < 0) {
	            this.angle = 360;
	        }
	        this.rotation.y = this.angle * Math.PI / 180;
	    };
	    return GameCamera;
	}(THREE.PerspectiveCamera));
	module.exports = GameCamera;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var Viewport = (function () {
	    function Viewport() {
	    }
	    Viewport.prototype.width = function () {
	        return window.innerWidth;
	    };
	    Viewport.prototype.height = function () {
	        return window.innerHeight;
	    };
	    return Viewport;
	}());
	module.exports = new Viewport();


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Viewport = __webpack_require__(5);
	var GameRenderer = (function (_super) {
	    __extends(GameRenderer, _super);
	    function GameRenderer() {
	        _super.call(this);
	        this.autoClear = false;
	    }
	    GameRenderer.prototype.resize = function () {
	        this.setSize(Viewport.width(), Viewport.height());
	    };
	    return GameRenderer;
	}(THREE.WebGLRenderer));
	module.exports = GameRenderer;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var GameInput = (function () {
	    function GameInput() {
	    }
	    GameInput.isWalking = function () {
	        return this.state.isDown || this.state.isUp || this.state.isLeft || this.state.isRight;
	    };
	    GameInput.onDown = function (isPressed) {
	        this.state.isDown = isPressed;
	    };
	    GameInput.onUp = function (isPressed) {
	        this.state.isUp = isPressed;
	    };
	    GameInput.onLeft = function (isPressed) {
	        this.state.isLeft = isPressed;
	    };
	    GameInput.onRight = function (isPressed) {
	        this.state.isRight = isPressed;
	    };
	    GameInput.onAction = function (isPressed) {
	    };
	    GameInput.state = {
	        isDown: false,
	        isLeft: false,
	        isRight: false,
	        isUp: false
	    };
	    return GameInput;
	}());
	module.exports = GameInput;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GameInput = __webpack_require__(7);
	var Keyboard = (function () {
	    function Keyboard() {
	    }
	    Keyboard.onKeyPress = function (keyCode, isDown) {
	        switch (keyCode) {
	            case Keyboard.KEY_UP: {
	                GameInput.onUp(isDown);
	                break;
	            }
	            case Keyboard.KEY_DOWN: {
	                GameInput.onDown(isDown);
	                break;
	            }
	            case Keyboard.KEY_RIGHT: {
	                GameInput.onRight(isDown);
	                break;
	            }
	            case Keyboard.KEY_LEFT: {
	                GameInput.onLeft(isDown);
	                break;
	            }
	            case Keyboard.KEY_ENTER: {
	                GameInput.onAction(isDown);
	                break;
	            }
	        }
	    };
	    Keyboard.KEY_ENTER = 13;
	    Keyboard.KEY_LEFT = 37;
	    Keyboard.KEY_UP = 38;
	    Keyboard.KEY_RIGHT = 39;
	    Keyboard.KEY_DOWN = 40;
	    return Keyboard;
	}());
	module.exports = Keyboard;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var Pointer = (function () {
	    function Pointer() {
	    }
	    Pointer.onMove = function (event) {
	    };
	    return Pointer;
	}());
	module.exports = Pointer;


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map