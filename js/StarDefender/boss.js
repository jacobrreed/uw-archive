//Create new Boss with settings as specified below. Add new switch case after adding a new variable.

var overlord = {
    name: "overlord",
    frameWidth: 60, frameHeight: 75, sheetWidth: 4, frameDuration: 0.1, frames: 4,
    loop: true,
    scale: .6,
    speed: 40,
    health: 600,
    armor: 10,
    isAir: false,
    damage: 50,
    deathAnimation: {
        name: "overlord",
        frameWidth: 60, frameHeight: 75, sheetWidth: 1, frameDuration: 1, frames: 1,
        loop: false,
        scale: 1
    }
};

var darktemplar = {
    name: "darktemplar",
    frameWidth: 54, frameHeight: 59, sheetWidth: 11, frameDuration: 0.1, frames: 11,
    loop: true,
    scale: .8,
    speed: 50,
    health: 500,
    armor: 0,
    isAir: false,
    damage: 50,
    deathAnimation: {
        name: "darktemplar",
        frameWidth: 54, frameHeight: 72, sheetWidth: 7, frameDuration: 1, frames: 7,
        loop: false,
        scale: 1
    }
};

var devourer = {
    name: "devourer",
    frameWidth: 70, frameHeight: 83, sheetWidth: 6, frameDuration: 0.1, frames: 6,
    loop: true,
    scale: .6,
    speed: 45,
    health: 2500,
    armor: 8,
    isAir: false,
    damage: 65,
    deathAnimation: {
        name: "devourer",
        frameWidth: 70, frameHeight: 83, sheetWidth: 6, frameDuration: 1, frames: 6,
        loop: false,
        scale: 1
    }
};

var ultralisk = {
    name: "ultralisk",
    frameWidth: 98, frameHeight: 105, sheetWidth: 7, frameDuration: 0.1, frames: 7,
    loop: true,
    scale: 0.55,
    speed: 35,
    health: 3000,
    armor: 10,
    isAir: false,
    damage: 80,
    deathAnimation: {
        name: "ultralisk",
        frameWidth: 98, frameHeight: 105, sheetWidth: 10, frameDuration: 0.1, frames: 10,
        loop: false,
        scale: 0.35
    }
};

var sarahkerrigan = {
    name: "sarahkerrigan",
    frameWidth: 34,
    frameHeight: 40,
    sheetWidth: 8,
    frameDuration: 0.1,
    frames: 8,
    loop: true,
    scale: 1.2,
    speed: 40,
    health: 3000,
    armor: 10,
    isAir: false,
    damage: 100,
    deathAnimation: {
        name: "sarahkerrigan",
        frameWidth: 78,
        frameHeight: 65,
        sheetWidth: 4,
        frameDuration: .23,
        frames: 4,
        loop: false,
        scale: .5
    }
};

var infestedkerrigan = {
    name: "infestedkerrigan",
    frameWidth: 34,
    frameHeight: 40,
    sheetWidth: 8,
    frameDuration: 0.1,
    frames: 8,
    loop: true,
    scale: 1.2,
    speed: 50,
    health: 3000,
    armor: 15,
    isAir: false,
    damage: 100,
    deathAnimation: {
        name: "infestedkerrigan",
        frameWidth: 56,
        frameHeight: 41,
        sheetWidth: 9,
        frameDuration: 1,
        frames: 9,
        loop: false,
        scale: 1
    }
};

var frameCount = 1;

function Boss(game, unitName, entrance, map, assetManager, theSpeedBuff, theHealthBuff, ui) {
    this.AM = assetManager;
    this.gameUI = ui;

    //Switch case for units.
    switch (unitName) {
        case "sarahkerrigan":
            this.unit = sarahkerrigan;
            this.deathSound = './soundfx/deathKerrigan.wav';
            this.hurtSound = './soundfx/sarahkerrigandontlikethis.wav'; 
            this.annoySound = './soundfx/youbegintoannoyme.wav';
            this.killSound = './soundfx/illkillyoumyself.wav';
            this.playSound(this.killSound);
            this.soundTrigger = false;
            break;
        case "ultralisk":
            this.unit = ultralisk;
            this.deathSound = './soundfx/deathUltralisk.wav';
            this.armorTrigger = false;
            break;
        case "infestedkerrigan":
            this.unit = infestedkerrigan;
            this.deathSound = './soundfx/deathKerrigan.wav';
            this.healthTrigger = false;
            break;
        case "devourer":
            this.unit = devourer;
            this.deathSound = './soundfx/deathDevourer.wav';
            this.speedTrigger = false;
            break;
        case "darktemplar":
            this.unit = darktemplar;
            this.deathSound = "./soundfx/deathDarkTemplar.wav";
            this.damageTrigger === false;
            break;    
        case "overlord":
            this.unit = overlord;
            this.deathSound = './soundfx/deathOverlord.wav';
            this.sizeTrigger = false;
            break;
        default:
            console.log("Problem creating Boss");
            break;
    }
    this.entrance = entrance;
    this.map = map;
    // AIR UNIT
    this.isAir = this.unit.isAir;
    if (this.isAir) {
        this.direction = this.map.airDirection;
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

    this.scale = this.unit.scale;

    //perform statbuffs depending on wave
    this.speedBuff = theSpeedBuff;
    this.speed = this.unit.speed * theSpeedBuff;
    this.maxHealth = this.unit.health * theHealthBuff;
    this.currentHealth = this.maxHealth;
    this.armor = this.unit.armor;
    this.animation.lastHealth = this.currentHealth;
    Entity.call(this, game, this.x, this.y);
}

Boss.prototype = new Entity();
Boss.prototype.constructor = Boss;

//Function to play death sounds on death
Boss.prototype.playSound = function(path) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.volume = 0.2;
    audioElement.play();
}

//Calculates new coordinate based on current direction. If the next tile is not path, call changeDirection to find new direction.
Boss.prototype.update = function() {
    var that = this;
    if (this.unit === sarahkerrigan && this.currentHealth < 500 && this.soundTrigger === false) {
        this.soundTrigger = true;
        this.playSound(this.hurtSound);
    }
    
    if (this.unit === ultralisk && this.currentHealth < 500 && this.armorTrigger === false) {
        this.armorTrigger = true;
        this.armor = 30;
    }

    if (this.unit === overlord && this.currentHealth < 500 && this.sizeTrigger === false) {
        this.sizeTrigger = true;
        this.speed += 10;
        this.scale = .3;
        this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`),
                this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.scale * this.map.tileSize / 31);
    }
    if (this.unit === darktemplar && this.currentHealth < 500 && this.damageTrigger === false) {
        this.damageTrigger = true;
        this.damage = 1000;
    }
    if (this.unit === devourer && this.currentHealth < this.unit.health/2 && this.speedTrigger === false) {
        this.speed += 30;
        this.speedTrigger = true;
    } 
    if (this.unit === infestedkerrigan && this.currentHealth < 200 && this.healthTrigger === false) {
        this.currentHealth = 600;
        // audio for revival
        this.healthTrigger = true;
    } else if (this.x >= this.map.baseX && this.y >= this.map.baseY) {
        this.hitBase();
    } else if (this.currentHealth <= 0 && !this.isDead) {
        if (this.unit === sarahkerrigan) { 
            if (frameCount > 0) {
                if (frameCount === 1) {
                    this.playSound(this.annoySound);
                    this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_death.png`),
                    this.unit.deathAnimation.frameWidth, this.unit.deathAnimation.frameHeight, this.unit.deathAnimation.sheetWidth, this.unit.deathAnimation.frameDuration,
                    this.unit.deathAnimation.frames, this.unit.deathAnimation.loop, this.unit.deathAnimation.scale * this.map.tileSize / 31);
                }
                frameCount-= this.game.clockTick;
            } else {
                this.unit = infestedkerrigan;
                this.animation = new Animation(this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`),
                this.unit.frameWidth, this.unit.frameHeight, this.unit.sheetWidth, this.unit.frameDuration, this.unit.frames, this.unit.loop, this.unit.scale * this.map.tileSize / 31);
                this.currentHealth = infestedkerrigan.health;
                this.speed += 10;
                frameCount = 1;
            }
            
        } else {
            this.isDead = true;
            this.setDeathAnimation();
            //Update UI text for enemies killed
            that.gameUI.enemiesKilledAdjust(1);

            //Update resources for each kill
            //Gives 50 resources per kill for now since boss
            that.gameUI.resourceAdjust(50);

            //Play death sounds
            this.playSound(this.deathSound);

        }
        
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

Boss.prototype.draw = function() {
    if (!this.isDead) {
        this.animation.drawBoss(this.game.clockTick, this.ctx, this.x, this.y, this.currentHealth, this.maxHealth, this.unitName);
    } else {
        this.animation.drawDeathFrame(this.game.clockTick, this.ctx, this.x, this.y, this.deadAnimationTimme);
    }
    Entity.prototype.draw.call(this);
}

Boss.prototype.changeDirection = function(direction) {
    this.direction = direction;
    this.animation.spriteSheet = this.AM.getAsset(`./img/${this.unit.name}/${this.unit.name}_${this.direction}.png`);
}

Boss.prototype.hitBase = function() {
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

Boss.prototype.setDeathAnimation = function() {
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

Boss.prototype.getTrueCordinates = function() {
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