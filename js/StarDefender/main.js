var AM = new AssetManager();

//load defender sprites
var defenderList = ["marine", "battlecruiser", "ghost", "antiair", "dropship", "firebat"];
var defenderAction = ["stand", "shoot", "projectile"]
for (let i = 0; i < defenderList.length; i++) {
    for (let j = 0; j < defenderAction.length; j++) {
        AM.queueDownload(`./img/${defenderList[i]}/${defenderList[i]}_${defenderAction[j]}.png`);
    }
}

//load enemy sprites
var unitList = ["mutalisk", "queen", "zergling", "ultralisk", "hydralisk", "defiler", "scourge",
    "sarahkerrigan", "devourer", "overlord", "infestedkerrigan", "drone", "guardian", "infestedterran", "lurker", "broodling", "darktemplar"
];
var directions = ["east", "west", "north", "south", "ne", "nw", "se", "sw", "death"];
for (let i = 0; i < unitList.length; i++) {
    for (let j = 0; j < directions.length; j++) {
        AM.queueDownload(`./img/${unitList[i]}/${unitList[i]}_${directions[j]}.png`);
    }
    if (i < 8) {
        AM.queueDownload(`./img/firebat/firebat_projectile_${directions[i]}.png`);
        AM.queueDownload(`./img/battlecruiser/battlecruiser_projectile_${directions[i]}.png`);
    }
}

//load tiles
for (let i = 1; i <= 6; i++) {
    AM.queueDownload(`./tiles/dirt/dirt_${i}.png`);
}

//load maps
for (let i = 1; i <= 5; i++) {
    AM.queueDownload(`./map/map_${i}.png`);
}

//load scv sprites
AM.queueDownload("./img/scv/scv_east.png");
AM.queueDownload("./img/scv/scv_west.png");
AM.queueDownload("./img/scv/scv_mine.png");

//load misc
AM.queueDownload("./tiles/base.png")
AM.queueDownload("./tiles/mineral.png");

AM.downloadAll(function() {
    var canvas = document.getElementById("gameWorld");
    canvas.focus();
    var ctx = canvas.getContext("2d");
    var map = new Map(map_1);
    var myMouse = new Mouse(map, ctx);

    //UI Load
    canvas.style.outlineColor = "#000000"; //prevent highlighting
    var ui = new UI(myMouse, 100 /*startHealth*/ , 100 /*maxHealth*/ , 200 /*resources*/ ,
        1 /*startLevel*/ , -1 /*wavesCleared*/ , 0 /*enemiesKilled*/ );
    myMouse.attachUI(ui);

    var gameEngine = new GameEngine(myMouse, ui, map, AM);
    myMouse.init(gameEngine);


    //This generator will allow us to easily create enemies or towers and not just in main when the code first loads
    this.generator = new Generator(gameEngine, map, AM, ui);
    myMouse.setGenerator(this.generator);

    gameEngine.setGenerator(this.generator);

    this.wave = new Wave(this.generator, gameEngine);
    gameEngine.wave = this.wave;

    //Game Engine Start
    gameEngine.init(ctx);
    gameEngine.start();

    //Attach gameengine to ui
    ui.attachEngine(gameEngine);

    //Map Load
    map.createMap(gameEngine, AM);

    //Display tutorial
    ui.displayTutorial();

});