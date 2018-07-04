var dropship = {
    name: "dropship",
    frameWidth: 59,
    frameHeight: 57,
    sheetWidth: 1,
    frameDuration: 0.1,
    frames: 32,
    loop: true,
    scale: .9,
    speed: 175
};

function Dropship(game, map, assetManager, unitStartColumn, unitStartRow, unitEndColumn, unitEndRow, theDefender) {
    this.AM = assetManager;
    this.map = map;
    this.gameEngine = game;
    this.unit = dropship;
    this.direction = "nw";
    this.name = this.unit.name;
    this.defender = theDefender;

    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_stand.png`),
        this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
    this.ctx = game.ctx;

    this.x = this.map.baseX + 15;
    this.y = this.map.baseY + (this.map.tileSize * 2);
    this.yIntercept = this.map.baseY + (this.map.tileSize * 2);
    this.unitStartX = unitStartColumn * this.map.tileSize;
    this.unitStartY = unitStartRow * this.map.tileSize;
    this.unitEndX = unitEndColumn * this.map.tileSize;
    this.unitEndY = unitEndRow * this.map.tileSize;
    this.endRow = unitEndRow;
    this.endColumn = unitEndColumn;

    this.isPickingUp = true;
    this.isDroppingOff = false;

    this.speed = this.unit.speed;

    Entity.call(this, game, this.x, this.y);
}

Dropship.prototype = new Entity();
Dropship.prototype.constructor = Dropship;

Dropship.prototype.update = function() {

    if (this.isPickingUp) {
        this.moveToUnit()
    } else if (this.isDroppingOff) {
        this.dropOffUnit();
    } else {
        this.headToBase();
    }
    Entity.prototype.update.call(this);
}

Dropship.prototype.moveToUnit = function() {
    if (this.move(this.unitStartX, this.unitStartY)) { //reached the unit
        this.map.map[this.defender.row][this.defender.column] = '+';
        this.isPickingUp = false;
        this.isDroppingOff = true;
        this.defender.isDummy = true;
    }
}

Dropship.prototype.dropOffUnit = function() {
    if (this.move(this.unitEndX, this.unitEndY)) { //reached dropoff spot
        this.defender.row = this.unitEndY / this.map.tileSize;
        this.defender.column = this.unitEndX / this.map.tileSize;
        this.defender.x = this.unitEndX;
        this.defender.y = this.unitEndY;
        this.defender.calculateXY(this.endRow, this.endColumn);
        this.defender.calculateTrueXY();
        this.map.map[this.defender.row][this.defender.column] = this.defender.unit.mapKey;
        this.defender.isDummy = false;
        this.isDroppingOff = false;
    }
}

Dropship.prototype.headToBase = function() {

    if (this.move(this.map.baseX, this.map.baseY)) { //reached base
        this.removeFromWorld = true;
    }
}

// Helper function to move to next destination
Dropship.prototype.move = function(destinationX, destinationY) {
    this.frame = Math.floor(angle(this.x, this.y, destinationX, destinationY) / (360 / this.unit.frames));

    this.calculateFlyAnimation(destinationX, destinationY);
    this.dist -= this.gameEngine.clockTick * this.speed;
    if (this.dist > 0) {
        this.x -= this.gameEngine.clockTick * this.xSpeed;
        this.y -= this.gameEngine.clockTick * this.ySpeed;
    } else {
        return true;
    }
}

Dropship.prototype.draw = function() {
    this.animation.drawDefender(this.ctx, this.x, this.y, this.frame);
    Entity.prototype.draw.call(this);
}

Dropship.prototype.calculateFlyAnimation = function(destinationX, destinationY) {
    this.xDif = this.x - destinationX;
    this.yDif = this.y - destinationY;
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