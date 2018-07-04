window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var levelWaveDelay = [6, 10, 5, 10, 10];

function GameEngine(mouse, ui, theMap, AM) {
    this.canvas = document.getElementById("gameWorld");
    this.gameUI = ui;
    this.tileEntities = [];
    this.unitEntities = [];
    this.defenderEntities = [];
    this.scvEntities = [];
    this.projectileEntities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.mouse = mouse;
    this.tileBox = null;
    this.wave = null;
    this.addNewLevel = true;
    this.level = null;
    this.levelNum = 1;
    this.isNewLevel = true;
    this.count = 0;
    this.waveDelay = levelWaveDelay[this.levelNum - 1]; //time between waves for first level
    this.pauseBool = false;
    this.map = theMap;
    this.AM = AM;
    this.isPlaying = true;
}

GameEngine.prototype.init = function(ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer(this.gameUI);
    console.log('game initialized');
}

GameEngine.prototype.start = function() {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.pause = function(boolean, gameover) {
    var that = this;
    that.gameOverBool = gameover;
    that.oldClockTick = that.clockTick;
    var canvasThree = document.getElementById("gameOverlayScreen");
    var ctxThree = canvasThree.getContext("2d");
    var pause_img = new Image();
    if (boolean === true) {
        that.pauseBool = true;
        that.clockTick = 0;
        //Draw paused image
        if (!gameover) {
            pause_img.onload = function() {
                ctxThree.drawImage(pause_img, 170, 50);
            }
            pause_img.src = './img/ui/paused.png';
        }
    } else {
        that.pauseBool = false;
        that.clockTick = that.oldClockTick;
        //clear pause image
        ctxThree.clearRect(0, 0, canvasThree.width, canvasThree.height);
    }
}

GameEngine.prototype.tutorialPause = function(boolean) {
    var that = this;
    if (boolean === true) {
        that.pauseBool = true;
        that.clockTick = 0;
    } else {
        that.pauseBool = false;
        that.clockTick = that.oldClockTick;
        //clear pause image
        ctxThree.clearRect(0, 0, canvasThree.width, canvasThree.height);
    }
}

GameEngine.prototype.addTile = function(tileEntity) {
    this.tileEntities.push(tileEntity);
}

GameEngine.prototype.addUnit = function(unitEntity) {
    this.unitEntities.push(unitEntity);
}

GameEngine.prototype.addDefender = function(defenderEntity) {
    this.defenderEntities.push(defenderEntity);
}

GameEngine.prototype.addSCV = function(scvEntity) {
    this.scvEntities.push(scvEntity);
}

GameEngine.prototype.addProjectile = function(projectileEntity) {
    this.projectileEntities.push(projectileEntity);
}

GameEngine.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();

    //If level is running, draw the waves.
    for (let i = 0; i < this.tileEntities.length; i++) {
        this.tileEntities[i].draw(this.ctx);
    }

    if (this.wave.canDraw) {
        this.wave.drawWave();
    }

    for (let i = 0; i < this.defenderEntities.length; i++) {
        this.defenderEntities[i].draw(this.ctx);
    }

    for (let i = 0; i < this.unitEntities.length; i++) {
        this.unitEntities[i].draw(this.ctx);
    }

    for (let i = 0; i < this.scvEntities.length; i++) {
        this.scvEntities[i].draw(this.ctx);
    }

    this.tileBox.draw();

    for (let i = 0; i < this.projectileEntities.length; i++) {
        this.projectileEntities[i].draw(this.ctx);
    }

    this.ctx.restore();
}

GameEngine.prototype.runLevel = function() {

    //If starting a level, need to make a level object.
    if (this.isNewLevel) {
        this.level = new Level(this.levelNum, this.wave);
        //some stuff with UI here
        switch (this.levelNum) {
            case 2:
                this.tileEntities = [];
                this.map = new Map(map_2);
                this.wave = new Wave(this.generator, this);
                this.level = new Level(this.levelNum, this.wave);
                this.mouse.newLevel(this.map);
                this.gameUI.newLevel();
                break;
            case 3:
                this.tileEntities = [];
                this.map = new Map(map_3);
                this.wave = new Wave(this.generator, this);
                this.level = new Level(this.levelNum, this.wave);
                this.mouse.newLevel(this.map);
                this.gameUI.newLevel();
                break;
            case 4:
                this.tileEntities = [];
                this.map = new Map(map_4);
                this.wave = new Wave(this.generator, this);
                this.level = new Level(this.levelNum, this.wave);
                this.mouse.newLevel(this.map);
                this.gameUI.newLevel();
                break;
            case 5:
                this.tileEntities = [];
                this.map = new Map(map_5);
                this.wave = new Wave(this.generator, this);
                this.level = new Level(this.levelNum, this.wave);
                this.mouse.newLevel(this.map);
                this.gameUI.newLevel();
                break;
            case 8:
                this.tileEntities = [];
                this.levelNum = 1;
                this.map = new Map(map_1);
                this.wave = new Wave(this.generator, this);
                this.level = new Level(this.levelNum, this.wave);
                this.mouse.newLevel(this.map);
                this.gameUI.newLevel();
                break;
            default:
                console.log("Either first map or error in level");
                break;
        }
        this.generator.setMap(this.map);
        this.map.createMap(this, this.AM);
        this.isNewLevel = false;
        console.log("Instantiating level " + this.levelNum);
    }

    //Level is finished so allow user to play more levels
    if (this.level.isDone) {
        if (this.unitEntities.length === 0 && this.gameUI.healthCur > 0) {
            if (this.levelNum === 5) {
                //**WIN SCREEN**//
                var canvasThree = document.getElementById("gameOverlayScreen");
                var ctxThree = canvasThree.getContext("2d");
                won_img = new Image();
                won_img.onload = function() {
                    ctxThree.drawImage(won_img, 100, -100);
                }
                won_img.src = './img/ui/gameWon.png';
                this.pause(true, true);

            } else {
                //**NEXT LEVEL SCREEN**//
                var canvasThree = document.getElementById("gameOverlayScreen");
                var ctxThree = canvasThree.getContext("2d");
                lvl_img = new Image();
                lvl_img.onload = function() {
                    ctxThree.drawImage(lvl_img, 100, -100);
                }
                lvl_img.src = './img/ui/levelComplete.png';

                //Next level
                this.levelNum++;
                this.gameUI.adjustLevel(1); //Updates game text info
                this.isNewLevel = true;
                this.waveDelay = levelWaveDelay[this.levelNum - 1];
                this.defenderEntities = [];
                this.scvEntities = [];

                function delayClear() {
                    setTimeout(function() {
                        var canvasThree = document.getElementById("gameOverlayScreen");
                        var ctxThree = canvasThree.getContext("2d");
                        ctxThree.clearRect(0, 0, canvasThree.width, canvasThree.height);
                    }, 3000);
                };

                delayClear();
            }

        }

    } else {
        //Sends waves for this level at specified interval.
        this.waveDelay -= this.clockTick;
        this.wave.update();
        this.gameUI.waveTimeGet(this.waveDelay);

        //Sends next wave for this level
        if (this.waveDelay <= 0) {
            this.level.createWave();
            this.gameUI.wavesAdjust(1);
            this.waveDelay = levelWaveDelay[this.levelNum - 1];
        }
    }

}

GameEngine.prototype.resetLevel = function (newLevel) {
    this.isNewLevel = true;
    this.waveDelay = levelWaveDelay[newLevel - 1];
    this.defenderEntities = [];
    this.scvEntities = [];
    this.unitEntities = [];
    this.projectileEntities = [];
}

GameEngine.prototype.findDefender = function(row, column) {
    for (let i = 0; i < this.defenderEntities.length; i++) {
        let defender = this.defenderEntities[i];
        if (defender.row === row && defender.column === column) {
            return defender;
        }
    }
}

GameEngine.prototype.update = function () {

    if (this.isPlaying) {
        this.runLevel();
    }

    for (let i = 0; i < this.unitEntities.length; i++) {
        let enemy = this.unitEntities[i];
        if (!enemy.removeFromWorld) {
            for (let j = 0; j < this.defenderEntities.length; j++) {
                let defender = this.defenderEntities[j];
                let distance = Math.sqrt(Math.pow(defender.trueX - enemy.trueX, 2) + Math.pow(defender.trueY - enemy.trueY, 2));
                if (!defender.removeFromWorld) {
                    if (distance <= defender.unit.range && enemy.currentHealth > 0) {

                        defender.shoot(enemy);

                    }
                } else {
                    this.defenderEntities.splice(i, 1);
                }
            }
            enemy.update()
        } else {
            this.unitEntities.splice(i, 1);
        }
    }

    for (let i = this.defenderEntities.length - 1; i >= 0; --i) {
        let entity = this.defenderEntities[i];
        if (!entity.removeFromWorld) {
            entity.update();
        } else {
            this.defenderEntities.splice(i, 1);
        }
    }

    for (let i = 0; i < this.scvEntities.length; i++) {
        this.scvEntities[i].update();
        if (!this.scvEntities[i].removeFromWorld) {
            this.scvEntities[i].update();
        } else {
            this.scvEntities.splice(i, 1);
        }
    }

    for (let i = this.projectileEntities.length - 1; i >= 0; --i) {
        let entity = this.projectileEntities[i];
        if (!entity.removeFromWorld) {
            entity.update();
        } else {
            this.projectileEntities.splice(i, 1);
        }
    }
    this.tileBox.update();
    resize();
}

GameEngine.prototype.getPauseBool = function() {
    var that = this;
    return that.pauseBool;
}

GameEngine.prototype.loop = function() {
    if (this.pauseBool) {
        this.clockTick = 0;
    } else {
        this.clockTick = this.timer.tick();
    }
    this.update();
    this.draw();
}

function resize() {
    this.canvas = document.getElementById("gameWorld");
    if (canvas.height != window.innerHeight) {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
    }
}

function Timer(gameUI) {
    this.gameUI = gameUI;
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function() {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;
    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    this.gameUI.updateTime(this.gameTime);
    return gameDelta;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function() {}

Entity.prototype.draw = function(ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function(image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

GameEngine.prototype.setGenerator = function(generator) {
    this.generator = generator;
}