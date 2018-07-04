function Generator(engine, map, assetManager, ui) {
    this.doc = document.getElementById("gameWorld");
    this.gameEngine = engine;
    this.map = map;
    this.AM = assetManager;
    this.UI = ui;
}

//Creates enemy of specified type at beginning of given map
Generator.prototype.createEnemyFirstEntry = function(enemyName, speedBuff, healthBuff) {
    this.gameEngine.addUnit(new GroundUnit(this.gameEngine, enemyName, this.map.firstEntry, this.map, this.AM, speedBuff, healthBuff, this.UI));
}

//Creates Boss of specified type at beginning of given map
Generator.prototype.createEnemyFirstEntryBoss = function(enemyName, speedBuff, healthBuff) {
    this.gameEngine.addUnit(new Boss(this.gameEngine, enemyName, this.map.firstEntry, this.map, this.AM, speedBuff, healthBuff, this.UI));
}

Generator.prototype.createEnemySecondEntry = function (enemyName, speedBuff, healthBuff) {
    this.gameEngine.addUnit(new GroundUnit(this.gameEngine, enemyName, this.map.secondEntry, this.map, this.AM, speedBuff, healthBuff, this.UI));
}

Generator.prototype.createEnemySecondEntryBoss = function (enemyName, speedBuff, healthBuff) {
    this.gameEngine.addUnit(new Boss(this.gameEngine, enemyName, this.map.secondEntry, this.map, this.AM, speedBuff, healthBuff, this.UI));
}

//Creates defender of given type at a location specified by the mouse
Generator.prototype.createDefender = function(defenderName, row, column) {
    this.gameEngine.addDefender(new Defender(this.gameEngine, defenderName, row, column, this.map, this.AM, false));
}

Generator.prototype.createDummyDefender = function(defenderName, row, column) {
    let defender = new Defender(this.gameEngine, defenderName, row, column, this.map, this.AM, true);
    this.gameEngine.addDefender(defender);
    return defender;
}

//Creates an SCV at the base location
Generator.prototype.createSCV = function () {
    this.gameEngine.addSCV(new SCV(this.gameEngine, this.map, this.AM, this.UI));
}

//Creates a dropship to move units. Comes from base and goes back to base.
Generator.prototype.createDropship = function (unitStartColumn, unitStartRow, unitEndColumn, unitEndRow, theDefender) {
    this.gameEngine.addSCV(new Dropship(this.gameEngine, this.map, this.AM, unitStartColumn, unitStartRow, unitEndColumn, unitEndRow, theDefender));
}

Generator.prototype.setMap = function(map) {
    this.map = map;
}


