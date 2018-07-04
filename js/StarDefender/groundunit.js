//Create new object with settings as specified below. Add new switch case after adding a new variable.
var mutalisk = {
    name: "mutalisk",
    frameWidth: 64, frameHeight: 72, sheetWidth: 5, frameDuration: 0.1, frames: 5,
    loop: true,
    scale: 0.5,
    speed: 45,
    health: 110,
    armor: 6,
    isAir: true,
    damage: 7,
    deathAnimation: {
        name: "mutalisk",
        frameWidth: 68, frameHeight: 68, sheetWidth: 9, frameDuration: 0.1, frames: 9,
        loop: false,
        scale: 0.5
    }
};
var lurker = {
    name: "lurker",
    frameWidth: 69, frameHeight: 64, sheetWidth: 7, frameDuration: 0.1, frames: 7,
    loop: true,
    scale: 0.5,
    speed: 50,
    health: 90,
    armor: 2,
    isAir: false,
    damage: 5,
    deathAnimation: {
        name: "lurker",
        frameWidth: 82, frameHeight: 61, sheetWidth: 10, frameDuration: 0.1, frames: 10,
        loop: false,
        scale: 0.5
    }
};
var scourge = {
    name: "scourge",
    frameWidth: 31, frameHeight: 27, sheetWidth: 5, frameDuration: 0.1, frames: 5,
    loop: true,
    scale: 1,
    speed: 65,
    health: 40,
    armor: 0,
    isAir: true,
    damage: 3,
    deathAnimation: {
        name: "mutalisk",
        frameWidth: 68, frameHeight: 68, sheetWidth: 9, frameDuration: 0.1, frames: 9,
        loop: false,
        scale: 0.5
    }
};
var queen = {
    name: "queen",
    frameWidth: 75, frameHeight: 68, sheetWidth: 5, frameDuration: 0.1, frames: 5,
    loop: true,
    scale: 0.6,
    speed: 50,
    health: 225,
    armor: 5,
    isAir: false,
    damage: 8,
    deathAnimation: {
        name: "queen",
        frameWidth: 114, frameHeight: 103, sheetWidth: 9, frameDuration: 0.15, frames: 9,
        loop: false,
        scale: 0.5
    }
};
var infestedterran = {
    name: "infestedterran",
    frameWidth: 64, frameHeight: 64, sheetWidth: 8, frameDuration: 0.1, frames: 8,
    loop: true,
    scale: 0.6,
    speed: 60,
    health: 40,
    armor: 1,
    isAir: false,
    damage: 15,
    deathAnimation: {
        name: "infestedterran",
        frameWidth: 64, frameHeight: 64, sheetWidth: 8, frameDuration: 0.15, frames: 8,
        loop: false,
        scale: 0.5
    }
};
var drone = {
    name: "drone",
    frameWidth: 44, frameHeight: 32, sheetWidth: 6, frameDuration: 0.1, frames: 6,
    loop: true,
    scale: 0.7,
    speed: 50,
    health: 35,
    armor: 0,
    isAir: false,
    damage: 5,
    deathAnimation: {
        name: "drone",
        frameWidth: 75.5, frameHeight: 39, sheetWidth: 8, frameDuration: 0.15, frames: 8,
        loop: false,
        scale: 0.5
    }
};
var zergling = {
    name: "zergling",
    frameWidth: 40, frameHeight: 39, sheetWidth: 7, frameDuration: 0.1, frames: 7,
    loop: true,
    scale: 0.6,
    speed: 60,
    health: 80,
    armor: 0,
    isAir: false,
    damage: 5,
    deathAnimation: {
        name: "zergling",
        frameWidth: 65, frameHeight: 53, sheetWidth: 7, frameDuration: 0.15, frames: 7,
        loop: false,
        scale: 0.5
    }
};
var broodling = {
    name: "broodling",
    frameWidth: 48, frameHeight: 48, sheetWidth: 7, frameDuration: 0.1, frames: 7,
    loop: true,
    scale: 0.6,
    speed: 60,
    health: 80,
    armor: 0,
    isAir: false,
    damage: 5,
    deathAnimation: {
        name: "broodling",
        frameWidth: 65, frameHeight: 53, sheetWidth: 7, frameDuration: 0.15, frames: 7,
        loop: false,
        scale: 0.5
    }
};
var guardian = {
    name: "guardian",
    frameWidth: 78, frameHeight: 71, sheetWidth: 7, frameDuration: 0.1, frames: 7,
    loop: true,
    scale: 0.6,
    speed: 40,
    health: 250,
    armor: 10,
    isAir: true,
    damage: 8,
    deathAnimation: {
        name: "guardian",
        frameWidth: 114, frameHeight: 110, sheetWidth: 9, frameDuration: 0.15, frames: 9,
        loop: false,
        scale: 0.5
    }
};
var hydralisk = {
    name: "hydralisk",
    frameWidth: 42, frameHeight: 55, sheetWidth: 5, frameDuration: 0.1, frames: 5,
    loop: true,
    scale: 0.7,
    speed: 60,
    health: 250,
    armor: 8,
    isAir: false,
    damage: 7,
    deathAnimation: {
        name: "hydralisk",
        frameWidth: 97, frameHeight: 71, sheetWidth: 12, frameDuration: 0.1, frames: 12,
        loop: false,
        scale: 0.4
    }
};
var defiler = {
    name: "defiler",
    frameWidth: 69, frameHeight: 59, sheetWidth: 5, frameDuration: 0.1, frames: 5,
    loop: true,
    scale: 0.7,
    speed: 60,
    health: 180,
    armor: 5,
    isAir: false,
    damage: 5,
    deathAnimation: {
        name: "defiler",
        frameWidth: 67, frameHeight: 44, sheetWidth: 10, frameDuration: 0.1,
        frames: 10,
        loop: false,
        scale: 0.5
    }
};

function GroundUnit(game, unitName, entrance, map, assetManager, theSpeedBuff, theHealthBuff, ui) {
    this.AM = assetManager;
    this.gameUI = ui;

    //Switch case for units.
    switch (unitName) {
        case "mutalisk":
            this.unit = mutalisk;
            this.deathSound = './soundfx/deathMutalisk.wav';
            break;
        case "scourge":
            this.unit = scourge;
            this.deathSound = './soundfx/deathMutalisk.wav';
            break;
        case "queen":
            this.unit = queen;
            this.deathSound = './soundfx/deathQueen.wav';
            break;
        case "guardian":
            this.unit = guardian;
            this.deathSound = './soundfx/deathGuardian.wav';
            break;
        case "zergling":
            this.unit = zergling;
            this.deathSound = './soundfx/deathZergling.wav';
            break;
        case "broodling":
            this.unit = broodling;
            this.deathSound = './soundfx/deathBroodling.wav';
            break;
        case "lurker":
            this.unit = lurker;
            this.deathSound = './soundfx/deathLurker.wav';
            break;
        case "infestedterran":
            this.unit = infestedterran;
            this.deathSound = './soundfx/deathInfestedTerran.wav';
            break;
        case "hydralisk":
            this.unit = hydralisk;
            this.deathSound = './soundfx/deathHydralisk.wav';
            break;
        case "defiler":
            this.unit = defiler;
            this.deathSound = './soundfx/deathDefiler.wav';
            break;
        case "drone":
            this.unit = drone;
            this.deathSound = './soundfx/deathDrone.wav';
            break;
        default:
            console.log("Problem creating ground unit");
            break;
    }
    this.entrance = entrance;
    this.map = map;
    // AIR UNIT
    this.isAir = this.unit.isAir;
    if (this.isAir) {
        if (this.entrance.column * this.map.tileSize < this.map.baseX - this.map.tileSize) {
            this.direction = "se";
        } else if (this.entrance.column * this.map.tileSize > this.map.baseX + this.map.tileSize) {
            this.direction = "sw";
        } else {
            this.direction = "south";
        }
    } else {
        this.direction = findDirection(map, entrance.row, entrance.column);
    }


    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.ctx = game.ctx;
    this.isDead = false;
    this.deadAnimationTime = this.unit.deathAnimation.frameDuration * this.unit.deathAnimation.frames;
    this.x = entrance.column * this.map.tileSize;
    this.y = entrance.row * this.map.tileSize;
    this.getTrueCordinates();

    //perform statbuffs depending on wave
    //this.speedBuff = theSpeedBuff;
    this.speed = this.unit.speed * theSpeedBuff;
    if (this.isAir) {
        this.speed *= Math.abs((2 * (this.x - this.map.baseX)) / 770);
    }
    this.maxHealth = this.unit.health * theHealthBuff;
    this.currentHealth = this.maxHealth;
    this.armor = this.unit.armor;
    this.animation.lastHealth = this.currentHealth;
    Entity.call(this, game, this.x, this.y);
}

GroundUnit.prototype = new Entity();
GroundUnit.prototype.constructor = GroundUnit;

//Function to play death sounds on death
GroundUnit.prototype.playSound = function(path) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.volume = 0.2;
    audioElement.play();
}

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
GroundUnit.prototype.update = function() {
    var that = this;
    if (this.x >= this.map.baseX && this.y >= this.map.baseY) {
        this.hitBase();
    } else if (this.currentHealth <= 0 && !this.isDead) {
        this.isDead = true;
        this.setDeathAnimation();

        //Update UI text for enemies killed
        that.gameUI.enemiesKilledAdjust(1);

        //Update resources for each kill
        //Gives n resources per kill
        that.gameUI.resourceAdjust(3);

        //Play death sounds
        this.playSound(this.deathSound);

    } else if (this.isDead) {
        if (this.deadAnimationTimme > 0) {
            this.deadAnimationTimme -= this.game.clockTick;
        } else {
            this.removeFromWorld = true;
        }
    } else if (this.isAir) {
        this.flyingMovement();
    } else {
        this.column = Math.floor(this.x / this.map.tileSize);
        this.row = Math.floor(this.y / this.map.tileSize);
        let c = this.map.map[this.row][this.column];
        let tempY = this.y - this.game.clockTick * this.speed;
        let tempRow = Math.floor(tempY / this.map.tileSize);

        let tempX = this.x - this.game.clockTick * this.speed;
        let tempColumn = Math.floor(tempX / this.map.tileSize);
        switch (c) {
            case '>':
                if (this.map.map[this.row + 1][this.column] === '^' && isLegalMove(this.map.map[tempRow][this.column])) {
                    this.y -= this.game.clockTick * this.speed;
                } else {
                    this.x += this.game.clockTick * this.speed;
                    this.col = Math.floor(this.x / this.map.tileSize);
                    this.row = Math.floor(this.y / this.map.tileSize);
                    c = this.map.map[this.row][this.column];
                    if (c !== '>') {
                        this.x = this.column * this.map.tileSize;
                    }
                    this.changeDirection('east');
                }
                break;
            case '<':
                if (this.map.map[this.row + 1][this.column] === '^' && isLegalMove(this.map.map[tempRow][this.column])) {
                    this.y -= this.game.clockTick * this.speed;
                } else {
                    this.x -= this.game.clockTick * this.speed;
                    this.column = Math.floor(this.x / this.map.tileSize);
                    this.row = Math.floor(this.y / this.map.tileSize);
                    c = this.map.map[this.row][this.column];
                    if (!isLegalMove(c)) {
                        this.x = this.column * this.map.tileSize;
                    }
                    this.changeDirection('west');
                }

                break;
            case '^':
                if (this.map.map[this.row][this.column + 1] === '<' && isLegalMove(this.map.map[this.row][tempColumn])) {
                    this.x -= this.game.clockTick * this.speed;
                } else {
                    this.y -= this.game.clockTick * this.speed;
                    this.column = Math.floor(this.x / this.map.tileSize);
                    this.row = Math.floor(this.y / this.map.tileSize);
                    c = this.map.map[this.row][this.column];
                    if (!isLegalMove(c)) {
                        this.y = this.row * this.map.tileSize;
                    }
                    this.changeDirection('north');
                }
                break;
            case 'v':
                if (this.map.map[this.row][this.column + 1] === '<' && isLegalMove(this.map.map[this.row][tempColumn])) {
                    this.x -= this.game.clockTick * this.speed;
                } else {
                    this.y += this.game.clockTick * this.speed;
                    this.column = Math.floor(this.x / this.map.tileSize);
                    this.row = Math.floor(this.y / this.map.tileSize);
                    c = this.map.map[this.row][this.column];
                    if (c !== 'v') {
                        this.y = this.row * this.map.tileSize;
                    }
                    this.changeDirection('south');
                }
                break;
            default:
                console.log("Problem picking direction");
                break;
        }
        this.getTrueCordinates();
    }
    Entity.prototype.update.call(this);
}

GroundUnit.prototype.draw = function() {
    if (!this.isDead) {
        this.animation.drawEnemy(this.game.clockTick, this.ctx, this.x, this.y, this.currentHealth, this.maxHealth, this.armor);
    } else {
        this.animation.drawDeathFrame(this.game.clockTick, this.ctx, this.x, this.y, this.deadAnimationTimme);
    }
    //this.frame = Math.floor(angle(this.trueX, this.trueY, (this.lineToColumn + 0.5) * this.map.tileSize, (this.lineToRow + 0.5) * this.map.tileSize) / (360 / this.unit.frames));
    //this.animation.drawDefender(this.ctx, this.x, this.y, this.frame);
    Entity.prototype.draw.call(this);
}

GroundUnit.prototype.changeDirection = function(direction) {
    this.direction = direction;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`);
}

GroundUnit.prototype.flyingMovement = function () {
    let y = this.entrance.row * this.map.tileSize;
    let x = this.entrance.column * this.map.tileSize;
    let slope;
    if (x < this.map.baseX) { //enemy spawns west of base
        slope = (this.map.baseY - y) / (this.map.baseX - x);
        this.x += this.game.clockTick * this.speed;
        this.y += this.game.clockTick * this.speed * slope;
    } else { //enemy spawns east of base
        slope = (this.map.baseY - y) / (this.map.baseX - x + this.map.tileSize);
        this.x -= this.game.clockTick * this.speed;
        this.y -= this.game.clockTick * this.speed * slope;
    }


    this.getTrueCordinates();
}

GroundUnit.prototype.hitBase = function() {
    //**base loses health**
    //**image for base taking damage**
    // find later
    this.gameUI.dmg(this.unit.damage);
    if (this.gameUI.healthCur > 50) {
        //Play taking damge sound
        //'./soundfx/baseAttack.wav'
        //var baseAttack = new Audio('./soundfx/baseAttack.wav');
        //baseAttack.play();
    } else {
        //Play low health sound
        //'./soundfx/baseLow.wav'
        //var baseLow = new Audio('./soundfx/baselowfire.wav');
        //baseLow.play();
    }
    this.curTime = new Date().getSeconds();
    this.isDead = true;
    this.removeFromWorld = true;
}

GroundUnit.prototype.setDeathAnimation = function() {
    this.unit = this.unit.deathAnimation;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_death.png`);
    this.animation.frameWidth = this.unit.frameWidth;
    this.animation.frameDuration = this.unit.frameDuration;
    this.animation.frameHeight = this.unit.frameHeight;
    this.animation.sheetWidth = this.unit.sheetWidth;
    this.animation.frames = this.unit.frames;
    this.animation.loop = this.unit.loop;
    this.animation.scale = this.unit.scale;
}

GroundUnit.prototype.getTrueCordinates = function() {
    this.trueX = this.x + (this.unit.frameWidth * this.unit.scale / 2);
    this.trueY = this.y + (this.unit.frameHeight * this.unit.scale / 2);
}


function isLegalMove(c) {
    return c === '<' || c === '>' || c === '^' || c === 'v';
}

function findDirection(map, row, col) {
    let c = map.map[row][col];
    switch (c) {
        case '<':
            return "west"
            break;
        case '>':
            return "east"
            break;
        case 'v':
            return "south"
            break;
        case '^':
            return 'north'
            break;
        default:
            console.log(c);
            console.log("You're going down!");
            break;
    }
}

GroundUnit.prototype.newLevel = function (map) {
    this.map = map;
}


GroundUnit.prototype.calculateFlyAnimation = function (row, column) {
    this.xDif = this.x - column * this.map.tileSize;
    this.yDif = this.y - row * this.map.tileSize;
    this.dist = Math.sqrt(Math.pow(this.xDif, 2) + Math.pow(this.yDif, 2));
    this.xSpeed = this.speed * (this.xDif / this.dist);
    this.ySpeed = this.speed * (this.yDif / this.dist);
}

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta + 180;
}