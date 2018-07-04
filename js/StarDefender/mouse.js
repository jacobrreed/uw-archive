var defenderList = ["marine", "battlecruiser", "ghost", "antiair", "firebat"];

var costs = {
    marine: 50,
    battlecruiser: 150,
    ghost: 150,
    antiair: 100,
    firebat: 100
};

function Mouse(map, ctx) {
    this.musicOn = true;
    this.resources = {
        marine: -50,
        ghost: -150,
        battlecruiser: -200,
        scv: -50,
        antiair: -100,
        firebat: -100
    };
    this.canvas = document.getElementById("gameWorld");
    this.ctx = ctx;
    //access to other canvas
    this.map = map;
    this.generator = null;
    this.gameEngine = null;
    this.defenderName = null;
    this.attachListeners();
    this.isBusy = false;
    this.isMoving = false;
    this.canAddLevel = true;
    this.pickedUpDefender = {
        defender: null,
        row: 0,
        column: 0
    };
    this.defenderKey = null;
    this.unitCost = null;
    //Layer 2 canvas for drawing mouse move
    this.canvas2 = document.getElementById("gameWorld2");
    this.ctx2 = this.canvas2.getContext("2d");
    this.drawOffset = true;
}

Mouse.prototype.init = function(gameEngine) {
    this.gameEngine = gameEngine;
    this.tileBox = new TileBox(this.gameEngine, this.canvas, this.ctx, this.map, this.isBusy, this.ui);
    this.gameEngine.tileBox = this.tileBox;
}

Mouse.prototype.setGenerator = function(mainGenerator) {
    this.generator = mainGenerator;
}

Mouse.prototype.setMap = function(gameMap) {
    this.map = gameMap;
}

Mouse.prototype.newLevel = function(map) {
    this.resources.scv = -50;
    this.ui.drawSCVImage(this.resources.scv);
    this.map = map;
    this.tileBox = new TileBox(this.gameEngine, this.canvas, this.ctx, this.map, this.isBusy, this.ui);
    this.gameEngine.tileBox = this.tileBox;
}

//Function that is called via button in ui.js
Mouse.prototype.selectDefender = function(defenderName) {
    if (defenderName === "scv") {
        if (this.ui.resourcesTotal >= (this.resources.scv * -1)) {
            this.generator.createSCV();
            this.ui.resourceAdjust(this.resources.scv);
            this.PlaySound("./soundfx/scv.wav");
            if (this.resources.scv > -300) {
                this.resources.scv -= 50;
                this.ui.drawSCVImage(this.resources.scv);
            }
        } else {
            this.PlaySound("./soundfx/minerals.wav");
        }
    } else {
        this.isBusy = true; //makes mouse unable to select other defenders, one time drop
        this.tileBox.isBusy = this.isBusy;
        this.defenderName = defenderName;
        if (this.ui.resourcesTotal < this.unitCost) {
            this.PlaySound("./soundfx/minerals.wav");
        }
    }
};

Mouse.prototype.dropTower = function(e) {
    var that = this;
    //Drop tower if something was selected from buttons isBusy = true

    //Drop only if enough resources
    switch (this.defenderName) {
        case "marine":
            this.unitCost = 50;
            defenderKey = 'a';
            break;
        case "firebat":
            this.unitCost = 100;
            defenderKey = 'r';
            break;
        case "ghost":
            this.unitCost = 150;
            defenderKey = 's';
            break;
        case "battlecruiser":
            this.unitCost = 200;
            defenderKey = 'd';
            break;
        case "antiair":
            this.unitCost = 100;
            defenderKey = 'w';
            break;
        default:
            break;
    }

    if (this.isBusy && this.ui.resourcesTotal >= this.unitCost) {

        //drop tower on location
        let mouseLoc = getMousePos(this.canvas, event);
        let tileLoc = getTile(mouseLoc, this.map);
        if (isValid(this.map, tileLoc.row, tileLoc.column)) {
            this.generator.createDefender(this.defenderName, tileLoc.row, tileLoc.column);
            this.map.map[tileLoc.row][tileLoc.column] = defenderKey;
            this.isBusy = false; //set isBusy to false so that they can press a button and place another tower
            this.tileBox.isBusy = this.isBusy;
            //Update Resources in UI
            switch (this.defenderName) {
                case "marine":
                    that.ui.resourceAdjust(that.resources.marine);
                    that.PlaySound("./soundfx/marine.wav");
                    break;
                case "ghost":
                    that.ui.resourceAdjust(that.resources.ghost);
                    that.PlaySound("./soundfx/ghost.wav");
                    break;
                case "battlecruiser":
                    that.ui.resourceAdjust(that.resources.battlecruiser);
                    that.PlaySound("./soundfx/battlecruiser.wav");
                    break;
                case "antiair":
                    that.ui.resourceAdjust(that.resources.antiair);
                    that.PlaySound("./soundfx/antiair.wav");
                    break;
                case "firebat":
                    that.ui.resourceAdjust(that.resources.firebat);
                    that.PlaySound("./soundfx/firebat.wav");
                    break;
                default:
                    break;
            }

            this.isMoving = false;
        }
    }
};

/*
Gets Mouse position*/
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

Mouse.prototype.attachListeners = function() {
    var that = this;
    // Mouse events

    //On mouse click, check if button was selected (isBusy = true), if so drop tower on click location
    that.canvas.addEventListener("click", (e) => {

        if (that.isBusy && !that.isMoving && !(that.gameEngine.getPauseBool())) {
            that.dropTower(e);
            that.ctx2.clearRect(0, 0, that.canvas2.width, that.canvas2.height);
        } else if (that.isBusy && that.isMoving && !(that.gameEngine.getPauseBool())) { //Put down a picked up defender.
            let tileLoc = getTile(getMousePos(that.canvas, event), that.map);
            if (isValid(this.map, tileLoc.row, tileLoc.column)) {
                that.isMoving = false;
                that.tileBox.isMoving = false;
                that.isBusy = false;
                that.tileBox.isBusy = false;
                that.map.map[tileLoc.row][tileLoc.column] = that.pickedUpDefender.defender.unit.mapKey;
                if (that.pickedUpDefender.defender.unit.name !== 'battlecruiser') {
                    that.pickedUpDefender.defender.isDummy = false;

                    //create dropship
                    that.generator.createDropship(that.pickedUpDefender.column, that.pickedUpDefender.row, tileLoc.column,
                        tileLoc.row, that.pickedUpDefender.defender);


                } else if (this.pickedUpDefender.defender.unit.name === 'battlecruiser' &&
                    !(that.gameEngine.getPauseBool())) {
                    that.map.map[that.pickedUpDefender.row][that.pickedUpDefender.column] = '+';
                    that.pickedUpDefender.defender.lineToRow = tileLoc.row;
                    that.pickedUpDefender.defender.lineToColumn = tileLoc.column;
                    that.pickedUpDefender.defender.isDummy = true;
                }
            }
        } else if (!that.isBusy && !that.isMoving && !(that.gameEngine.getPauseBool())) { //Pick up a defender.
            //move unit
            let mouseLoc = getMousePos(this.canvas, event);
            let tileLoc = getTile(mouseLoc, this.map);
            if (isDefender(that.map.map[tileLoc.row][tileLoc.column])) {
                that.pickedUpDefender.defender = that.gameEngine.findDefender(tileLoc.row, tileLoc.column);
                if (!that.pickedUpDefender.defender.isDummy) {
                    that.isMoving = true;
                    that.tileBox.isMoving = true;
                    that.isBusy = true;
                    that.tileBox.isBusy = true;
                    that.pickedUpDefender.row = tileLoc.row;
                    that.pickedUpDefender.column = tileLoc.column;
                    if (that.map.map[tileLoc.row][tileLoc.column] !== 'd') { //Pick up everything but battlecruiser
                        //var startY = tileLoc.row * that.map.tileSize;
                        //var startX = tileLoc.column * that.map.tileSize;
                        //that.pickedUpDefender.defender.isDummy = true;
                        //that.map.map[tileLoc.row][tileLoc.column] = '+';
                    } else { //If battlecruiser, draw a line to where it should move to
                        that.pickedUpDefender.defender.isLineVisible = true;
                    }
                }
            }
        }
    }, false);

    //Mouseover square select
    that.canvas.addEventListener("mousemove", function(e) {
        that.tileBox.e = e;
        if (that.isMoving) {
            let tileLoc = getTile(getMousePos(that.canvas, event), that.map);
            if (that.pickedUpDefender.defender.unit.name !== 'battlecruiser') { //Move everything but battlecruiser
                //that.pickedUpDefender.defender.calculateXY(tileLoc.row, tileLoc.column);
            } else { //row and column to draw a line to
                that.pickedUpDefender.defender.lineToRow = tileLoc.row;
                that.pickedUpDefender.defender.lineToColumn = tileLoc.column;
            }
        }
    }, false);

    //Keypress binds
    this.canvas.addEventListener("keydown", function(e) {
        if (e.keyCode === 70) {
            if (!(that.gameEngine.getPauseBool())) {
                that.selectDefender("scv");
            }
        } else if (e.keyCode === 65) {
            that.unitCost = 50;
            that.tileBox.unitCost = 50;
            if (!(that.gameEngine.getPauseBool())) {
                that.selectDefender("marine");
            }
        } else if (e.keyCode === 83) {
            that.unitCost = 100;
            that.tileBox.unitCost = 100;
            if (!(that.gameEngine.getPauseBool())) {
                that.selectDefender("ghost");
            }
        } else if (e.keyCode === 68) {
            that.unitCost = 150;
            that.tileBox.unitCost = 150;
            if (!(that.gameEngine.getPauseBool())) {
                that.selectDefender("battlecruiser");
            }
        } else if (e.keyCode === 81) {
            that.unitCost = 100;
            that.tileBox.unitCost = 100;
            if (!(that.gameEngine.getPauseBool())) {
                that.selectDefender("firebat");
            }
        } else if (e.keyCode === 87) {
            that.unitCost = 100;
            that.tileBox.unitCost = 100;
            if (!(that.gameEngine.getPauseBool())) {
                that.selectDefender("antiair");
            }
        } else if (e.keyCode === 77) {
            if (that.musicOn) {
                that.ui.pauseMusic(true);
                that.musicOn = false;
            } else {
                that.ui.pauseMusic(false);
                that.musicOn = true;
            }
        } else if (e.keyCode === 84 && that.ui.tutorialBool) {
            that.ui.cancelTutorial();
            console.log("Skipping tutorial");
        } else if (e.keyCode === 80) {
            if (that.gameEngine.getPauseBool() && !that.gameEngine.gameOverBool) {
                that.gameEngine.pause(false, false);
            } else {
                if (!that.gameEngine.gameOverBool) {
                    that.gameEngine.pause(true, false);
                }
            }
        } else if (e.keyCode === 82) {
            //Restart level
            that.gameEngine.resetLevel(that.gameEngine.levelNum);
            if (!that.gameEngine.isPlaying) {
                that.gameEngine.isPlaying = true;
                var gameOverlay = document.getElementById("gameOverlayScreen").getContext("2d");
                gameOverlay.clearRect(0, 0, 770, 770);
                that.gameEngine.pauseBool = false;
            }
            if (that.gameEngine.levelNum === 1) {
                that.gameEngine.levelNum = 8;
            }

        }
    }, false);

    //Mouse Wheel
    this.canvas.addEventListener("mousewheel", function(e) {
        e.preventDefault();

    }, false);


    this.canvas.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        if (that.isMoving) {
            that.pickedUpDefender.defender.calculateXY(that.pickedUpDefender.row, that.pickedUpDefender.column);
            that.map.map[that.pickedUpDefender.row][that.pickedUpDefender.column] = that.pickedUpDefender.defender.unit.mapKey;
            that.pickedUpDefender.defender.isDummy = false;
            that.pickedUpDefender.defender.isLineVisible = false;
        }
        that.isBusy = false;
        that.tileBox.isBusy = false;
        that.isMoving = false;
        that.tileBox.unitCost = 0;
    }, false);

    // Optional events

}

function isValid(map, row, column) {
    return map.map[row][column] === '+';
}

//Plays fx sounds
Mouse.prototype.PlaySound = function(path) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.volume = 0.2;
    audioElement.play();
}

function TileBox(gameEngine, canvas, ctx, map, isBusy, gameUI) {
    this.gameEngine = gameEngine;
    this.canvas = canvas;
    this.ctx = ctx;
    this.map = map;
    this.isBusy = isBusy;
    this.gameUI = gameUI;
    this.isMoving = false;
}

TileBox.prototype.update = function() {
    if (this.e != null) {
        this.mouseLoc = getMousePos(this.canvas, this.e);
        this.tileLoc = getTile(this.mouseLoc, this.map);
        this.x = this.tileLoc.column * this.map.tileSize;
        this.y = this.tileLoc.row * this.map.tileSize;
    }
}

TileBox.prototype.draw = function() {
    if (this.mouseLoc != null && this.mouseLoc.x > 0 &&
        this.mouseLoc.x < this.map.tileSize * this.map.mapDim.row &&
        this.mouseLoc.y < this.map.tileSize * this.map.mapDim.col &&
        this.isBusy) {
        if (isValid(this.map, this.tileLoc.row, this.tileLoc.column) && (this.isMoving || this.unitCost <= this.gameUI.resourcesTotal)) {
            this.ctx.strokeStyle = 'rgb(0, 255, 38)'; //Green box
        } else {
            this.ctx.strokeStyle = 'rgb(255, 0, 12)'; //Red box
        }
        this.ctx.strokeRect(this.x, this.y, this.map.tileSize, this.map.tileSize);
    }
}

function isDefender(mapKey) {
    return mapKey === 'a' || mapKey === 's' || mapKey === 'd';
}


//Incomplete function. Will be expanded later.
function copyDefender(defender) {

}

function getTile(mouseLoc, map) {
    return {
        column: Math.floor(mouseLoc.x / map.tileSize),
        row: Math.floor(mouseLoc.y / map.tileSize)
    }
}
/* Attach UI for calling updates*/
Mouse.prototype.attachUI = function(ui) {
    this.ui = ui;
}