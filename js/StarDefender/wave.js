var mutaliskWave = {
    name: "mutalisk",
    delay: .5,
    isBoss: false
};
var scourgeWave = {
    name: "scourge",
    delay: .5,
    isBoss: false
};
var queenWave = {
    name: "queen",
    delay: 1,
    isBoss: false
};
var droneWave = {
    name: "drone",
    delay: .65,
    isBoss: false
};
var guardianWave = {
    name: "guardian",
    delay: .65,
    isBoss: false
};
var zerglingWave = {
    name: "zergling",
    delay: .65,
    isBoss: false
};
var broodlingWave = {
    name: "broodling",
    delay: .65,
    isBoss: false
};
var darktemplarWave = {
    name: "darktemplar",
    delay: 1,
    isBoss: true
}
var lurkerWave = {
    name: "lurker",
    delay: .65,
    isBoss: false
};
var infestedterranWave = {
    name: "infestedterran",
    delay: .65,
    isBoss: false
};
var ultraliskWave = {
    name: "ultralisk",
    delay: 1,
    isBoss: true
};
var hydraliskWave = {
    name: "hydralisk",
    delay: .7,
    isBoss: false
};
var defilerWave = {
    name: "defiler",
    delay: .75,
    isBoss: false
};
var devourerWave = {
    name: "devourer",
    delay: .25,
    isBoss: true
};
var overlordWave = {
    name: "overlord",
    delay: .25,
    isBoss: true
};
var sarahkerriganWave = {
    name: "sarahkerrigan",
    delay: .25,
    isBoss: true
};
var infestedkerriganWave = {
    name: "infestedkerrigan",
    delay: .25,
    isBoss: true
}

function Wave(generator, game) {
    this.generator = generator;
    this.gameEngine = game;
    this.unitAmount = 0;
    this.delay = .25;
    this.canDraw = false;
}

Wave.prototype.constructor = Wave;

Wave.prototype.drawWave = function() {

    if (this.delay <= 0) {
        if (this.unit.isBoss === false) {
            if (this.entranceNum === 1) {
                this.generator.createEnemyFirstEntry(this.name, this.speedBuff, this.healthBuff);
            } else if (this.entranceNum === 2) {
                this.generator.createEnemySecondEntry(this.name, this.speedBuff, this.healthBuff);
            } else {
                this.generator.createEnemyFirstEntry(this.name, this.speedBuff, this.healthBuff);
                this.generator.createEnemySecondEntry(this.name, this.speedBuff, this.healthBuff);
            }
    
        // For bosses
        } else {
            if (this.entranceNum === 1) {
                this.generator.createEnemyFirstEntryBoss(this.name, this.speedBuff, this.healthBuff);
            } else if (this.entranceNum === 2) {
                this.generator.createEnemySecondEntryBoss(this.name, this.speedBuff, this.healthBuff);
            } else {
                this.generator.createEnemyFirstEntryBoss(this.name, this.speedBuff, this.healthBuff);
                this.generator.createEnemySecondEntryBoss(this.name, this.speedBuff, this.healthBuff);
            }
    
            
        }
        this.delay = this.unit.delay;
        this.unitAmount--;
        if (this.unitAmount <= 0) {
            this.delay = 100000;
        }
    }

}

Wave.prototype.update = function() {
    if (this.gameEngine.addNewLevel) {
        this.delay -= this.gameEngine.clockTick;
    }
}

Wave.prototype.setWave = function(unitName, unitAmount, theSpeedBuff, theHealthBuff, theEntranceNum) {
    switch (unitName) {
        case "mutalisk":
            this.unit = mutaliskWave;
            break;
        case "scourge":
            this.unit = scourgeWave;
            break;
        case "queen":
            this.unit = queenWave;
            break;
        case "zergling":
            this.unit = zerglingWave;
            break;
        case "broodling":
            this.unit = broodlingWave;
            break;
        case "lurker":
            this.unit = lurkerWave;
            break;
        case "infestedterran":
            this.unit = infestedterranWave;
            break;
        case "guardian":
            this.unit = guardianWave;
            break;
        case "drone":
            this.unit = droneWave;
            break;
        case "ultralisk":
            this.unit = ultraliskWave;
            break;
        case "hydralisk":
            this.unit = hydraliskWave;
            break;
        case "defiler":
            this.unit = defilerWave;
            break;
        case "devourer":
            this.unit = devourerWave;
            break;
        case "overlord":
            this.unit = overlordWave;
            break;
        case "darktemplar":
            this.unit = darktemplarWave;
            break;
        case "sarahkerrigan":
            this.unit = sarahkerriganWave;
            break;
        case "infestedkerrigan":
            this.unit = infestedkerriganWave;
            break;
        default:
            console.log("Illegal wave");
            break;
    }

    this.name = this.unit.name;
    this.entranceNum = theEntranceNum;
    this.speedBuff = 1 + theSpeedBuff;
    this.healthBuff = 1 + theHealthBuff;
    this.delay = this.unit.delay;
    this.unitAmount = unitAmount;
    this.canDraw = true;
}

Wave.prototype.setLevel = function(theLevel) {
    this.level = theLevel;
}