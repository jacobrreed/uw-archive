var scv = {
    name: "scv",
    frameWidth: 40,
    frameHeight: 41,
    sheetWidth: 1,
    frameDuration: 0.1,
    frames: 1,
    loop: true,
    scale: 1,
    speed: 65,
    direction: "west",
    gatherTime: 2.8
};

function SCV(game, map, assetManager, theUI) {
    this.AM = assetManager;
    this.map = map;
    this.game = game;
    this.UI = theUI;
    this.unit = scv;
    this.direction = this.unit.direction;
    this.name = this.unit.name;

    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.ctx = game.ctx;

    this.x = this.map.baseX - 1;
    this.y = this.map.baseY + (this.map.tileSize * 2);

    this.speed = this.unit.speed;

    this.gatherTime = this.unit.gatherTime;

    Entity.call(this, game, this.x, this.y);
}

SCV.prototype = new Entity();
SCV.prototype.constructor = SCV;

SCV.prototype.update = function() {

    if (this.atBase()) {
        this.changeDirection("west");
        this.UI.resourceAdjust(25);
        //adds 50 minerals to resources
        this.moveWest();
    } else if (this.atMineral()) {
        this.getMinerals();
    } else {
        if (this.direction === "east") {
            this.moveEast();
        } else if (this.direction === "west") {
            this.moveWest();
        }
    }
    Entity.prototype.update.call(this);
}

SCV.prototype.atBase = function() {
    return this.x >= this.map.baseX;
}

SCV.prototype.atMineral = function() {
    return this.x <= (this.map.mineralX + (2 * this.map.tileSize));
}

SCV.prototype.getMinerals = function() {

    this.gatherTime -= this.game.clockTick;
    if (this.gatherTime >= 0) {
        this.animation.spriteSheet = this.AM.getAsset(`./img/${this.name}/${this.name}_mine.png`);
    } else {
        this.gatherTime = 3.5;
        this.changeDirection("east");
        this.moveEast();
    }
}

SCV.prototype.moveEast = function() {
    this.x = this.x + this.game.clockTick * this.speed; //progresses unit east
}

SCV.prototype.moveWest = function() {
    this.x = this.x - this.game.clockTick * this.speed; //progresses unit west
}

SCV.prototype.changeDirection = function(direction) {
    this.direction = direction;
    temp1 = `./img/${this.name}/${this.name}_${this.direction}.png`;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.name}/${this.name}_${this.direction}.png`);
}

SCV.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

SCV.prototype.updateMap = function(newMap) {
    this.map = newMap;
}