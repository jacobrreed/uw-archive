function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.isDone = function() {
    return this.downloadQueue.length === this.successCount + this.errorCount;
}

AssetManager.prototype.downloadAll = function(callback) {
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var img = new Image();
        var that = this;

        var path = this.downloadQueue[i];

        img.addEventListener("load", function() {
            that.successCount++;
            if (that.isDone()) callback();
        });

        img.addEventListener("error", function() {
            that.errorCount++;
            if (that.isDone()) callback();
        });

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}
