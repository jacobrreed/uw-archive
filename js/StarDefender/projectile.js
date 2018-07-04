
var marine_projectile = {
    name: "marine",
    frameWidth: 42,
    frameHeight: 42,
    sheetWidth: 1,
    frameDuration: 1,
    frames: 1,
    loop: true,
    scale: 0.2,
};
var battlecruiser_projectile = {
    name: "battlecruiser",
    frameWidth: 66,
    frameHeight: 116,
    sheetWidth: 1,
    frameDuration: 1,
    frames: 1,
    loop: true,
    scale: 0.2,
};
var ghost_projectile = {
    name: "ghost",
    frameWidth: 15,
    frameHeight: 17,
    sheetWidth: 1,
    frameDuration: 1,
    frames: 1,
    loop: true,
    scale: 0.6,
};

var antiair_projectile = {
    name: "antiair",
    frameWidth: 20,
    frameHeight: 20,
    sheetWidth: 1,
    frameDuration: 1,
    frames: 1,
    loop: true,
    scale: 1,
};

//Game engine, Asset Manager, Defender name, Initial x, Initial y, Enemy, Speed
function Projectile(gameEngine, AM, defenderName, x0, y0, enemy, damage, speedSetting, armorPiercing) {
    this.gameEngine = gameEngine;
    //Switch case for units.
    switch (defenderName) {
        case "marine":
            this.unit = marine_projectile;
            break;
        case "antiair":
            this.unit = antiair_projectile;
            break;
        case "battlecruiser":
            this.unit = battlecruiser_projectile;
            break;
        case "ghost":
            this.unit = ghost_projectile;
            break;
        default:
            console.log("Problem creating projectile");
            break;
    }
    this.frameWidth = this.unit.frameWidth;
    this.frameHeight = this.unit.frameHeight;
    this.sheetWidth = this.unit.sheetWidth;
    this.frameDuration = this.unit.frameDuration;
    this.frames = this.unit.frames;
    this.loop = this.unit.loop;
    this.scale = this.unit.scale;
    this.defenderName = defenderName;
    this.enemy = enemy;
    this.damage = damage;
    this.armorPiercing = armorPiercing;
    this.AM = AM;
    this.ctx = this.gameEngine.ctx;
    this.x = x0;
    this.y = y0;
    this.speed = speedSetting * 100;
    this.animation = new Animation(this.AM.getAsset(`./img/${this.defenderName}/${this.defenderName}_projectile.png`), this.frameWidth, this.frameHeight, this.sheetWidth , this.frameDuration, this.frames, this.loop, this.scale);
    this.calculateSpeed();
    Entity.call(this, gameEngine, this.x, this.y);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function() {
    this.calculateSpeed();
    this.dist -= this.gameEngine.clockTick * this.speed;
    if (this.dist > 0 && this.enemy.currentHealth > 0) {
        this.x -= this.gameEngine.clockTick * this.xSpeed;
        this.y -= this.gameEngine.clockTick * this.ySpeed;
    } else {
        if (this.armorPiercing) {
            this.enemy.currentHealth -= this.damage;
            this.removeFromWorld = true;
        } else {
            var damage = this.damage - this.enemy.armor;
            if (damage <= 0) {
                damage = 1;
            }
            this.enemy.currentHealth -= damage;
            this.removeFromWorld = true;
        }
    }
    Entity.prototype.update.call(this);
}

Projectile.prototype.draw = function() {
    //this.animation.drawFrame(this.gameEngine.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Projectile.prototype.calculateSpeed = function() {
    this.xDif = this.x - this.enemy.trueX;
    this.yDif = this.y - this.enemy.trueY;
    this.dist = Math.sqrt(Math.pow(this.xDif, 2) + Math.pow(this.yDif, 2));
    this.xSpeed = this.speed * (this.xDif / this.dist);
    this.ySpeed = this.speed * (this.yDif / this.dist);
}