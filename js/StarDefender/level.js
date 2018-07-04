/*
 * Choose which enemy, quantity, stat boosts, and entrance locations for each level.
 */

//NOTE: Every level must have an extra waveSize of 0. This is because reasons.
//entranceNum = which entry point on the map they enter from. 1 = first entrance, 2 = second entrance, 3 = both

//**Default Stats**//
//Ground Enemies
var b = "broodling";          // HP:40  Speed:60  Armor:1
var i = "infestedterran";     // HP:40  Speed:60  Armor:1
var dr = "drone";             // HP:50  Speed:35  Armor:0
var z = "zergling";           // HP:60  Speed:80  Armor:0
var l = "lurker";             // HP:90  Speed:50  Armor:2
var d = "defiler";            // HP:180  Speed:60  Armor:5
var q = "queen";     //yaas   // HP:225  Speed:50  Armor:5
var h = "hydralisk";          // HP:250  Speed:60  Armor:8

//Flying Enemies
var s = "scourge";  // HP:40   Speed:65  Armor:0
var m = "mutalisk"; // HP:110  Speed:45  Armor:6
var g = "guardian"; // HP:200  Speed:40  Armor:10

//Special Enemies            
var T = "darktemplar";
var D = "devourer"; // HP:1000  Speed:40  Armor:6     //Increases its own speed once half health
var O = "overlord"; // HP:1500  Speed:40  Armor:10    //Possibly drops some zergs upon death?
var U = "ultralisk"; // HP:2000  Speed:35  Armor:10    //No special features yet
var S = "sarahkerrigan"; // HP:3000  Speed:40  Armor:10    //Revives upon death back to full health & +10 speed

//var I = "infestedkerrigan";


//Level One (Easy) - Grass
var firstLevelEnemies     = [i, z, s, l, d, m, q, O, 0];
var firstLevelWaveSize    = [2, 3, 2, 3, 5, 1, 3, 1, 0];
var firstLevelSpeedBuff   = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var firstLevelHealthBuff  = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var firstLevelEntranceNum = [1, 2, 1, 3, 2, 3, 3, 1, 0] //1 = first entrance, 2 = second entrance, 3 = both entrances

//Level Two (Medium) - Blue
var secondLevelEnemies     = [dr, z, s, q, h, d, g, O,  z,  d,  q,  z, m,  d,  z,  g,  h,  q, D, 0];
var secondLevelWaveSize    = [ 3, 5, 1, 2, 2, 3, 1, 1,  5,  7,  5,  8, 3,  5,  9,  2,  5,  4, 1, 0];
var secondLevelSpeedBuff   = [ 0, 0, 0, 0, 0, 0, 0, 0,  0, .5,  0, .2, 0, .5, .2, .2,  0,  0, 0, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var secondLevelHealthBuff  = [ 0, 0, 0, 0, 0, 0, 0, 0, .5, .5, .5,  0, 0, .5,  1, .2, .3, .5, 0, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var secondLevelEntranceNum = [ 1, 2, 3, 3, 1, 3, 3, 2,  3,  1,  3,  3, 3,  3,  3,  3,  3,  1, 2, 0]; //1 = first entrance, 2 = second entrance, 3 = both entrances

//Level Three (medium hard) - Metal
var thirdLevelEnemies     = [dr, dr,dr,z, i, s, z, s, m, m, m, s, g, m, s, g, m, T, 0];
var thirdLevelWaveSize    = [3,  3, 1, 2, 3, 1, 5, 5, 7, 4, 4, 3, 3, 3, 7, 4, 4, 9, 0];
var thirdLevelSpeedBuff   = [.1,.1,.1,.1,.1,.2,.1,.1,.2,.2,.2,.3,.3,.3,.2,.2,.3, 0, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var thirdLevelHealthBuff  = [.2,.2,.2,.1,.2,.3,.2,.4,.2,.2,.2,.3,.3,.3,.2,.4,.2, 0, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var thirdLevelEntranceNum = [1,  2, 3, 3, 1, 3, 3, 3, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1]; //1 = first entrance, 2 = second entrance, 3 = both entrances

//Level Four (Hard) = Fire
var fourthLevelEnemies     = [z, z, h, d, q, dr,l, i, z, h, s, m, O, z, D, g, z, q, d, U, 0];
var fourthLevelWaveSize    = [2, 4, 2, 2, 4, 4, 3, 3, 3, 1, 4, 3, 1, 7, 1, 1, 4, 3, 1, 0, 0];
var fourthLevelSpeedBuff   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,.2,.2, 0,.5, 0, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var fourthLevelHealthBuff  = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1,.5, 0, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var fourthLevelEntranceNum = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0];

//Level Five (HARD EXTRA) = Ice
var fifthLevelEnemies     = [b, b, i, s, dr, z, l, d, O, z, dr, l, U, m, l, m, q, z, m, O, S, 0];
var fifthLevelWaveSize    = [4, 4, 4, 2,  3, 5, 1, 4, 1, 5,  9, 3, 1, 5, 3, 2, 8, 8, 4, 2, 1, 0];
var fifthLevelSpeedBuff   = [0, 0, 0, 0,  1, 0, 0, 0, 0, 1,  0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0]; //unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var fifthLevelHealthBuff  = [0, 0, 2, 0,  1, 1, 0, 0, 0, 0,  2, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var fifthLevelEntranceNum = [1, 2, 2, 1,  3, 1, 2, 2, 1, 3,  1, 2, 3, 2, 3, 3, 3, 3, 3, 3, 2, 0]; //1 = first entrance, 2 = second entrance, 3 = both entrances

// test case
/*
var firstLevelEnemies = [dr, dr, dr, z, i, s, z, s, m, m, m, s, g, m, s, g, m, T, 0];
var firstLevelWaveSize = [3, 3, 1, 2, 3, 4, 5, 5, 7, 4, 4, 3, 3, 3, 7, 4, 4, 10, 0];
var firstLevelSpeedBuff = [.1, .1, .1, .1, .1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//unit is buffed by ->> unitSpeed * (1 + speedBuff) for readability here
var firstLevelHealthBuff = [.2, .2, .2, .1, .2, .3, .1, .3, .1, .1, .1, .1, .3, .2, .1, .3, .1, 0, 0]; //unit is buffed by ->> unitHealth * (1 + healthBuff) for readability here
var firstLevelEntranceNum = [1, 2, 3, 3, 1, 3, 3, 3, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1];
*/

function Level(levelNum, waveObject) {
    this.canvas = document.getElementById("gameWorld");
    this.levelNum = levelNum;
    this.wave = waveObject;
    this.wave.setLevel(this);
    this.isDone = false;
    this.waveNumber = 0;

}

Level.prototype.constructor = Level;

Level.prototype.createWave = function() {
    switch (this.levelNum) {
        case 1:
            this.playLevel1();
            break;
        case 2:
            this.playLevel2();
            break;
        case 3:
            this.playLevel3();
            break;
        case 4:
            this.playLevel4();
            break;
        case 5:
            this.playLevel5();
            break;
        default:
            console.log("illegal level selection of level: " + this.levelNum);
            break;
    }

};

Level.prototype.playLevel1 = function() {
    this.wave.setWave(firstLevelEnemies[this.waveNumber],
        firstLevelWaveSize[this.waveNumber],
        firstLevelSpeedBuff[this.waveNumber],
        firstLevelHealthBuff[this.waveNumber],
        firstLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;

    //Once all the waves have run, end this level.
    if (this.waveNumber >= firstLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }
}

Level.prototype.playLevel2 = function() {

    this.wave.setWave(secondLevelEnemies[this.waveNumber],
        secondLevelWaveSize[this.waveNumber],
        secondLevelSpeedBuff[this.waveNumber],
        secondLevelHealthBuff[this.waveNumber],
        secondLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;

    //Once all the waves have run, end the level.
    if (this.waveNumber >= secondLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }

}

Level.prototype.playLevel3 = function() {

    this.wave.setWave(thirdLevelEnemies[this.waveNumber],
        thirdLevelWaveSize[this.waveNumber],
        thirdLevelSpeedBuff[this.waveNumber],
        thirdLevelHealthBuff[this.waveNumber],
        thirdLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;

    //Once all the waves have run, end the level.
    if (this.waveNumber >= thirdLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }

}

Level.prototype.playLevel4 = function() {
    this.wave.setWave(fourthLevelEnemies[this.waveNumber],
        fourthLevelWaveSize[this.waveNumber],
        fourthLevelSpeedBuff[this.waveNumber],
        fourthLevelHealthBuff[this.waveNumber],
        fourthLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;

    //Once all the waves have run, end the level.
    if (this.waveNumber >= fourthLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        console.log("Level " + this.levelNum + " is done.")
    }
}

Level.prototype.playLevel5 = function() {
    this.wave.setWave(fifthLevelEnemies[this.waveNumber],
        fifthLevelWaveSize[this.waveNumber],
        fifthLevelSpeedBuff[this.waveNumber],
        fifthLevelHealthBuff[this.waveNumber],
        fifthLevelEntranceNum[this.waveNumber]);
    this.waveNumber++;

    //Once all the waves have run, end the level.
    if (this.waveNumber >= fifthLevelEnemies.length) {
        this.waveNumber = 0;
        this.isDone = true;
        /**GAME IS OVER**/
        console.log("All levels finished spawning.")
    }
}