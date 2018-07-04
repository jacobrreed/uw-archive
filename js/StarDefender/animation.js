function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    this.lastHealth = 0;
    this.damageTime = 0;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.drawEnemy = function (tick, ctx, x, y, currentHealth, maxHealth, armor) {
    if (this.damageTime > 0) {
        this.damageTime -= tick;
    }
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
    if (currentHealth > 0) {
        var r = 0;
        var g = 255 - 25 * armor;
        var b = 33 + 2 * armor;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        //console.dir(ctx.fillStyle);
        ctx.fillRect(x, y - 2, this.frameWidth * this.scale * (currentHealth / maxHealth), 5);
        if (currentHealth !== this.lastHealth) {
            this.damageTime = 1;
        }
        if (this.damageTime > 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(x + this.frameWidth * this.scale * (currentHealth / maxHealth), y - 2, this.frameWidth * this.scale * ((this.lastHealth - currentHealth) / maxHealth), 5);
            this.lastHealth = currentHealth;
        }
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "black";
        var amountOfBlocks = Math.floor(maxHealth / 20);
        var blockWidth = this.frameWidth * this.scale / amountOfBlocks;
        for (let i = 0; i < amountOfBlocks; i++) {
            ctx.strokeRect(x + i * blockWidth, y - 2, blockWidth, 5);
        }
    }
}

Animation.prototype.drawBoss = function (tick, ctx, x, y, currentHealth, maxHealth, name) {
    if (this.damageTime > 0) {
        this.damageTime -= tick;
    }
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
    if (currentHealth > 0) {
        ctx.fillStyle = "purple";
        ctx.fillRect(x, y - 2, this.frameWidth * this.scale * (currentHealth / maxHealth), 5);
        if (currentHealth !== this.lastHealth) {
            this.damageTime = 1;
        }
        if (this.damageTime > 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(x + this.frameWidth * this.scale * (currentHealth / maxHealth), y - 2, this.frameWidth * this.scale * ((this.lastHealth - currentHealth) / maxHealth), 5);
            this.lastHealth = currentHealth;
        }
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "black";
        var amountOfBlocks = Math.floor(maxHealth / 200);
        var blockWidth = this.frameWidth * this.scale / amountOfBlocks;
        for (let i = 0; i < amountOfBlocks; i++) {
            ctx.strokeRect(x + i * blockWidth, y - 2, blockWidth, 5);
        }
    }
}

Animation.prototype.drawDefender = function (ctx, x, y, frame) {
    ctx.drawImage(this.spriteSheet,
        frame * this.frameWidth, 0, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.drawDummyDefender = function (ctx, x, y, frame, defenderName) {
    ctx.drawImage(this.spriteSheet,
        frame * this.frameWidth, 0, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    if (defenderName === 'marine') {
        ctx.fillRect(x + this.frameWidth * this.scale / 4, y + this.frameWidth * this.scale / 4, this.frameWidth * this.scale / 2, this.frameHeight * this.scale / 2);
    } else {
        ctx.fillRect(x, y, this.frameWidth * this.scale, this.frameHeight * this.scale);
    }
}

Animation.prototype.drawDeathFrame = function (tick, ctx, x, y, deathAnimationTime) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    if (deathAnimationTime >= 1) {
        var frame = 0;
    } else {
        var frame = this.currentFrame();
    }
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.drawDirectional = function (tick, ctx, xCenter, yCenter, offset, radianAngle, isMultipleSprites, numberOfProjectiles) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frameAngle = (2 * Math.PI) / this.sheetWidth;
    var spriteRadianAngle = Math.floor(radianAngle / frameAngle) * frameAngle;
    var x = 0;
    var y = 0;
    var xindex =  Math.floor(spriteRadianAngle / (2 * Math.PI / this.sheetWidth));
    var yindex = 0
    if (isMultipleSprites) {
        yindex = this.currentFrame() % Math.ceil(this.frames / this.sheetWidth);
    }
    var xOffset = Math.cos(spriteRadianAngle) * (offset + this.frameWidth * this.scale / 2);
    x = xCenter - xOffset - this.frameWidth * this.scale / 2;
    var yOffset = Math.sin(spriteRadianAngle) * (offset + this.frameHeight * this.scale / 2);
    y = yCenter - yOffset - this.frameHeight * this.scale / 2;
    var x1 = x;
    var y1 = y;
    var spaceBetweenProjectiles = 7;
    if (numberOfProjectiles === 2) {
        x += Math.cos(Math.PI / 2 - spriteRadianAngle) * spaceBetweenProjectiles;
        y += Math.sin(Math.PI / 2 - spriteRadianAngle) * spaceBetweenProjectiles;
        x1 -= Math.cos(Math.PI / 2 - spriteRadianAngle) * spaceBetweenProjectiles;
        y1 -= Math.sin(Math.PI / 2 - spriteRadianAngle) * spaceBetweenProjectiles;
    }
    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
    if (numberOfProjectiles === 2) {
        ctx.drawImage(this.spriteSheet,
            xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
            this.frameWidth, this.frameHeight,
            x1, y1,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale);
    }
}

Animation.prototype.drawLine = function (ctx, x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}