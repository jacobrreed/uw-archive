/*
Constructor
buttonCanvas - canvas that has defence structure uiButtons
textCanvas - textArea that holds this
*/
var images = [
    "./img/buttons/marine_portrait.png",
    "./img/buttons/scv_portrait50.png",
    "./img/buttons/ghost_portrait.png",
    "./img/buttons/battlecruiser_portrait.png",
    "./img/buttons/antiair_portrait.png",
    "./img/buttons/firebat_portrait.png"
];

function UI(mouse, startHealth, maxHealth,
    startRes, startLevel, wavesCleared, enemiesK) {
    this.canvas = document.getElementById("uiButtons");
    this.ctx = this.canvas.getContext("2d");
    //Text box - prevents highlighting
    this.textBox = document.getElementById("uiText");
    makeUnselectable(this.textBox);
    makeUnselectable(document.getElementById("gameOverlayScreen"));
    this.mouse = mouse;
    this.tutorialBool = false;
    //Music
    this.audio = new Audio(),
        i = 0;
    this.playlist = new Array('./music/1.mp3', './music/2.mp3', './music/3.mp3', './music/4.mp3', './music/5.mp3');
    this.audio.addEventListener('ended', function() {
        i = ++i < playlist.length ? i : 0;
        this.audio.src = playlist[i];
        this.audio.play();
    }, true);
    this.audio.volume = 0.3;
    this.audio.loop = true;
    this.audio.src = this.playlist[0];
    this.audio.play();
    this.attachKeybinds();

    //Game info text panel
    generateGameInfo();
    drawImages(this.ctx);

    //gets relative mouse position based on canvas
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    //Draws button images
    function drawImages(ctx) {
        //Marine
        var marine_img = new Image();
        marine_img.onload = function() {
            ctx.drawImage(marine_img, 0, 220);
        }
        marine_img.src = images[0];

        //Ghost
        var ghost_img = new Image();
        ghost_img.onload = function() {
            ctx.drawImage(ghost_img, 0, 0);
        }
        ghost_img.src = images[2];

        //Battlecruiser
        var battle_img = new Image();
        battle_img.onload = function() {
            ctx.drawImage(battle_img, 110, 0);
        }
        battle_img.src = images[3];

        //AntiAir
        var antiair_img = new Image();
        antiair_img.onload = function() {
            ctx.drawImage(antiair_img, 110, 110);
        }
        antiair_img.src = images[4];

        //Firebat
        var firebat_img = new Image();
        firebat_img.onload = function() {
            ctx.drawImage(firebat_img, 0, 110);
        }
        firebat_img.src = images[5];

        //SCV
        var scv_img = new Image();
        scv_img.onload = function() {
            ctx.drawImage(scv_img, 110, 220);
        }
        scv_img.src = images[1];
    };

    //init values
    this.inithealthCur = startHealth;
    this.inithealthMax = maxHealth;
    this.initresourcesTotal = startRes;
    this.initcurLevel = startLevel;
    this.initwavesC = wavesCleared;
    this.initenemiesKilled = enemiesK;
    this.initWaveTime = 0;

    this.healthCur = startHealth;
    this.healthMax = maxHealth;
    this.resourcesTotal = startRes;
    this.curLevel = startLevel;
    this.wavesC = wavesCleared;
    this.enemiesKilled = enemiesK;
    this.waveTime = 0;

    this.time = "00:00";
    this.timeReal = 0;
    this.timeChange = 0;

    //Load Default Text
    this.updateText();
};

UI.prototype.attachKeybinds = function() {
    var that = this;
    this.canvas.addEventListener("click", function(e) {
        var mousePos = getMousePos(document.getElementById("uiButtons"), e);
        if (mousePos.x >= 0 && mousePos.x <= 100 && mousePos.y >= 0 && mousePos.y <= 100) {
            that.mouse.unitCost = 150;
            that.mouse.tileBox.unitCost = 150;
            if (!(that.gameEngine.getPauseBool())) {
                that.mouse.selectDefender("ghost");
            }
        } else if (mousePos.x >= 110 && mousePos.x <= 210 && mousePos.y >= 0 && mousePos.y <= 100) {
            that.mouse.unitCost = 200;
            that.mouse.tileBox.unitCost = 200;
            if (!(that.gameEngine.getPauseBool())) {
                that.mouse.selectDefender("battlecruiser");
            }
        } else if (mousePos.x >= 0 && mousePos.x <= 100 && mousePos.y >= 110 && mousePos.y <= 210) {
            that.mouse.unitCost = 100;
            that.mouse.tileBox.unitCost = 100;
            if (!(that.gameEngine.getPauseBool())) {
                that.mouse.selectDefender("firebat");
            }
        } else if (mousePos.x >= 110 && mousePos.x <= 210 && mousePos.y >= 110 && mousePos.y <= 210) {
            that.mouse.unitCost = 100;
            that.mouse.tileBox.unitCost = 100;
            if (!(that.gameEngine.getPauseBool())) {
                that.mouse.selectDefender("antiair");
            }
        } else if (mousePos.x >= 0 && mousePos.x <= 100 && mousePos.y >= 210 && mousePos.y <= 320) {
            that.mouse.unitCost = 50;
            that.mouse.tileBox.unitCost = 50;
            if (!(that.gameEngine.getPauseBool())) {
                that.mouse.selectDefender("marine");
            }
        } else if (mousePos.x >= 110 && mousePos.x <= 210 && mousePos.y >= 210 && mousePos.y <= 320) {
            if (!(that.gameEngine.getPauseBool())) {
                that.mouse.selectDefender("scv");
            }
        }
    }, false);

}
UI.prototype.attachEngine = function(engine) {
    this.gameEngine = engine;
}

//Pauses music or plays music based on boolean toggle
UI.prototype.pauseMusic = function(bool) {
    var that = this;
    if (bool) {
        that.audio.pause();
    } else {
        that.audio.play();
    }

}

//Draws the new scv portrait based on cost
UI.prototype.drawSCVImage = function(theInt) {
    var scv_img = new Image();
    var that = this;
    var canvasBut = document.getElementById("uiButtons");
    var ctxBut = canvasBut.getContext("2d");
    scv_img.onload = function() {
        ctxBut.drawImage(scv_img, 110, 220);
    };
    theInt *= -1;
    scv_img.src = './img/buttons/scv_portrait' + theInt + '.png';
}

//Updates stats text box with most recent data
UI.prototype.updateText = function() {
    var tempString = "Health: ";
    tempString += this.healthCur + " / " + this.healthMax + "\n";
    tempString += "Resources: " + this.resourcesTotal + "\n";
    tempString += "Level: " + this.curLevel + "\n";
    tempString += "Wave: " + (this.wavesC + 1) + "\n";
    tempString += "Enemies Killed: " + this.enemiesKilled + "\n";
    tempString += "Time: " + this.time + "\n";
    tempString += "Next Wave: " + this.waveTime + "\n";
    this.textBox.value = tempString;
}

//Takes health away from current health pool
UI.prototype.dmg = function(amount) {
    this.healthCur -= amount;
    if (this.healthCur <= 0) {
        //Game over screen
        this.healthCur = 0;
        this.updateText;
        this.gameOverScreen();
    }
    this.updateText();
}

UI.prototype.gameOverScreen = function() {
    this.canvas = document.getElementById("gameOverlayScreen");
    this.ctx = this.canvas.getContext("2d");
    var gameOverImg = new Image();
    var that = this;
    gameOverImg.onload = function() {
        that.ctx.drawImage(gameOverImg, 40, 50);
    };
    gameOverImg.src = './img/ui/gameOver.png';
    this.gameEngine.isPlaying = false;
    this.gameEngine.pause(true, true);
}

//Adjust resource + or -
UI.prototype.resourceAdjust = function(amount) {
    this.resourcesTotal += Math.floor(amount);
    this.updateText();
}

//Adjust waves Cleared
UI.prototype.wavesAdjust = function(amount) {
    this.wavesC += amount;
    this.updateText();
}

//Adjust enemies Killed
UI.prototype.enemiesKilledAdjust = function(amount) {
    this.enemiesKilled += amount;
    this.updateText();
}

//Adjust level
UI.prototype.adjustLevel = function(amount) {
    this.curLevel += amount;
    this.updateText();
}

//Reset this to init values from initial new Stat() call
UI.prototype.reset = function() {
    this.healthCur = this.inithealthCur;
    this.healthMax = this.inithealthMax;
    this.resourcesTotal = this.initresourcesTotal;
    this.curLevel = this.initcurLevel;
    this.wavesC = this.initwavesC;
    this.enemiesKilled = this.initenemiesKilled;
    this.time = this.inittime;
    this.updateText();
}

//Reset this to init values from initial new Stat() call
UI.prototype.newLevel = function() {
    this.healthCur = this.inithealthCur;
    this.healthMax = this.inithealthMax;
    this.resourcesTotal = this.initresourcesTotal;
    this.wavesC = this.initwavesC;
    this.enemiesKilled = this.initenemiesKilled;
    this.time = this.inittime;
    this.updateText();
}

//Updates time using gameEngine and formats in a user friendly time
UI.prototype.updateTime = function(value) {
    var that = this;
    var timeString = parseFloat(value).toFixed(2);
    var timeString = Math.floor(timeString);
    this.timeReal = timeString;
    if (timeString < 10) { //seconds format < 10
        timeString = "00:0" + timeString;
        this.time = timeString;
    } else if (timeString < 60) { //seconds format
        timeString = "00:" + timeString;
        this.time = timeString;
    } else { //Minutes:Seconds format
        minutes = Math.floor(timeString / 60);
        seconds = Math.floor(timeString % 60);
        if (seconds < 10) {
            timeString = minutes + ":0" + seconds;
        } else {
            timeString = minutes + ":" + seconds;
        }
        this.time = timeString;
    }
    this.updateText();
}

//Updates time before next wave using wave.js
UI.prototype.waveTimeGet = function(theTime) {
    var tempTime = Math.floor(theTime);
    this.waveTime = "00:0" + tempTime;
    this.updateText();
}

UI.prototype.displayTutorial = function() {
    var that = this;
    that.tutorialBool = true;
    that.tutorialSkip = false;
    var tutorialImages = [
        ["./img/tutorial/keybinds.png", 60, 0],
        ["./img/tutorial/information.png", 285, 0],
        ["./img/tutorial/health.png", 285, 0],
        ["./img/tutorial/resources.png", 285, 0],
        ["./img/tutorial/base.png", 0, 410],
        ["./img/tutorial/lane.png", 125, 300],
        ["./img/tutorial/armor.png", 125, 300],
        ["./img/tutorial/pickup.png", 125, 300],
        ["./img/tutorial/defenders.png", 285, 250],
        ["./img/tutorial/ghost.png", 285, 250],
        ["./img/tutorial/battlecruiser.png", 285, 250],
        ["./img/tutorial/firebat.png", 285, 350],
        ["./img/tutorial/antiair.png", 285, 350],
        ["./img/tutorial/marine.png", 285, 450],
        ["./img/tutorial/scv.png", 285, 450],
        ["./img/tutorial/start.png", 200, 150]
    ];

    //Draw tutorial
    var canvasThree = document.getElementById("gameOverlayScreen");
    var ctxThree = canvasThree.getContext("2d");
    that.gameEngine.tutorialPause(true);
    ctxThree.clearRect(0, 0, canvasThree.width, canvasThree.height);

    var i = 0;
    that.t;

    function drawTutorialImages() {

        that.t = setTimeout(function() {
            ctxThree.clearRect(0, 0, canvasThree.width, canvasThree.height);
            var tempSrc = tutorialImages[i][0];
            var tempX = tutorialImages[i][1];
            var tempY = tutorialImages[i][2];
            var tempImg = new Image();
            tempImg.onload = function() {
                ctxThree.drawImage(tempImg, tempX, tempY, 500, 200);
                that.buttonHighlight(i);
            }
            tempImg.src = tempSrc;
            i++;
            if (i < tutorialImages.length) {
                drawTutorialImages();
                ctxThree.clearRect(0, 0, canvasThree.width, canvasThree.height);
                that.gameReady = false;
            } else {
                that.gameEngine.pause(true);
            }

        }, 5000);
    }
    drawTutorialImages();
}

UI.prototype.cancelTutorial = function() {
    var that = this;
    that.tutorialBool = false;
    clearTimeout(that.t);
    var canvasThree = document.getElementById("gameOverlayScreen");
    var ctxThree = canvasThree.getContext("2d");
    ctxThree.clearRect(0, 0, canvasThree.width, canvasThree.height);
    that.gameEngine.pause(false, false);
}

UI.prototype.buttonHighlight = function(i) {
    var that = this;
    var tempX;
    var tempY;
    //Coordinated based on i 10-15 defenders
    switch (i) {
        case 10:
            tempX = 0;
            tempY = 0;
            break;
        case 11:
            tempX = 110;
            tempY = 0;
            break;
        case 12:
            tempX = 0;
            tempY = 110;
            break;
        case 13:
            tempX = 110;
            tempY = 110;
            break;
        case 14:
            tempX = 0;
            tempY = 220;
            break;
        case 15:
            tempX = 110;
            tempY = 220;
        default:
            break;
    }

    that.ctx.beginPath();
    that.ctx.lineWidth = "2";
    that.ctx.strokeStyle = "red";
    that.ctx.rect(tempX, tempY, 100, 100);
    that.ctx.stroke();
    setTimeout(function() {
        that.ctx.beginPath();
        that.ctx.lineWidth = "2";
        that.ctx.strokeStyle = "black";
        that.ctx.rect(tempX, tempY, 100, 100);
        that.ctx.stroke();
    }, 5000);
}



//Makes any element unselectable - disables highlighting
function makeUnselectable(elem) {
    if (typeof(elem) == 'string')
        elem = document.getElementById(elem);
    if (elem) {
        elem.onselectstart = function() {
            return false;
        };
        elem.style.MozUserSelect = "none";
        elem.style.KhtmlUserSelect = "none";
        elem.unselectable = "on";
    }
}

//Generates game info in box
function generateGameInfo() {
    this.gameInfoBox = document.getElementById("gameInfo");
    makeUnselectable(this.gameInfoBox);
    this.gameInfoBox.addEventListener('mousedown', function(e) {
        e.preventDefault();
    }, false);
    this.gameInfoBox.value = "Star Defender\n" +
        "*************************\n" +
        "Keybinds\n" +
        "----\n" +
        "(A) Marine:\n    Med Damage\n    Weak vs Armor\n    Hits Air and Ground\n" +
        "(Q) Firebat:\n    High DPS\n    Limited Range\n    Cannot be Moved\n" +
        "(S) Ghost:\n    Medium Damage\n    Armor Piercing\n    Ground Specialist\n" +
        "(D) Battlecruiser:\n    High Damage\n    Long Range\n    Low Rate of Fire\n" +
        "(W) Anti Air:\n    High Damage\n    Armor Piercing\n    Hits Air Only\n" +
        "(F) SCV:\n    Collects 25 Resources\n" +
        "-----\n" +
        "(R) Restart Current Level\n" +
        "(P) Pause/Resume Game\n" +
        "(M) Music (On/Off)\n" +
        "(T) Skip Tutorial\n";

}